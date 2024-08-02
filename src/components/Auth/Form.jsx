import styled from '@emotion/styled';
import * as mixins from '@/assets/style/modules/mixins';
import googleImg from '@/assets/img/google.svg';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { signIn, signUp, googleAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function switchAction(v) {
    setIsLogin(v);
    reset();
  }

  function reset() {
    setEmail('');
    setPassword('');
    setErrors({});
    setConfirmPassword('');
  }

  const disable = !(email.trim() && password.trim());

  async function login() {
    setErrors({});

    const data = await signIn(
      {
        email,
        password,
      },
      () => navigate('/'),
    );
    if (data && data.type == 'error') {
      setErrors(data.errors);
    }
  }

  async function register() {
    setErrors({});

    const data = await signUp(
      {
        email,
        password,
        confirmPassword,
      },
      () => navigate('/'),
    );

    if (data && data.type == 'error') {
      setErrors(data.errors);
    }
  }

  function google() {
    googleAuth(() => navigate('/'));
  }

  // console.log(errors);
  return (
    <Body>
      <Switch login={isLogin}>
        <SwitchItem onClick={() => switchAction(true)}>Log in</SwitchItem>
        <SwitchItem onClick={() => switchAction(false)}>Sig up</SwitchItem>
      </Switch>
      <GoogleAuthButton onClick={google}>
        <GoogleText>Authentication with Google</GoogleText>
        <GoogleAuth src={googleImg} alt="google auth" />
      </GoogleAuthButton>
      {isLogin ? (
        <FormStyled>
          <Input
            error={errors.email}
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            error={errors.password}
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button disabled={disable} onClick={login}>
            Log in
          </Button>
        </FormStyled>
      ) : (
        <FormStyled>
          <Input
            error={errors.email}
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            error={errors.password}
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            type="password"
            error={errors.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <Button
            disabled={disable || !confirmPassword.trim()}
            onClick={register}
          >
            Sign up
          </Button>
        </FormStyled>
      )}
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  ${mixins.adaptivValue('padding', 30, 6, 1)}
  background-color:#1d1d38;
  border-radius: 10px;
`;

const Switch = styled.div(
  props => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  background-color: #16162b;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  ${mixins.adaptivValue('margin-bottom', 15, 10, 1)}

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    background: #252544;
    width: calc(50% - 10px);
    height: calc(100% - 4px * 2);
    left: 5px;
    top: 4px;
    border-radius: 5px;
    transition: all 0.3s ease 0s;
    ${!props.login && 'left: calc(50% + 5px)'}
  }
`,
);

const SwitchItem = styled.div`
  text-align: center;
  ${mixins.adaptivValue('font-size', 25, 20, 1)}
  position: relative;
  z-index: 2;
  width: 100%;
  cursor: pointer;
`;

const GoogleAuthButton = styled.button`
  align-self: center;
  width: 100%;
  max-width: 300px;
  background: #303055;
  border-radius: 10px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  margin-bottom: 10px;

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      transform: translateY(3px);
    }
  }
`;

const GoogleText = styled.span`
  ${mixins.adaptivValue('font-size', 18, 16, 1)}
`;

const GoogleAuth = styled.img`
  width: 100%;
  max-width: 30px;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
