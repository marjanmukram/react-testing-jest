import React from "react";

const FormComponent = () => {
  return (
    <form>
      <label htmlFor='form-title'>Title</label>
      <input id='form-title'/>

      <label htmlFor='form-content'>Content</label>
      <textarea id='form-content' />

      <label htmlFor='form-tags'>Tags</label>
      <input id='form-tags' />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default FormComponent;
