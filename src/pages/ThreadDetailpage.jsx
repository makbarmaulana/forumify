import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetThreadDetail } from '../states/threadDetail/action';
import { MainContainer } from '../components/Styled/MainContainer';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header/Header';
import AppbarOther from '../components/Header/Appbar/AppbarOther';
import ThreadDetail from '../components/ThreadDetail/ThreadDetail';
import Comments from '../components/ThreadDetail/Comments/Comments';
import AddComment from '../components/ThreadDetail/Comments/AddComment';

function ThreadDetailpage() {
  const { threadDetail, authUser } = useSelector((states) => states);

  const isAuth = useAuth();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) return null;

  const threadDetailData = {
    ...threadDetail,
    user: threadDetail?.owner,
    authUser,
  };

  return (
    <>
      <Header>
        <AppbarOther title="Comments" />
      </Header>

      <MainContainer>
        <ThreadDetail {...threadDetailData} />
        <Comments threadDetail={threadDetailData} />
      </MainContainer>

      {isAuth && <AddComment {...threadDetailData} />}
    </>
  );
}

export default ThreadDetailpage;
