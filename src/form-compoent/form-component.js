import React from "react";
import { savePost } from "./api";

const FormComponent = ({ user }) => {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const { title, content, tags } = e.target.elements;
    const newPost = {
        title: title.value,
        content: content.value,
        tags: tags.value.split(",").map(t => t.trim()),
        authorId: user.id
      }
    setButtonDisabled(true);
    savePost(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='form-title'>Title</label>
      <input id='form-title' name='title' />

      <label htmlFor='form-content'>Content</label>
      <textarea id='form-content' name='content' />

      <label htmlFor='form-tags'>Tags</label>
      <input id='form-tags' name='tags' />

      <button type='submit' disabled={buttonDisabled}>
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
