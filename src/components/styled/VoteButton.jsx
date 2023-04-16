import React from 'react';
import styled from 'styled-components';
import { intToString } from '../../utils/intToString';

function VoteButton({
  icon, isVoted, label, onClick,
}) {
  return (
    <Vote isVoted={isVoted} onClick={onClick}>
      {icon}
      <p>
        <span>{intToString(label)}</span>
        {' '}
        Votes
      </p>
    </Vote>
  );
}

export default VoteButton;

const Vote = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6em;
  outline: none;
  border: none;
  background: none;
  color: #757575;

  svg {
    transition: all 100ms ease;
    font-size: 1.2rem;
    border-radius: 50%;
    padding: 0.15em;
    cursor: pointer;

    &:hover {
      color: #6465D0;
    }
  }

  ${({ isVoted }) => isVoted
    && `
    svg {
      color: #fff;
      background: #6465D0;

        &:hover {
          color: #fff;
        }
      }
  `}

  p {
    span {
      font-weight: 600;
    }

    font-size: 0.75rem;
    font-weight: 400;
  }
`;
