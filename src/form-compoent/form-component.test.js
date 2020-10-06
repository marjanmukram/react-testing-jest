import React from "react";
import { render } from "@testing-library/react";
import FormComponent from "./form-component";

test("FormComponent renders title,content, form button", () => {
  const { getByLabelText, getByText } = render(<FormComponent />);
  getByLabelText(/title/i);
  getByLabelText(/content/i);
  getByLabelText(/tags/i);
  getByText(/submit/i);
});
