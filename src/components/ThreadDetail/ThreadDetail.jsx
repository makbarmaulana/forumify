import React from 'react';
import parser from 'html-react-parser';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IoShareSocialOutline } from 'react-icons/io5';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi';
import {
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteThreadDetail,
} from '../../states/threadDetail/action';
import postedAt from '../../utils/formatDate';
import shareLink from '../../utils/shareLink';
import Avatar from '../Styled/Avatar';
import Button from '../Styled/Button';
import VoteButton from '../Styled/VoteButton';

function ThreadDetail({ threadDetail }) {
  const {
    id: threadId,
    title,
    createdAt,
    body,
    category,
    upVotesBy,
    downVotesBy,
    user,
    authUser,
  } = threadDetail;
  const dispatch = useDispatch();
  const isUpVoted = upVotesBy?.includes(authUser?.id);
  const isDownVoted = downVotesBy?.includes(authUser?.id);

  const voteHandler = (voteType) => {
    if (!authUser) {
      alert('Please login first');
      return;
    }
    if (voteType === 'up-vote' && !isUpVoted) {
      dispatch(asyncUpVoteThreadDetail(threadId));
      return;
    }
    if (voteType === 'down-vote' && !isDownVoted) {
      dispatch(asyncDownVoteThreadDetail(threadId));
      return;
    }
    dispatch(asyncNeutralVoteThreadDetail(threadId));
  };

  return (
    <ThreadDetailWrapper>
      <ThreadHeader>
        <Avatar src={user?.avatar} alt={user?.name} />

        <User>
          <Username>{user?.name}</Username>
          <PostedTime>{postedAt(createdAt)}</PostedTime>
        </User>

        <ShareButton onClick={() => shareLink({ title, threadId })}>
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
        <Votes>
          <VoteButton
            icon={<HiArrowUp />}
            isVoted={isUpVoted}
            label={upVotesBy.length}
            onClick={() => voteHandler('up-vote')}
          />

          <VoteButton
            icon={<HiArrowDown />}
            isVoted={isDownVoted}
            label={downVotesBy.length}
            onClick={() => voteHandler('down-vote')}
          />
        </Votes>
      </ThreadFooter>
    </ThreadDetailWrapper>
  );
}

export default ThreadDetail;

const ThreadDetailWrapper = styled.section`
  padding: 1.3em;
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
  margin-top: 0.3em;
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
  padding: 0 0.2em;
  display: flex;
  user-select: none;
`;

const Votes = styled.div`
  display: flex;
  gap: 1em;
`;
