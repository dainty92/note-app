import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';

test('App component should render title and content', () => {
  const title = 'Test Title';
  const content = 'Test Content';

  const { getByText } = render(<App title={title} content={content} />);

  // Check if the title and content are rendered correctly
  const titleElement = getByText(title);
  const contentElement = getByText(content);

  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
});

test('App component should render note-card class', () => {
  const title = 'Test Title';
  const content = 'Test Content';

  const { container } = render(<App title={title} content={content} />);

  // Check if the component is rendered with the correct class
  const noteCardElement = container.querySelector('.note-card');

  expect(noteCardElement).toBeInTheDocument();
});
