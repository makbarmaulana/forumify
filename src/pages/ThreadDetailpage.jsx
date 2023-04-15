import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MainContainer } from '../components/Styled/MainContainer';
import { asyncGetThreadDetail } from '../states/threadDetail/action';
import Header from '../components/Header/Header';
import AppbarOther from '../components/Header/Appbar/AppbarOther';
import ThreadDetail from '../components/ThreadDetail/ThreadDetail';
import Comments from '../components/ThreadDetail/Comments';
import AddComment from '../components/ThreadDetail/AddComment';

function ThreadDetailpage() {
  const { threadDetail, authUser } = useSelector((states) => states);

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

      <AddComment {...threadDetailData} />
    </>
  );
}

export default ThreadDetailpage;
