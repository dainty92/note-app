import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NoteForm from '../NoteForm';

test('NoteForm should submit correctly', () => {
  const handleSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(<NoteForm onSubmit={handleSubmit} />);

  const titleInput = getByPlaceholderText('Title');
  const contentInput = getByPlaceholderText('Content');
  const submitButton = getByText('Save Note');

  fireEvent.change(titleInput, { target: { value: 'Test Note' } });
  fireEvent.change(contentInput, { target: { value: 'This is a test note.' } });
  fireEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    title: 'Test Note',
    content: 'This is a test note.',
  });
});