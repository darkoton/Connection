import styled from '@emotion/styled';
import PropsType from 'prop-types';
import vars from '@/assets/style/modules/vars';
import * as mixins from '@/assets/style/modules/mixins';
UiInput.propTypes = {
  placeholder: PropsType.string,
  value: PropsType.string,
  onChange: PropsType.func,
  name: PropsType.string,
  id: PropsType.string,
  error: PropsType.object,
  size: PropsType.oneOfType([PropsType.string, PropsType.number]),
};

export default function UiInput({
  placeholder,
  value,
  onChange,
  name,
  id,
  error,
  size = 18,
  ...props
}) {
  return (
    <InputContainer>
      <InputField
        id={id}
        value={value}
        onChange={onChange}
        required
        name={name}
        error={error}
        size={size}
        {...props}
      />
      {error && <InputError>{error.message}</InputError>}
      <InputPlaceholder size={size} htmlFor={id}>
        {placeholder}
      </InputPlaceholder>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  position: relative;
  font-size: 18px;
  margin-top: 6%;
`;

const InputPlaceholder = styled.label`
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 0;
  bottom: 0px;
  /* transform: translate(0, -50%); */
  transition: all 0.3s ease 0s;
  ${({ size }) => mixins.adaptivValue('font-size', size, size - 2, 1)}
`;

const InputField = styled.input`
  background-color: transparent;
  color: #fff;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #fff;
  z-index: 1;
  ${({ size }) => mixins.adaptivValue('font-size', size, size - 2, 1)}

  &:focus ~ label,
  &:valid ~ label {
    /* transform: translateY(calc(-100% - 0px)); */
    bottom: calc(70%);
    font-size: 80%;
  }
  ${props => props.error && 'border-color:red'}
`;

const InputError = styled.span`
  font-size: 16px;
  color: ${vars.$colorError};
`;
