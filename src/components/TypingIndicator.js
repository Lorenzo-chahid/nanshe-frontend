import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const TypingIndicator = () => {
  const dots = useSpring({
    loop: { reverse: true },
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.5)' },
    config: { duration: 500 },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          padding: '10px',
          borderRadius: '10px',
          background: '#f8d7da',
          maxWidth: '60%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <animated.span style={dots}>.</animated.span>
        <animated.span style={{ ...dots, animationDelay: '100ms' }}>
          .
        </animated.span>
        <animated.span style={{ ...dots, animationDelay: '200ms' }}>
          .
        </animated.span>
      </div>
    </div>
  );
};

export default TypingIndicator;
