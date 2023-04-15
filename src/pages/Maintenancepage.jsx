import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MainContainer } from '../components/Styled/MainContainer';

function Maintenancepage() {
  return (
    <MainContainer>
      <Wrapper>
        <h3>Feature is under maintenance</h3>
        <Link to="/">Back to home</Link>
      </Wrapper>
    </MainContainer>
  );
}

export default Maintenancepage;

const Wrapper = styled.div`
  margin-top: 3em;
  text-align: center;
`;
