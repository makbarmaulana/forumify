import React from 'react';
import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';
import StyledLink from '../../Styled/StyledLink';

function AppbarOther({ title }) {
  return (
    <AppBarWrapper>
      <BackToHome to="/">
        <IoArrowBack />
      </BackToHome>

      <Title>{title}</Title>
    </AppBarWrapper>
  );
}

export default AppbarOther;

const AppBarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.3em 0 ;
`;

const BackToHome = styled(StyledLink)`
  font-size: 1.2rem;
  color: #757575;
`;

const Title = styled.h3`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  font-weight: 500;
  user-select: none;
`;
