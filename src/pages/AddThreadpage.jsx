import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddThread from '../components/Threads/AddThread';
import { asyncAddThread } from '../states/threads/actions';

function AddThreadpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addThreadHandler = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  };

  return (
    <>
      <Header>
        <BackToHome to="/">
          <IoArrowBack />
        </BackToHome>
        <Title>Add Thread</Title>
      </Header>
      <AddThread addThread={addThreadHandler} />
    </>
  );
}

export default AddThreadpage;

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.8em 1em;
  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
`;
const BackToHome = styled(NavLink)`
  position: absolute;
  font-size: 1.2rem;
  color: #757575;
  text-decoration: none;
`;

const Title = styled.h2`
  margin: auto;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  user-select: none;
`;
