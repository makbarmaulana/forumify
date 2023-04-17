import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { intToString } from '../../utils/intToString';

function CommentButton({ to, icon, label }) {
  return (
    <Anchor to={to}>
      {icon}
      <p>
        <span>{intToString(label)}</span>
        {' '}
        Answer
      </p>
    </Anchor>
  );
}

export default CommentButton;

const Anchor = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6em;
  outline: none;
  border: none;
  background: none;
  color: #757575;
  cursor: pointer;

  &:hover > svg {
    color: #6465d0;
  }

  svg {
    transition: all 100ms ease;
    font-size: 1.3rem;
    border-radius: 50%;
    padding: 0.15em;
  }

  p {
    span {
      font-weight: 600;
    }

    font-size: 0.75rem;
    font-weight: 400;
  }
`;
