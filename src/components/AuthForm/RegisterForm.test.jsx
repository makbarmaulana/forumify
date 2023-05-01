/**
 * Test scenario for RegisterForm component
 *
 * - RegisterForm component
 *   - should handle username typing correctly
 *   - should handle email typing correctly
 *   - should handle password and confirm password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  describe, expect, it, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';

function WrappedRegisterForm({ register }) {
  return (
    <MemoryRouter initialEntries={['/register']}>
      <RegisterForm register={register} />
    </MemoryRouter>
  );
}

describe('LoginInput component', () => {
  it('should handle username typing correctly', async () => {
    render(<WrappedRegisterForm />);
    const usernameField = screen.getByLabelText('Username');

    await userEvent.type(usernameField, 'User Testing');

    expect(usernameField).toHaveValue('User Testing');
  });

  it('should handle email typing correctly', async () => {
    render(<WrappedRegisterForm />);
    const emailField = screen.getByLabelText('Email Address');

    await userEvent.type(emailField, 'usertesting@mail.com');

    expect(emailField).toHaveValue('usertesting@mail.com');
  });

  it('should handle password and confirm password typing correctly', async () => {
    render(<WrappedRegisterForm />);
    const passwordField = screen.getByLabelText('Password');
    const confirmPasswordField = screen.getByLabelText('Confirm Password');

    await userEvent.type(passwordField, 'usertesting');
    await userEvent.type(confirmPasswordField, 'usertesting');

    expect(passwordField).toHaveValue('usertesting');
    expect(confirmPasswordField).toHaveValue('usertesting');
    expect(confirmPasswordField.value).toEqual(passwordField.value);
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<WrappedRegisterForm register={mockRegister} />);
    const usernameField = screen.getByLabelText('Username');
    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');
    const confirmPasswordField = screen.getByLabelText('Confirm Password');
    const loginButton = screen.getByRole('button', { name: 'Register' });

    await userEvent.type(usernameField, 'User Testing');
    await userEvent.type(emailField, 'usertesting@mail.com');
    await userEvent.type(passwordField, 'usertesting');
    await userEvent.type(confirmPasswordField, 'usertesting');
    await userEvent.click(loginButton);

    expect(confirmPasswordField.value).toEqual(passwordField.value);
    expect(mockRegister).toBeCalledWith({
      name: 'User Testing',
      email: 'usertesting@mail.com',
      password: 'usertesting',
    });
  });
});
