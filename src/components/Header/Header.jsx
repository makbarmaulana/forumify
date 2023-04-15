import React from 'react';
import styled from 'styled-components';

function Header({ children }) {
  return (
    <HeaderContainer>
      {children}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 0.5em 1em;
`;
