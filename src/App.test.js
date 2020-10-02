import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// test('renders save to reload paragraph', () => {
//   const { getByText } = render(<App />);
//   const  paragraphText = getByText(/save to reload/i);
//   expect(paragraphText).toBeInTheDocument();
// });

jest.mock('./CheckboxWithLabel', () => () => <div>Hello World</div>);

test('renders', () => {
  const {container} = render(<App />);
  expect(container.textContent).toMatch('save')
})