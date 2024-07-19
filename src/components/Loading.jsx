import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

Loading.propTypes = {
  children: propTypes.oneOfType([
    propTypes.element,
    propTypes.string,
    propTypes.number,
  ]),
};

export default function Loading({ children, ...props }) {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const intervalId = setInterval(
      () => setDots(v => (v.length == 3 ? '.' : v + '.')),
      300,
    );

    return () => clearInterval(intervalId);
  }, [dots]);

  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#08d2f6" />
            <stop offset="100%" stopColor="#1b66a9" />
          </linearGradient>
        </defs>
      </svg>
      <Body>
        <CircularProgress
          sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
          {...props}
        />
        {children && (
          <Text>
            {children}
            {dots}
          </Text>
        )}
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  row-gap: 10px;
`;

const Text = styled.span`
  font-size: 25px;
  letter-spacing: 5px;
`;
