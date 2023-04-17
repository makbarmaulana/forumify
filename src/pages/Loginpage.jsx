import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncLogin } from '../states/authUser/action';
import LoginForm from '../components/AuthForm/LoginForm';

function Loginpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = ({ email, password }) => {
    dispatch(asyncLogin({ email, password }));
    navigate('/');
  };

  return (
    <LoginContainer>
      <LoginHeader>
        <Title>
          Hello,
          <br />
          Welcome Back
        </Title>
      </LoginHeader>

      <LoginForm login={loginHandler} />
    </LoginContainer>
  );
}

export default Loginpage;

const LoginContainer = styled.section`
  padding: 0 1.5em;
`;

const LoginHeader = styled.div`
  padding: 3em 0;
`;
const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
`;
