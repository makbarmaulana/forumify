import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';

function Comments({ threadDetail }) {
  const { comments, authUser } = threadDetail;

  return (
    <>
      <TotalComments>
        Replies (
        {comments.length}
        )
      </TotalComments>
      <CommentsList>
        {comments.map((comment) => (
          <CommentItem
            {...comment}
            key={comment.id}
            commentId={comment.id}
            threadId={threadDetail.id}
            authUser={authUser}
          />
        ))}
      </CommentsList>
    </>
  );
}

export default Comments;

const CommentsList = styled.div`
  border-radius: 0.7em;
  overflow: hidden;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 5em;
`;
const TotalComments = styled.h3`
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
`;
