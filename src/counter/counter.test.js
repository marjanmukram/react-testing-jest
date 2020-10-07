import React from "react";
import { Provider } from "react-redux";
import { render as rtlRender, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
import { createStore } from "redux";
import counterReducer from "../reducers/counterReducer";

const render = (
  ui,
  {
    initialState,
    store = createStore(counterReducer, initialState),
    ...rtlOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return { ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }), store };
};
test("can render with redux with defaults ", () => {
  const { getByLabelText, getByText } = render(<Counter />);

  fireEvent.click(getByText("+"));
  expect(getByLabelText(/count/i)).toHaveTextContent("1");
});

test("it can render with custom initial state", () => {
  const { getByLabelText, getByText } = render(<Counter />, {
    initialState: { count: 3 }
  });

  fireEvent.click(getByText("-"));
  fireEvent.click(getByText("-"));
  expect(getByLabelText(/count/i)).toHaveTextContent("1");
});
