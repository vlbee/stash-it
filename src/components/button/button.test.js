import React from 'react';
import { render, fireEvent, prettyDOM } from 'react-testing-library';
import Button from './button';


test('Button works', () => {

  const { container, getByText } = render(<Button text="Open"></Button>);
  // console.log(prettyDOM(container))
  const buttonNode = getByText('Open');
  fireEvent.click(buttonNode);
  expect(buttonNode.textContent).toBe('Open Y');
});
