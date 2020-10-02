import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import CheckboxWithLabel from './CheckboxWithLabel';


// Mock
// test('renders save to reload paragraph', () => {
//   const { getByText } = render(<App />);
//   const  paragraphText = getByText(/save to reload/i);
//   expect(paragraphText).toBeInTheDocument();
// });


// Manual mock
// jest.mock('./CheckboxWithLabel');

// test('renders', () => {
//   const {container} = render(<App />);
//   expect(container.textContent).toMatch('save')
// })

// Advanced mocks
const MockMyComponent = () => {
  React.useEffect(() => {
    console.log('using an effect');
  });
  return (<div>Hello World</div>);
};
jest.mock('./CheckboxWithLabel', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn()
}));

beforeAll(() => {
  CheckboxWithLabel.mockImplementation(MockMyComponent);
});

test('renders', () => {
  const { container } = render(<App/>);
  expect(container.textContent)
    .toMatch('Hello World');
});