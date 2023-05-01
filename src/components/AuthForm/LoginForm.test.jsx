/**
 * Test scenario for LoginForm component
 *
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  describe, expect, it, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

function WrappedLoginForm({ login }) {
  return (
    <MemoryRouter initialEntries={['/login']}>
      <LoginForm login={login} />
    </MemoryRouter>
  );
}

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    render(<WrappedLoginForm />);
    const emailField = screen.getByLabelText('Email Address');

    await userEvent.type(emailField, 'usertesting@mail.com');

    expect(emailField).toHaveValue('usertesting@mail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<WrappedLoginForm />);
    const passwordField = screen.getByLabelText('Password');

    await userEvent.type(passwordField, 'usertesting');

    expect(passwordField).toHaveValue('usertesting');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<WrappedLoginForm login={mockLogin} />);
    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(passwordField, 'usertesting');
    await userEvent.type(emailField, 'usertesting@mail.com');
    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'usertesting@mail.com',
      password: 'usertesting',
    });
  });
});
