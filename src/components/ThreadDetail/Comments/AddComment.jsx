import React from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useInput } from '../../../hooks/useInput';
import { Input } from '../../Styled/Input';
import { Button } from '../../Styled/Button';
import { asyncAddComment } from '../../../states/threadDetail/action';
import Avatar from '../../Styled/Avatar';

function AddComment({ authUser, id: threadId }) {
  const [content, onContentChange, setContent] = useInput('');

  const dispatch = useDispatch();

  const addCommentHandler = () => {
    dispatch(asyncAddComment({ threadId, content }));
    setContent('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addCommentHandler();
    }
  };

  return (
    <AddCommentWrapper>
      <Avatar src={authUser?.avatar} alt={authUser?.name} width="2em" />

      <AddCommentInput
        type="text"
        placeholder="Add comment..."
        value={content}
        onChange={onContentChange}
        onKeyDown={handleKeyDown}
      />

      {content && (
        <AddButton onClick={addCommentHandler}>
          <FiSend />
        </AddButton>
      )}
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
  // delete this
  width: 425px;
  margin: auto;
`;

const AddCommentInput = styled(Input)`
  border-radius: 30px;
  font-size: 0.85rem;
`;

const AddButton = styled(Button)`
  font-size: 1rem;
`;
