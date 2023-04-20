import React from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi';
import {
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from '../../../states/threadDetail/action';
import postedAt from '../../../utils/formatDate';
import Avatar from '../../Styled/Avatar';
import VoteButton from '../../Styled/VoteButton';

function CommentItem({ comment, threadId, authUser }) {
  const {
    id: commentId,
    createdAt,
    content,
    upVotesBy,
    downVotesBy,
    owner,
  } = comment;
  const dispatch = useDispatch();
  const isUpVoted = upVotesBy.includes(authUser?.id);
  const isDownVoted = downVotesBy.includes(authUser?.id);

  const voteHandler = (voteType) => {
    if (!authUser) {
      alert('Please login first');
      return;
    }
    if (voteType === 'up-vote' && !isUpVoted) {
      dispatch(asyncUpVoteComment({ threadId, commentId }));
      return;
    }
    if (voteType === 'down-vote' && !isDownVoted) {
      dispatch(asyncDownVoteComment({ threadId, commentId }));
      return;
    }
    dispatch(asyncNeutralVoteComment({ threadId, commentId }));
  };

  return (
    <CommentItemWrapper>
      <ImageBox>
        <Avatar src={owner?.avatar} alt={owner?.name} width="1.7em" />
      </ImageBox>

      <CommentContent>
        <CommentBody>
          <User>
            <Username>{owner?.name}</Username>
            <PostedTime>{postedAt(createdAt)}</PostedTime>
          </User>

          <Description>{parser(content)}</Description>
        </CommentBody>

        <CommentFooter>
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
        </CommentFooter>
      </CommentContent>
    </CommentItemWrapper>
  );
}

export default CommentItem;

const CommentItemWrapper = styled.section`
  padding: 1em;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  overflow: hidden;
  display: flex;
  gap: 0.5em;
`;

const ImageBox = styled.div``;

const CommentContent = styled.div`
  width: 100%;
`;

const CommentBody = styled.div``;

const User = styled.div`
  word-break: break-all;
  gap: 0.4em;
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

const Description = styled.div`
  margin-top: 0.5em;
  font-size: 0.8rem;
  font-weight: 400;
  color: #757575;
`;

const CommentFooter = styled.div`
  margin-top: 1.2em;
  display: flex;
  user-select: none;
`;

const Votes = styled.div`
  display: flex;
  gap: 1em;
`;
