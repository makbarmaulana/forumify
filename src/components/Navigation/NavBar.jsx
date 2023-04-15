import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MdAdd, MdLeaderboard, MdHomeFilled, MdNotifications, MdPerson,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { NavItem } from './NavItem';
import { asyncLogOut } from '../../states/authUser/action';
import { Button } from '../Styled/Button';
import Avatar from '../Styled/Avatar';

function Navbar() {
  const { authUser } = useSelector((states) => states);
  const [showLogout, setShowLogout] = useState(false);

  const isAuth = useAuth();
  const dispatch = useDispatch();

  const toggleProfileHandler = () => {
    setShowLogout(Boolean(!showLogout));
  };

  const logOutHandler = () => {
    dispatch(asyncLogOut());
  };

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

      <Notifications to="/maintenance">
        <MdNotifications />
      </Notifications>

      {isAuth ? (
        <Profile onClick={toggleProfileHandler}>
          <Avatar width="1.3em" src={authUser.avatar} alt={authUser.name} />

          <LogOutButton isActive={showLogout} onClick={logOutHandler}>
            Logout
          </LogOutButton>
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
  // delete this
  width: 425px;
  margin: auto;
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

const Profile = styled(NavItem)`
  position: relative;
`;

const LogOutButton = styled(Button)`
  position: absolute;
  top: -180%;
  right: 0;
  font-size: 0.75rem;
  color: #757575;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  border-radius: 0.4em;
  padding: 0.5em 1em;
  opacity: 0;
  visibility: hidden;
  transition: all 150ms ease;

  &:hover {
    color: #fff;
    background-color: #5d9dfe;
    border-color: currentColor;
  }

  ${({ isActive }) => isActive && `
    opacity: 1;
    visibility: visible;
  `}
`;
