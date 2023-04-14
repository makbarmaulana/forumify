import React, { useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { IoArrowBack, IoShareSocial } from 'react-icons/io5';
import { Input } from '../Styled/Input';
import { Button } from '../Styled/Button';

function Appbar({ pathname }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  if (pathname === '/') {
    return (
      <AppBarWrapper>
        <Brand to="/">forum.</Brand>

        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <SearchIcon>
            <BiSearch />
          </SearchIcon>
        </SearchBar>
      </AppBarWrapper>
    );
  }

  return (
    <AppBarWrapper>
      <BackToHome to="/">
        <IoArrowBack />
      </BackToHome>

      <Title>Comments</Title>

      <ShareButton>
        <IoShareSocial />
      </ShareButton>
    </AppBarWrapper>
  );
}

export default Appbar;

const AppBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8em 1em;
`;

const Brand = styled(NavLink)`
  font-size: 1.2rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  user-select: none;
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  min-width: 150px;
  width: 30%;
  `;

const SearchInput = styled(Input)`
  opacity: 0;
  width: 0%;
  font-size: 0.85rem;
  border-radius: 3em;
  margin-right: 0.3em;
  transition: all ease 0.2s;
  cursor: pointer;

  &:focus {
    padding: 0.5em 2em 0.5em 1em;
    opacity: 1;
    width: 100%;
    cursor: text;
  }
`;

const SearchIcon = styled(Button)`
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 1.3rem;
  margin-right: 0.3em;
  transform: translateY(-50%);
  pointer-events: none;
  cursor: pointer;
`;

const BackToHome = styled(NavLink)`
  font-size: 1.2rem;
  color: #757575;
  text-decoration: none;
`;

const Title = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  user-select: none;
`;

const ShareButton = styled(Button)`
  font-size: 1.2rem;
`;
