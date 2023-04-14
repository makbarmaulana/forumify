import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '../Styled/Avatar';
import { Input } from '../Styled/Input';

function AddComment({ avatar, name }) {
  const [commentValue, setCommentValue] = useState('');

  return (
    <AddCommentWrapper>
      <Avatar src={avatar} alt={name} width="2em" />

      <AddCommentInput
        type="text"
        placeholder="Add comment..."
        value={commentValue}
        onChange={({ target }) => setCommentValue(target.value)}
      />
    </AddCommentWrapper>
  );
}

export default AddComment;

const AddCommentWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem;
  background: #fff;
  border-top: 1px solid #d6d6d6;
  z-index: 2;
`;

const AddCommentInput = styled(Input)`
  border-radius: 30px;
  font-size: 0.85rem;
`;
