import React from 'react';
import parser from 'html-react-parser';
import styled from 'styled-components';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { intToString } from '../../utils/intToString';
import { postedAt } from '../../utils/formatDate';
import { Button } from '../Styled/Button';
import Avatar from '../Styled/Avatar';

function ThreadDetail({
  // id,
  title,
  createdAt,
  body,
  category,
  upVotesBy,
  downVotesBy,
  user,
  // authUser,
}) {
  return (
    <ThreadDetailWrapper>
      <ThreadHeader>
        <Avatar src={user?.avatar} alt={user?.name} />

        <User>
          <Username>{user?.name}</Username>
          <PostedTime>{postedAt(createdAt)}</PostedTime>
        </User>
      </ThreadHeader>

      <ThreadBody>
        <ContentTitle>{title}</ContentTitle>
        <Description>{parser(body)}</Description>

        <CategoryList>
          <Category>{category}</Category>
        </CategoryList>
      </ThreadBody>

      <ThreadFooter>
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
  font-size: 0.85rem;
  font-weight: 500;
`;
const PostedTime = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: #757575;
`;

const ThreadBody = styled.div`
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

const CategoryList = styled.div`
  margin-top: 1.2em;
  display: flex;
  gap: 0.2em;
`;
const Category = styled.span`
  color: #757575;
  background-color: #f5f5f5;
  border: 1px solid #d6d6d6;
  border-radius: 0.4em;
  padding: 0.125em 0.5em;
  font-size: 0.85rem;
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
    font-size: 0.875rem;
    font-weight: 400;
  }
`;
