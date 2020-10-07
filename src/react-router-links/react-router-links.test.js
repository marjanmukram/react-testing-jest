import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import ReactRouterLinks from "./react-router-links";

test("should render About Us button and navitage to about us page", () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const { getByText, debug, getByRole } = render(
    <Router history={history}>
      <ReactRouterLinks />
    </Router>
  );

  expect(getByRole("heading")).toHaveTextContent(/home/i);
  debug();
  fireEvent.click(getByText(/about/i));
  debug();
  expect(getByRole("heading")).toHaveTextContent(/about us/i);
});

test("should render No match component when landing on bad page", () => {
  const history = createMemoryHistory({ initialEntries: ["/some-bad-page"] });
  const { getByRole } = render(
    <Router history={history}>
      <ReactRouterLinks />
    </Router>
  );

  expect(getByRole("heading")).toHaveTextContent(/no match/i);
});
