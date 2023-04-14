import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import { Input } from '../Styled/Input';
import { Button } from '../Styled/Button';

function LoginForm({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const togglePasswordHandler = () => {
    setShowPassword(Boolean(!showPassword));
  };

  return (
    <Container>
      <FormWrapper>
        <Label htmlFor="email">Email Address</Label>
        <InputField
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          required
        />

        <Label htmlFor="password">Password</Label>
        <PasswordWrapper>
          <InputField
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={onPasswordChange}
            required
          />
          {password && (
            <TogglePasswordButton onClick={togglePasswordHandler}>
              {showPassword ? (
                <FiEyeOff style={{ color: '#5d9dfe' }} />
              ) : (
                <FiEye />
              )}
            </TogglePasswordButton>
          )}
        </PasswordWrapper>
      </FormWrapper>

      <Buttons>
        <ForgotButton as={NavLink}>Forgot Password ?</ForgotButton>
        <LoginButton type="submit" variant="primary" onClick={loginHandler}>
          Login
        </LoginButton>
        <RegisterButton as={NavLink} to="/register">
          Create an account
        </RegisterButton>
      </Buttons>
    </Container>
  );
}

export default LoginForm;

const Container = styled.div``;
const FormWrapper = styled.form``;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  color: #757575;
  margin-bottom: 0.3rem;

  &:not(:first-child) {
    margin-top: 1rem;
  }
`;
const InputField = styled(Input)`
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0.5em;
  border: unset;
  border-bottom: 2px solid #d6d6d6;

  &:focus-visible {
    outline: unset;
    background-color: #e7f0fe;
    border-bottom: 2px solid #92b7f0;
  }

  &:hover {
    background-color: #e7f0fe;
  }

  &:valid {
    background-color: #e7f0fe;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;
const TogglePasswordButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 0.7em;
  transform: translateY(-50%);
  font-size: 1rem;

  &:hover {
    color: #5d9dfe;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2em;
`;
const ForgotButton = styled(Button)`
  margin-top: 1rem;
  align-self: flex-end;

  &:hover {
    color: #5d9dfe;
  }
`;
const LoginButton = styled(Button)`
  margin-top: 2rem;
  text-transform: uppercase;
`;
const RegisterButton = styled(Button)`
  align-self: center;

  &:hover {
    color: #5d9dfe;
  }
`;
