/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import parser from 'html-react-parser';
import styled from 'styled-components';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { intToString } from '../../utils/intToString';
import { postedAt } from '../../utils/formatDate';
import { Button } from '../Styled/Button';
import Avatar from '../Styled/Avatar';
import { shareHandler } from '../../utils/shareThread';
import {
  asyncClearVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncUpVoteThreadDetail,
} from '../../states/threadDetail/action';

function ThreadDetail({
  id,
  title,
  createdAt,
  body,
  category,
  upVotesBy,
  downVotesBy,
  user,
  authUser,
}) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    setIsLiked(Boolean(upVotesBy.includes(authUser?.id)));
    setIsDisliked(Boolean(downVotesBy.includes(authUser?.id)));
  }, [upVotesBy, downVotesBy, authUser]);

  const voteHandler = (type) => {
    if (!authUser) {
      alert('Please log in first.');
      return;
    }

    if (type === 'upvote' && !isLiked) {
      dispatch(asyncUpVoteThreadDetail(id));
      return;
    }

    if (type === 'downvote' && !isDisliked) {
      dispatch(asyncDownVoteThreadDetail(id));
      return;
    }

    dispatch(asyncClearVoteThreadDetail(id));
  };

  return (
    <ThreadDetailWrapper>
      <ThreadHeader>
        <Avatar src={user?.avatar} alt={user?.name} />

        <User>
          <Username>{user?.name}</Username>
          <PostedTime>{postedAt(createdAt)}</PostedTime>
        </User>

        <ShareButton onClick={() => shareHandler({ title, id })}>
          <IoShareSocialOutline />
        </ShareButton>
      </ThreadHeader>

      <ThreadBody>
        <ContentTitle>{title}</ContentTitle>
        <Description>{parser(body)}</Description>

        <CategoryList>
          <Category>{category}</Category>
        </CategoryList>
      </ThreadBody>

      <ThreadFooter>
        <VoteButton onClick={() => voteHandler('upvote')}>
          <FiThumbsUp style={isLiked && { fill: 'red' }} />
          <span>{intToString(upVotesBy.length)}</span>
        </VoteButton>

        <VoteButton onClick={() => voteHandler('downvote')}>
          <FiThumbsDown style={isDisliked && { fill: 'red' }} />
          <span>{intToString(downVotesBy.length)}</span>
        </VoteButton>
      </ThreadFooter>
    </ThreadDetailWrapper>
  );
}

export default ThreadDetail;

const ThreadDetailWrapper = styled.section`
  padding: 1em 1em 1.5em 1em;
  gap: 0.5em;
  background-color: #fff;
  border-radius: 0.7em;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #f5f5f5;
  overflow: hidden;
`;

const ThreadHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8em;
  width: 100%;
`;

const User = styled.div`
  word-break: break-all;
`;
const Username = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
`;
const PostedTime = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
  color: #757575;
`;
const ShareButton = styled(Button)`
  margin-left: auto;
  font-size: 1.2rem;
`;

const ThreadBody = styled.div`
  width: 100%;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin-top: 1.2em;
`;
const ContentTitle = styled.h5`
  font-size: 0.8rem;
  font-weight: 500;
`;
const Description = styled.div`
  margin-top: 0.5em;
  font-size: 0.8rem;
  font-weight: 400;
  color: #757575;
`;

const CategoryList = styled.div`
  margin-top: 1.2em;
  display: flex;
  gap: 0.2em;
`;
const Category = styled.span`
  font-size: 0.8rem;
  color: #757575;
  background-color: #f5f5f5;
  border: 1px solid #d6d6d6;
  border-radius: 0.4em;
  padding: 0.125em 0.5em;
`;

const ThreadFooter = styled.div`
  margin-top: 1.2em;
  padding-left: 0.2em;
  display: flex;
  gap: 1.3em;
`;
const VoteButton = styled(Button)`
  font-size: 1rem;
  font-weight: 400;

  span {
    font-size: 0.8rem;
    font-weight: 400;
  }
`;
