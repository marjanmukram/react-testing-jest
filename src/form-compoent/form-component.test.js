import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { build, fake, sequence } from "test-data-bot";
import { Redirect as MockRedirect } from "react-router";
import { savePost as mockSavePost } from "./api";
import FormComponent from "./form-component";

jest.mock("./api");
jest.mock("react-router", () => {
  return { Redirect: jest.fn(() => null) };
});

afterEach(() => {
  jest.clearAllMocks();
});

const postBuilder = build("Post").fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, "")),
  tags: fake(f => [f.lorem.words(), f.lorem.words(), f.lorem.words()])
});

const userBuilder = build("User").fields({
  id: sequence(s => `user-${s}`)
});

const renderEditor = () => {
  const fakePost = postBuilder();
  const fakeUser = userBuilder();
  const utils = render(<FormComponent user={fakeUser} />);
  utils.getByLabelText(/title/i).value = fakePost.title;
  utils.getByLabelText(/content/i).value = fakePost.content;
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(", ");
  const submitButton = utils.getByText(/submit/i);
  return {
    ...utils,
    submitButton,
    fakePost,
    fakeUser
  };
};

test("FormComponent renders title,content, form button", async () => {
  const preDate = new Date().getTime();

  mockSavePost.mockResolvedValueOnce();
  const { submitButton, fakePost, fakeUser } = renderEditor();
  expect(submitButton).not.toBeDisabled();
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: "/" }, {})
  );
  expect(mockSavePost).toBeCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id
  });
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  const postDate = new Date().getTime();
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();
  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);
});

test("FormComponent renders an error message from the server", async () => {
  const testError = "test error";
  mockSavePost.mockRejectedValueOnce({ data: { error: testError } });
  const { submitButton, findByRole } = renderEditor();

  fireEvent.click(submitButton);
  const postError = await findByRole("alert");
  expect(postError).toHaveTextContent(testError);
  expect(submitButton).not.toBeDisabled();
});
