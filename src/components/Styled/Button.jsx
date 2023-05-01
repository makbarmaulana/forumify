import styled, { css } from 'styled-components';

const buttonStyles = css`
  all: unset;
  color: #757575;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  transition: all 100ms ease;
`;

const Button = styled.button`
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return css`
          ${buttonStyles}
          padding: 0.8em;
          color: #fff;
          background-color: #6465d0;
          border-radius: 0.2em;

          &:hover {
            background-color: #7a7ce4;
          }
        `;
      case 'secondary':
        return css`
          ${buttonStyles}
          padding: 0.8em;
          color: #757575;
          background-color: #fff;
          border: 1px solid #dedede;
          border-radius: 0.2em;

          &:hover {
            color: #fff;
            background-color: #6465d0;
          }
        `;
      default:
        return css`
          ${buttonStyles}
          display: flex;
          align-items: center;
          gap: 0.5em;

          &:hover {
            color: #6465d0;
          }
        `;
    }
  }}
`;

Button.defaultProps = {
  type: 'button',
};

export default Button;
