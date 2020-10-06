import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
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
test("FormComponent renders title,content, form button", async () => {
  const fakeUser = {
    id: "user-1"
  };
  const preDate = new Date().getTime();
  const { getByLabelText, getByText } = render(
    <FormComponent user={fakeUser} />
  );
  mockSavePost.mockResolvedValueOnce();

  const fakePost = {
    title: "Test title",
    content: "Test content",
    date: expect.any(String),
    tags: ["tag1", "tag2"]
  };

  getByLabelText(/title/i).value = fakePost.title;
  getByLabelText(/content/i).value = fakePost.content;
  getByLabelText(/tags/i).value = fakePost.tags.join(", ");
  const submitButton = getByText(/submit/i);
  expect(submitButton).not.toBeDisabled();
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
  expect(mockSavePost).toBeCalledWith({ ...fakePost, authorId: fakeUser.id });
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: "/" }, {})
  );
  const postDate = new Date().getTime();
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();
  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);
});
