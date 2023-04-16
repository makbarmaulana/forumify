import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useInput } from '../../hooks/useInput';
import { Input } from '../Styled/Input';
import { Button } from '../Styled/Button';
import { StyledLink } from '../Styled/StyledLink';

function RegisterForm({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg(true);
      return;
    }

    register({ name, email, password });
  };

  const togglePasswordHandler = () => {
    setShowPassword(Boolean(!showPassword));
  };

  return (
    <Container>
      <FormWrapper>
        <Label htmlFor="username">Username</Label>
        <InputField
          type="text"
          id="username"
          value={name}
          onChange={onNameChange}
          required
        />

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

        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordWrapper>
          <InputField
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            required
          />
          {confirmPassword && (
            <TogglePasswordButton onClick={togglePasswordHandler}>
              {showPassword ? (
                <FiEyeOff style={{ color: '#5d9dfe' }} />
              ) : (
                <FiEye />
              )}
            </TogglePasswordButton>
          )}
        </PasswordWrapper>
        {errorMsg && (
          <ErrorMessage>
            The password confirmation doesn&apos;t match.
          </ErrorMessage>
        )}
      </FormWrapper>

      <Buttons>
        <RegisterButton
          variant="primary"
          onClick={registerHandler}
        >
          Register
        </RegisterButton>
        <LoginButton to="/login">
          Have an account ?
        </LoginButton>
      </Buttons>
    </Container>
  );
}

export default RegisterForm;

const Container = styled.div``;
const FormWrapper = styled.form``;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  color: #757575;
  margin-bottom: 0.3em;

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
const ErrorMessage = styled.p`
  margin-top: 0.5em;
  font-size: 0.7rem;
  font-weight: 400;
  color: red;
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
  gap: 1.5em;
`;
const RegisterButton = styled(Button)`
  margin-top: 3em;
  text-transform: uppercase;
`;
const LoginButton = styled(StyledLink)`
  align-self: center;
`;
