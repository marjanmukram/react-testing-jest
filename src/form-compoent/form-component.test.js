import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { savePost as mockSavePost } from "./api";
import FormComponent from "./form-component";

jest.mock("./api");

afterEach(()=>{
    jest.clearAllMocks();
})
test("FormComponent renders title,content, form button", () => {
  const fakeUser = {
    id: "user-1"
  };
  const { getByLabelText, getByText } = render(
    <FormComponent user={fakeUser} />
  );
  mockSavePost.mockResolvedValueOnce();

  const fakePost = {
    title: "Test title",
    content: "Test content",
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
});
