import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders save to reload paragraph', () => {
  const { getByText } = render(<App />);
  const  paragraphText = getByText(/save to reload/i);
  expect(paragraphText).toBeInTheDocument();
});
