import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MainContainer } from '../components/Styled/MainContainer';
import { asyncAddThread } from '../states/threads/actions';
import Header from '../components/Header/Header';
import AppbarOther from '../components/Header/Appbar/AppbarOther';
import AddThread from '../components/Threads/AddThread';
import Navbar from '../components/Navigation/NavBar';

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
        <AppbarOther title="Add New Thread" />
      </Header>
      <MainContainer>
        <AddThread addThread={addThreadHandler} />
      </MainContainer>
      <Navbar />
    </>
  );
}

export default AddThreadpage;
