import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import * as mixins from '@/assets/style/modules/mixins';
import vars from '@/assets/style/modules/vars';
import google from '@/assets/img/google.svg';
import { css } from '@emotion/react';
import { googleAuth } from '@/utils/auth';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import logoImg from '@/assets/img/logo.png';

export function Logo(props) {
  const { nodes, materials } = useGLTF('/models/logo.glb');
  const logoRef = useRef(null);

  useFrame((state, delta) => {
    logoRef.current.rotation.x += delta * 0.5;
    logoRef.current.rotation.y += delta * 0.5;
    logoRef.current.rotation.z += delta * 0.5;
  });
  return (
    <group {...props} dispose={null} ref={logoRef}>
      <group scale={1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_0.geometry}
          material={materials.Mat_1}
          scale={1}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/logo2.glb');

export default function Home() {
  const navigate = useNavigate();

  function googleHandle() {
    googleAuth(() => navigate('/'));
  }

  return (
    <Page>
      <Header>
        <Container>
          <HeaderBody>
            <HeaderLogo>
              <HeaderLogoImg src={logoImg} alt="logo" />
              <HeaderLogoText>Connection</HeaderLogoText>
            </HeaderLogo>
          </HeaderBody>
        </Container>
      </Header>

      <Main>
        <Container>
          <MainBody>
            <HomeMain>
              <HomeLeft>
                <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                  <Suspense fallback={null}>
                    <Stage preset="rembrandt" intensity={1} environment="city">
                      false
                      <Logo />
                      false
                    </Stage>
                  </Suspense>
                  {/* <OrbitControls autoRotate /> */}
                </Canvas>
              </HomeLeft>
              <HomeRight>
                <TagLine>
                  Connection. Have a convenient connection with everyone!
                </TagLine>

                <Join>Join us:</Join>

                <AuthButtons>
                  <Button onClick={googleHandle}>
                    Google Auth <Google src={google} alt="google" />
                  </Button>
                  <Or>or</Or>
                  <Button onClick={() => navigate('/authentication')}>
                    Sign up
                  </Button>
                </AuthButtons>
              </HomeRight>
            </HomeMain>
          </MainBody>
        </Container>
      </Main>

      <Footer>
        <Container>
          <FooterBody>
            <FooterRights>
              © 2024
              <a target="_blank" href="https://github.com/darkoton">
                Darkoto
              </a>
            </FooterRights>
          </FooterBody>
        </Container>
      </Footer>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
  flex: 1 1 auto;
  display: flex;
`;

const Header = styled.header`
  padding: 8px 10px;
  background: #191935;
`;

const HeaderBody = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

const HeaderLogoImg = styled.img`
  width: 50px;
  max-width: 100%;
`;

const HeaderLogoText = styled.span`
  ${mixins.adaptivValue('font-size', 30, 20)}
  font-weight: bold;
`;

const Main = styled.div`
  flex: 1 1 auto;
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const HomeMain = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 20px;
  ${mixins.adaptivValue('margin-top', 50, 20, 1)}

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const Item = css`
  @media (max-width: 680px) {
    width: 100%;
  }
`;

const HomeLeft = styled.div`
  width: 50%;
  height: 100%;
  max-height: 100%;
  ${Item}
`;

const HomeRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  ${Item}
`;

const TagLine = styled.div`
  ${mixins.adaptivValue('font-size', 40, 25, 1)}
  ${mixins.adaptivValue('line-height', 40, 30, 1)}
  font-weight: bold;
  margin-bottom: 20px;
`;

const Join = styled.div`
  ${mixins.adaptivValue('font-size', 30, 25, 1)}
  ${mixins.adaptivValue('line-height', 30, 25, 1)}
  margin-bottom: 10px;
`;

const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  width: 100%;
  border: 2px solid ${vars.$colorMain};
  border-radius: 1000px;
  padding: 5px 20px;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 15px;

  @media (any-hover: hover) {
    & {
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }
    &:hover {
      box-shadow: inset 0 0 10px 0 ${vars.$colorMain};
    }
  }
`;

const Google = styled.img`
  width: 100%;
  max-width: 35px;
`;

const Or = styled.span`
  font-size: 24px;
`;

const Footer = styled.footer`
  background: #0f0f1f;
`;

const FooterBody = styled.div`
  padding: 30px 0;
  ${mixins.adaptivIndent('padding', 30, 15, 0, 0, 1)}
  display: flex;
  justify-content: center;
  width: 100%;
`;

const FooterRights = styled.div`
  color: #9e9e9e;
  display: flex;
  column-gap: 5px;

  & a {
    color: #fff;
    @media (any-hover: hover) {
      & {
        cursor: pointer;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
