import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi';
import { postedAt } from '../../../utils/formatDate';
import {
  asyncClearVoteComment,
  asyncDownVoteComment,
  asyncUpVoteComment,
} from '../../../states/threadDetail/action';
import Avatar from '../../Styled/Avatar';
import VoteButton from '../../Styled/VoteButton';

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
          <Votes>
            <VoteButton
              icon={<HiArrowUp />}
              isVoted={isLiked}
              label={upVotesBy.length}
              onClick={() => voteHandler('upvote')}
            />

            <VoteButton
              icon={<HiArrowDown />}
              isVoted={isDisliked}
              label={downVotesBy.length}
              onClick={() => voteHandler('downvote')}
            />
          </Votes>
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
  user-select: none;
  `;

const Votes = styled.div`
  display: flex;
  gap: 1em;
`;
