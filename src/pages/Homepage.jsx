import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainContainer } from '../components/Styled/MainContainer';
import { asyncPopulateStates } from '../states/shared/actions';
import Header from '../components/Header/Header';
import AppbarHome from '../components/Header/Appbar/AppbarHome';
import Category from '../components/Header/Categories/Category';
import Threads from '../components/Threads/Threads';
import Navbar from '../components/Navigation/NavBar';

function Homepage() {
  const { threads, authUser, users } = useSelector((states) => states);
  const [searchKeyword, setSearchKeyword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateStates());
  }, [dispatch]);

  const filteredThreads = threads
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser,
    }))
    .filter((thread) => thread.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  return (
    <>
      <Header>
        <AppbarHome keyword={setSearchKeyword} />
        <Category />
      </Header>

      <MainContainer>
        <Threads threads={filteredThreads} />
      </MainContainer>

      <Navbar />
    </>
  );
}

export default Homepage;
