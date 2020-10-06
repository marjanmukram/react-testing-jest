import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { reportError as mockReportError } from "./api";
import ErrorBoundary from "./error-boundary";

jest.mock("./api");

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  console.error.mockRestore();
});

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const Bomb = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error("💣");
  }
  return null;
};

test("reports error and renders that there was a problem", async () => {
  mockReportError.mockResolvedValueOnce({ succuess: true });
  const { rerender, getByRole, queryByRole, getByText, queryByText } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );
  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow />
    </ErrorBoundary>
  );

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining("Bomb") };

  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(mockReportError).toHaveBeenCalledTimes(1);

  expect(console.error).toHaveBeenCalledTimes(2);

  expect(getByRole("alert").textContent).toMatchInlineSnapshot(
    `"There was a problem."`
  );

  console.error.mockClear();
  mockReportError.mockClear();

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  fireEvent.click(getByText(/try again/i));

  expect(mockReportError).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();

  expect(queryByRole("alert")).not.toBeInTheDocument();
  expect(queryByText(/try again/i)).not.toBeInTheDocument();
});
