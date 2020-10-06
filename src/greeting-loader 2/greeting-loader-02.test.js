import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import GreetingLoader from "./greeting-loader-02";

test("load greetings on click", async () => {
  const testGreeting = "TEST_GREETING";
  const mockLoadGreeting = jest.fn();
  mockLoadGreeting.mockResolvedValueOnce({
    data: { greeting: testGreeting }
  });
  const { getByLabelText, getByText } = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />
  );
  const nameInput = getByLabelText(/name/i);
  const loadButton = getByText(/load greeting/i);
  nameInput.value = "Mary";
  fireEvent.click(loadButton);

  expect(mockLoadGreeting).toHaveBeenCalledWith("Mary");
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);
  await waitFor(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting)
  );
});
