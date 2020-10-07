import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReactRouterLinks from "./react-router-links";

test("should render About Us button and navitage to about us page", () => {
  const { getByText, debug, getByRole } = render(<ReactRouterLinks />);

  expect(getByRole("heading")).toHaveTextContent(/home/i);
  debug();
  fireEvent.click(getByText(/about us/i));
  debug();
  expect(getByRole("heading")).toHaveTextContent(/about us/i);
});
