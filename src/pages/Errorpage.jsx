import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MainContainer } from '../components/Styled/MainContainer';

function Errorpage() {
  return (
    <MainContainer>
      <Wrapper>
        <h3>404 Page not found</h3>
        <Link to="/">Back to home</Link>
      </Wrapper>
    </MainContainer>
  );
}

export default Errorpage;

const Wrapper = styled.div`
  margin-top: 3em;
  text-align: center;
`;
