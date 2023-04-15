import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MainContainer } from '../components/Styled/MainContainer';
import { asyncPopulateStates } from '../states/shared/actions';
import Header from '../components/Header/Header';
import AppbarHome from '../components/Header/Appbar/AppbarHome';
import Category from '../components/Header/Categories/Category';
import Threads from '../components/Threads/Threads';
import Navbar from '../components/Navigation/NavBar';
import { Button } from '../components/Styled/Button';

function Homepage() {
  const { threads = [], authUser, users } = useSelector((states) => states);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryKeyword, setCategoryKeyword] = useState('');

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
    .filter((thread) => thread.category.toLowerCase().includes(categoryKeyword.toLowerCase()))
    .filter((thread) => thread.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  const clearFilterHandler = () => {
    setSearchKeyword('');
    setCategoryKeyword('');
  };

  return (
    <>
      <Header>
        <AppbarHome keyword={setSearchKeyword} />
        <Category
          threads={threads}
          keyword={setCategoryKeyword}
          activeCategory={categoryKeyword}
        />
        {(searchKeyword || categoryKeyword) && (
          <ClearFilter onClick={clearFilterHandler}>
            clear all
          </ClearFilter>
        )}
      </Header>

      <MainContainer>
        <Threads threads={filteredThreads} />
      </MainContainer>

      <Navbar />
    </>
  );
}

export default Homepage;

const ClearFilter = styled(Button)`
  font-size: 0.75rem;
  font-weight: 500;
  color: #525252;
  border-radius: 2em;
  padding: 0.5em 0.8em;
  margin-left: auto;
  gap: 0.2em;
  background-color: #f2f2f2;

  &:hover {
    background-color: #dedede;
  }
`;
