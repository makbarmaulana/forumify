import React, { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navigation/NavBar';
import { MainContainer } from '../components/Styled/MainContainer';
import { asyncPopulateStates } from '../states/shared/actions';
import Leaderboards from '../components/Leaderboards/Leaderboards';

function Leaderboardspage() {
  const { leaderboards } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateStates());
  }, [dispatch]);

  if (!leaderboards) return null;

  return (
    <>
      <Header>
        <BackToHome to="/">
          <IoArrowBack />
        </BackToHome>
        <Title>Leaderboards</Title>
      </Header>
      <MainContainer>
        <Leaderboards leaderboards={leaderboards} />
      </MainContainer>
      <Navbar />
    </>
  );
}

export default Leaderboardspage;

const Header = styled.header`
  position: sticky;
  top: 0;
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
