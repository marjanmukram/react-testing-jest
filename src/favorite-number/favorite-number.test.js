import React from "react";
import { render, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import FavoriteNumber from "./favorite-number";

test('renders a number input with a label "Favorite number', () => {
  const { getByLabelText } = render(<FavoriteNumber />);
  const input = getByLabelText(/favorite number/i);
  expect(input).toHaveAttribute("type", "number");
});

test("entering an invalid value should show the error message", () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />);
  const input = getByLabelText(/favorite number/i);
  fireEvent.change(input, { target: { value: "10" } });
  expect(getByRole("alert")).toHaveTextContent(/the number is invalid/i);
});

test("entering an invalid vlaue should show the error message with user event", () => {
  const { getByLabelText, getByRole, rerender, debug } = render(
    <FavoriteNumber />
  );
  const input = getByLabelText(/favorite number/i);
  user.type(input, "10");
  expect(getByRole("alert")).toHaveTextContent(/the number is invalid/i);
  debug();
  rerender(<FavoriteNumber max={10} />);
  debug();
});
