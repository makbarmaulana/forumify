import React from 'react';
import styled from 'styled-components';
import { Button } from '../Styled/Button';
import { Input } from '../Styled/Input';
import { useInput } from '../../hooks/useInput';

function AddThread({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const addThreadHandler = () => {
    addThread({ title, category, body });
  };

  return (
    <FormWrapper>
      <Label htmlFor="title">Title</Label>
      <InputField
        type="text"
        id="title"
        value={title}
        onChange={onTitleChange}
        required
      />

      <Label htmlFor="category">Category</Label>
      <InputField
        type="text"
        id="category"
        value={category}
        onChange={onCategoryChange}
      />

      <Label htmlFor="body">Description</Label>
      <Descriptions
        as="textarea"
        id="body"
        value={body}
        onChange={onBodyChange}
        required
      />

      <AddButton
        variant="primary"
        onClick={addThreadHandler}
      >
        ADD
      </AddButton>
    </FormWrapper>
  );
}

export default AddThread;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2em 1.5em;
`;
const Label = styled.label`
  display: block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025rem;
  color: #757575;
  margin-bottom: 0.3rem;
`;
const InputField = styled(Input)`
  margin-bottom: 1em;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0.5em;
`;
const Descriptions = styled(Input)`
  height: 7em;
  resize: none;
`;

const AddButton = styled(Button)`
  margin-top: 1em;
  text-align: center;
`;
