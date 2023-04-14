import React from 'react';
import parser from 'html-react-parser';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiMessageSquare, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { Button } from '../Styled/Button';
import { intToString } from '../../utils/intToString';
import { postedAt } from '../../utils/formatDate';
import Avatar from '../Styled/Avatar';

function ThreadItem({
  id,
  title,
  createdAt,
  body,
  category,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  // authUser,
}) {
  const goToThreadDetail = `/threads/${id}`;

  return (
    <ThreadWrapper>
      <ThreadHeader>
        <Avatar src={user?.avatar} alt={user?.name} />

        <User>
          <Username>{user?.name}</Username>
          <PostedTime>{postedAt(createdAt)}</PostedTime>
        </User>

        <ShareButton>
          <IoShareSocialOutline />
        </ShareButton>
      </ThreadHeader>

      <ThreadBody as={NavLink} to={goToThreadDetail}>
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

        <CommentsButton as={NavLink} to={goToThreadDetail}>
          <FiMessageSquare />
          <span>
            {intToString(totalComments)}
          </span>
        </CommentsButton>
      </ThreadFooter>
    </ThreadWrapper>
  );
}

export default ThreadItem;

const ThreadWrapper = styled.section`
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
const ShareButton = styled(Button)`
  margin-left: auto;
  font-size: 1.3rem;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
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
  display: flex;
  gap: 1.5em;
  user-select: none;
`;
const VoteButton = styled(Button)`
  font-size: 1rem;
  font-weight: 400;

  span {
    font-size: 0.875rem;
    font-weight: 400;
  }
  `;
const CommentsButton = styled(Button)`
  font-size: 1rem;
  font-weight: 400;

  span {
    font-size: 0.875rem;
    font-weight: 400;
  }
`;
