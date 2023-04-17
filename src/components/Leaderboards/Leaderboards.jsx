import React from 'react';
import styled from 'styled-components';
import Avatar from '../Styled/Avatar';

function Leaderboards({ leaderboards }) {
  return (
    <Container>
      <Title>Top User</Title>
      <UserList>
        {leaderboards.map(({ user, score }) => (
          <UserItem key={user?.id}>
            <Avatar src={user?.avatar} alt={user?.name} width="1.8em" />
            <Username>{user?.name}</Username>
            <Score>{score}</Score>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
}

export default Leaderboards;

const Container = styled.div`
  padding: 1em;
  background-color: #fff;
  border-radius: 0.7em;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #f5f5f5;
  overflow: hidden;
  margin-bottom: 3em;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1em;
`;

const UserList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.7em;
`;
const Username = styled.h5`
  font-size: 0.9rem;
  font-weight: 500;
`;
const Score = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: auto;
`;
