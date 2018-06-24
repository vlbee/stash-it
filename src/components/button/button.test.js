import React from 'react';
import { render, fireEvent, prettyDOM } from 'react-testing-library';
import Button from './button';


test('Button works', () => {

  const { container, getByText } = render(<Button>Test</Button>);
  console.log(prettyDOM(container))
  const buttonNode = getByText('Test');
  fireEvent.click(buttonNode);
  expect(buttonNode.textContent).toBe('Toggled');
});
