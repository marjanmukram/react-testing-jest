import React from "react";
import { render, act } from "@testing-library/react";
import { useCounter } from "./use-counter";

const setup = ({ initialProps } = {}) => {
  const result = {};
  const TestComponent = props => {
    result.current = useCounter(props);
    return null;
  };
  render(<TestComponent {...initialProps} />);
  return result;
};
test("exposes count and increment/decrement functions", () => {
  const result = setup();
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of initial count value", () => {
  const result = setup({ initialProps: { initialCount: 2 } });
  expect(result.current.count).toBe(2);
  act(() => result.current.increment());
  expect(result.current.count).toBe(3);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(2);
});

test("allows customization of step value", () => {
  const result = setup({ initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(2);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
