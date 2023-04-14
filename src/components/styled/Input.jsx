import styled from 'styled-components';

// const primaryColor = '#f5f5f5';
// const secondaryColor = '#d6d6d6';
// const grayColor = '#757575';

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.5em 0.7em;
  border: 1px solid #d6d6d6;
  border-radius: 0.2em;

  ::placeholder {
    font-size: inherit;
    font-weight: 400;
    color: #757575;
  }

  :focus-visible {
    outline: 1px solid #757575;
  }

  &[type='password']::-ms-reveal,
  &[type='password']::-ms-clear {
    display: none;
  }
`;
