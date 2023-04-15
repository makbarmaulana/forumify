import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { intToString } from '../../../utils/intToString';
import { postedAt } from '../../../utils/formatDate';
import { Button } from '../../Styled/Button';
import {
  asyncClearVoteComment,
  asyncDownVoteComment,
  asyncUpVoteComment,
} from '../../../states/threadDetail/action';
import Avatar from '../../Styled/Avatar';

function CommentItem({
  commentId, threadId, createdAt, content, upVotesBy, downVotesBy, owner, authUser,
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
      dispatch(asyncUpVoteComment({ threadId, commentId }));
      return;
    }

    if (type === 'downvote' && !isDisliked) {
      dispatch(asyncDownVoteComment({ threadId, commentId }));
      return;
    }

    dispatch(asyncClearVoteComment({ threadId, commentId }));
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
          <VoteButton onClick={() => voteHandler('upvote')}>
            <FiThumbsUp style={isLiked && { fill: 'red' }} />
            <span>{intToString(upVotesBy.length)}</span>
          </VoteButton>

          <VoteButton onClick={() => voteHandler('downvote')}>
            <FiThumbsDown style={isDisliked && { fill: 'red' }} />
            <span>{intToString(downVotesBy.length)}</span>
          </VoteButton>
        </CommentFooter>
      </CommentContent>
    </CommentItemWrapper>
  );
}

export default CommentItem;

const CommentItemWrapper = styled.section`
  padding: 0.8em;
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
  gap: 1em;
`;
const VoteButton = styled(Button)`
  font-size: 0.8rem;
  font-weight: 400;

  span {
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
