import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  color: #757575;

  &:hover {
    color: #6465D0;
  }
`;
