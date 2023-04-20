import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FiHome, FiUsers, FiPlus, FiBell, FiUser,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogOut } from '../../states/authUser/action';
import useAuth from '../../hooks/useAuth';
import NavItem from './NavItem';
import Button from '../Styled/Button';
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

  const addHandler = () => {
    if (!isAuth) {
      alert('Please login first');
    }
  };

  return (
    <NavBar>
      <Home to="/">
        <FiHome />
      </Home>

      <Leaderboards to="/leaderboards">
        <FiUsers />
      </Leaderboards>

      <AddThread to={isAuth && '/new'} onClick={addHandler}>
        <FiPlus />
      </AddThread>

      <Notifications to="/maintenance">
        <FiBell />
      </Notifications>

      {isAuth ? (
        <Profile onClick={toggleProfileHandler}>
          <Avatar width="1.3em" src={authUser.avatar} alt={authUser.name} />

          <LogOutButton
            variant="secondary"
            toggle={showLogout}
            onClick={logOutHandler}
          >
            Logout
          </LogOutButton>
        </Profile>
      ) : (
        <Profile to="/login">
          <FiUser />
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
  padding: 0.7rem;
  background-color: #fff;
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.1);
  // mobile device
  width: 425px;
  margin: auto;
`;

const Home = styled(NavItem)``;
const Leaderboards = styled(NavItem)``;

const AddThread = styled(NavItem)`
  border-radius: 0.5em;
  padding: 0.1em;
  background-color: #6465d0;

  &:hover {
    background-color: #7a7ce4;
  }

  svg {
    color: #fff !important;
  }
`;
const Notifications = styled(NavItem)``;

const Profile = styled(NavItem)`
  position: relative;
`;

const LogOutButton = styled(Button)`
  padding: 0.5em 1em;
  position: absolute;
  top: -200%;
  right: 0;
  opacity: 0;
  visibility: hidden;

  ${({ toggle }) => toggle
    && `
    opacity: 1;
    visibility: visible;
  `}
`;
