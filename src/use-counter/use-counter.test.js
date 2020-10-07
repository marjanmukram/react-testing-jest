import React from "react";
import { render, act } from "@testing-library/react";
import { useCounter } from "./use-counter";
import expectExport from "expect";

test("exposes count and increment/decrement functions", () => {
  let result;
  const TestComponent = () => {
    result = useCounter();
    return null;
  };
  render(<TestComponent />);
  expectExport(result.count).toBe(0);
  
  act(() => result.increment());
  expectExport(result.count).toBe(1);
  
  act(() => result.decrement());
  expectExport(result.count).toBe(0);
});
