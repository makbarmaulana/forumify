import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/action';
import MainContainer from '../components/Styled/MainContainer';
import Header from '../components/Header/Header';
import AppbarOther from '../components/Header/Appbar/AppbarOther';
import Leaderboards from '../components/Leaderboards/Leaderboards';
import Navbar from '../components/Navigation/NavBar';

function Leaderboardspage() {
  const { leaderboards } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (!leaderboards) return null;

  return (
    <>
      <Header>
        <AppbarOther title="Leaderboards" />
      </Header>

      <MainContainer>
        <Leaderboards leaderboards={leaderboards} />
      </MainContainer>

      <Navbar />
    </>
  );
}

export default Leaderboardspage;
