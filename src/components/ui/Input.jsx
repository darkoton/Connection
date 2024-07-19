import styled from '@emotion/styled';
import PropsType from 'prop-types';
import vars from '@/assets/style/modules/vars';
UiInput.propTypes = {
  placeholder: PropsType.string,
  value: PropsType.string,
  onChange: PropsType.func,
  name: PropsType.string,
  id: PropsType.string,
  error: PropsType.object,
};

export default function UiInput({
  placeholder,
  value,
  onChange,
  name,
  id,
  error,
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
        {...props}
      />
      {error && <InputError>{error.message}</InputError>}
      <InputPlaceholder htmlFor={id}>{placeholder}</InputPlaceholder>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  position: relative;
  font-size: 20px;
  margin-top: 6%;
`;

const InputPlaceholder = styled.label`
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 0;
  bottom: 0px;
  /* transform: translate(0, -50%); */
  transition: all 0.3s ease 0s;
`;

const InputField = styled.input`
  background-color: transparent;
  color: #fff;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #fff;
  z-index: 1;

  &:focus ~ label,
  &:valid ~ label {
    /* transform: translateY(calc(-100% - 0px)); */
    bottom: 100%;
    font-size: 80%;
  }
  ${props => props.error && 'border-color:red'}
`;

const InputError = styled.span`
  font-size: 16px;
  color: ${vars.$colorError};
`;
