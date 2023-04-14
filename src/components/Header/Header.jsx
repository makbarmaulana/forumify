import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Appbar from './Appbar';
import Category from './Categories/Categories';

function Header() {
  const { pathname } = useLocation();

  return (
    <HeaderContainer>
      <Appbar pathname={pathname} />
      {pathname === '/' && <Category />}
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
`;
