import React from 'react';
import parser from 'html-react-parser';
import styled from 'styled-components';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { intToString } from '../../utils/intToString';
import { postedAt } from '../../utils/formatDate';
import { Button } from '../Styled/Button';
import Avatar from '../Styled/Avatar';

function CommentItem({
  // id,
  title,
  createdAt,
  content,
  upVotesBy,
  downVotesBy,
  owner,
  // authUser,
}) {
  return (
    <CommentItemWrapper>
      <CommentHeader>
        <Avatar src={owner?.avatar} alt={owner?.name} />

        <User>
          <Username>{owner?.name}</Username>
          <PostedTime>{postedAt(createdAt)}</PostedTime>
        </User>
      </CommentHeader>

      <CommentBody>
        <ContentTitle>{title}</ContentTitle>
        <Description>{parser(content)}</Description>
      </CommentBody>

      <CommentFooter>
        <VoteButton>
          <FiThumbsUp />
          <span>
            {intToString(upVotesBy.length)}
          </span>
        </VoteButton>

        <VoteButton>
          <FiThumbsDown />
          <span>
            {intToString(downVotesBy.length)}
          </span>
        </VoteButton>
      </CommentFooter>
    </CommentItemWrapper>
  );
}

export default CommentItem;

const CommentItemWrapper = styled.section`
  padding: 1em 1em 1.5em 1em;
  gap: 0.5em;
  background-color: #fff;
  border-radius: 0.7em;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #f5f5f5;
  overflow: hidden;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8em;
  width: 100%;
`;

const User = styled.div`
  word-break: break-all;
`;
const Username = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
`;
const PostedTime = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: #757575;
`;

const CommentBody = styled.div`
  width: 100%;
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin-top: 1.2em;
`;
const ContentTitle = styled.h5`
  font-size: 0.85rem;
  font-weight: 500;
`;
const Description = styled.div`
  margin-top: 0.5em;
  font-size: 0.85rem;
  font-weight: 400;
  color: #757575;
`;

const CommentFooter = styled.div`
  margin-top: 1.2em;
  display: flex;
  gap: 1.5em;
`;
const VoteButton = styled(Button)`
  font-size: 1rem;
  font-weight: 400;

  span {
    font-size: 0.875rem;
    font-weight: 400;
  }
`;
