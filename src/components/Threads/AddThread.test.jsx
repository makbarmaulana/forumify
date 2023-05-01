/**
 * Test scenario for AddThread
 *
 * - AddThread component :
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when ADD button is clicked
 */

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  describe, expect, it, vi,
} from 'vitest';
import AddThread from './AddThread';

describe('case', () => {
  it('should handle title typing correctly', async () => {
    await act(async () => render(<AddThread />));
    const titleField = screen.getByLabelText('Title');

    await act(async () => userEvent.type(titleField, 'First Thread'));

    expect(titleField).toHaveValue('First Thread');
  });

  it('should handle category typing correctly', async () => {
    await act(async () => render(<AddThread />));
    const categoryField = screen.getByLabelText('Category');

    await act(async () => userEvent.type(categoryField, 'General'));

    expect(categoryField).toHaveValue('General');
  });

  it('should handle body typing correctly', async () => {
    await act(async () => render(<AddThread />));
    const bodyField = screen.getByLabelText('Description');

    await act(async () => userEvent.type(bodyField, 'This is the first thread'));

    expect(bodyField).toHaveValue('This is the first thread');
  });

  it('should call addThread function when ADD button is clicked', async () => {
    const mockAddThread = vi.fn();
    await act(async () => render(<AddThread addThread={mockAddThread} />));
    const titleField = screen.getByLabelText('Title');
    const categoryField = screen.getByLabelText('Category');
    const bodyField = screen.getByLabelText('Description');
    const addButton = screen.getByRole('button', { name: 'ADD' });

    await act(async () => {
      await userEvent.type(titleField, 'First Thread');
      await userEvent.type(categoryField, 'General');
      await userEvent.type(bodyField, 'This is the first thread');
      await userEvent.click(addButton);
    });

    expect(mockAddThread).toBeCalledWith({
      title: 'First Thread',
      category: 'General',
      body: 'This is the first thread',
    });
  });
});
