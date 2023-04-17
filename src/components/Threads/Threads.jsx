import React from 'react';
import styled from 'styled-components';
import ThreadItem from './ThreadItem';

function Threads({ threads }) {
  return (
    <ThreadList>
      {threads.map((thread) => (
        <ThreadItem {...thread} key={thread.id} />
      ))}
    </ThreadList>
  );
}

export default Threads;

const ThreadList = styled.div`
  display: grid;
  gap: 1em;
  margin-bottom: 4em;
`;
