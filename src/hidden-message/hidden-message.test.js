import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import HiddenMessage from "./hidden-message";

jest.mock("react-transition-group", () => {
  return {
    CSSTransition: props => (props.in ? props.children : null)
  };
});
test("tests toggle button click should show and hide", () => {
  const myMessage = "Hello World";
  const { getByText, queryByText } = render(
    <HiddenMessage>{myMessage}</HiddenMessage>
  );
  const toggleButton = getByText(/toggle/i);
  expect(queryByText(myMessage)).not.toBeInTheDocument();
  fireEvent.click(toggleButton);
  expect(getByText(myMessage)).toBeInTheDocument();
  fireEvent.click(toggleButton);
  waitFor(() => expect(queryByText(myMessage)).not.toBeInTheDocument());
});
