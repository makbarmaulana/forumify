import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';

function Comments({ comments }) {
  return (
    <CommentsList>
      <TotalComments>
        Replies (
        {comments.length}
        )
      </TotalComments>

      {comments.map((comment) => (
        <CommentItem {...comment} key={comment.id} />
      ))}
    </CommentsList>
  );
}

export default Comments;

const CommentsList = styled.div``;
const TotalComments = styled.h3`
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
`;
