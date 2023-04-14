import styled, { css } from 'styled-components';

const buttonStyles = css`
  all: unset;
  color: #757575;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1;
  transition: all 150ms ease;
`;

export const Button = styled.button`
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return css`
          ${buttonStyles}
          padding: 0.6em;
          color: #fff;
          background-color: #5d9dfe;
          border-radius: 0.2em;

          &:hover {
            background-color: #6da5fa;
          }
        `;
      default:
        return css`
          ${buttonStyles}
          gap: 0.5em;
          display: flex;
          align-items: center;
        `;
    }
  }}
`;

Button.defaultProps = {
  type: 'button',
};
