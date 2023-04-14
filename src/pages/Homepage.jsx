import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainContainer } from '../components/Styled/MainContainer';
import { asyncPopulateStates } from '../states/shared/actions';
import Header from '../components/Header/Header';
import Threads from '../components/Threads/Threads';
import Navbar from '../components/Navigation/NavBar';

function Homepage() {
  const { threads, authUser, users } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateStates());
  }, [dispatch]);

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser,
  }));

  return (
    <>
      <Header />
      <MainContainer>
        <Threads threads={threadsList} />
      </MainContainer>
      <Navbar authUser={authUser} />
    </>
  );
}

export default Homepage;
