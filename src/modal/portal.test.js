import React from "react";
import { render, within, queries } from "@testing-library/react";
import { Modal } from "./modal";
test("modal renders children", () => {
  const { getByTestId, debug } = render(
    <Modal>
      <div data-testid='test' />
    </Modal>
  );
  debug();
  expect(getByTestId("test")).toBeInTheDocument();
});

test("modal renders children with within", () => {
  render(
    <Modal>
      <div data-testid='test' />
    </Modal>
  );

  const { getByTestId } = within(document.getElementById("modal-root"));
  expect(getByTestId("test")).toBeInTheDocument();
});

test("modal renders children with baseElement", () => {
  const { getByTestId } = render(
    <>
      <div data-testid='foo' />
      <Modal>
        <div data-testid='test' />
      </Modal>
    </>,
    { baseElement: document.getElementById("modal-root") }
  );

  queries.getByTestId(document.body, 'foo');
  expect(getByTestId("test")).toBeInTheDocument();
});
