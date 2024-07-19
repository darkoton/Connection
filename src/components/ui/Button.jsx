import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins.js';
import PropTypes from 'prop-types';

UiButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
};

export default function UiButton({ children, onClick = () => {}, ...props }) {
  return (
    <Button
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mixins.adaptivValue('font-size', 20, 18, 1)}
  ${mixins.adaptivIndent('padding', 8, 4, 10, 5, 1)}
  background: #2c2c50;
  border-radius: 5px;

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      background: #3a3a66;
    }
  }

  &:disabled {
    color: #9b9b9b;
    background: #23233a;
    cursor: not-allowed;
  }
`;
