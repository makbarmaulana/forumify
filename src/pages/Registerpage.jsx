import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterForm from '../components/AuthForm/RegisterForm';
import { asyncRegister } from '../states/users/actions';

function Registerpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = ({ name, email, password }) => {
    dispatch(asyncRegister({ name, email, password }));
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <RegisterHeader>
        <Title>
          Create an Account
        </Title>
      </RegisterHeader>

      <RegisterForm register={registerHandler} />
    </RegisterContainer>
  );
}

export default Registerpage;

const RegisterContainer = styled.section`
  padding: 0 1.5em;
`;

const RegisterHeader = styled.div`
  padding: 3em 0;
`;
const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
`;
