import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Form from "./ally.js";

expect.extend(toHaveNoViolations);

test("the form is accessible", async () => {
  const { container } = render(<Form />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
