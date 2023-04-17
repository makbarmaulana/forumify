import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  transition: all 200ms ease-in-out;

  svg {
    font-size: 1.2rem;
    color: #757575;

    &:hover {
      color: #6465d0;
    }
  }

  &.active svg {
    color: #6465d0;
  }
`;
