import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "./use-counter";

test("exposes count and increment/decrement functions", () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of initial count value", () => {
  const {result} = renderHook(useCounter, { initialProps: { initialCount: 2 } });
  expect(result.current.count).toBe(2);
  act(() => result.current.increment());
  expect(result.current.count).toBe(3);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(2);
});

test("allows customization of step value", () => {
  const {result} = renderHook(useCounter, { initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(2);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
