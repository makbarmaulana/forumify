import React from 'react';
import styled from 'styled-components';
import {
  MdAdd, MdLeaderboard, MdHomeFilled, MdNotifications, MdPerson,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { NavItem } from './NavItem';
import Avatar from '../Styled/Avatar';

function Navbar() {
  const { authUser } = useSelector((states) => states);
  const isAuth = useAuth();

  return (
    <NavBar>
      <Home to="/">
        <MdHomeFilled />
      </Home>

      <Leaderboards to="/leaderboards">
        <MdLeaderboard />
      </Leaderboards>

      <AddThread to="/new">
        <MdAdd />
      </AddThread>

      <Notifications to="/notifications">
        <MdNotifications />
      </Notifications>

      {isAuth ? (
        <Profile to="/profile">
          <Avatar
            width="1.3em"
            src={authUser.avatar}
            alt={authUser.name}
          />
        </Profile>
      ) : (
        <Profile to="/login">
          <MdPerson />
        </Profile>
      )}
    </NavBar>
  );
}

export default Navbar;

const NavBar = styled.nav`
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 0.5rem;
  background: #fff;
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.1);
`;
const Home = styled(NavItem)``;
const Leaderboards = styled(NavItem)``;
const AddThread = styled(NavItem)`
  border: 1px solid #757575;
  border-radius: 0.5em;
  padding: 0.1em;

  &:hover {
    background-color: #757575;

    svg {
      color: #fff;
    }
  }
`;
const Notifications = styled(NavItem)``;
const Profile = styled(NavItem)``;
