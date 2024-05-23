// src/components/Feature.js
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import './css/Feature.css';

const Feature = ({ image, title, description, reverse }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
  });

  return (
    <animated.div
      ref={ref}
      style={animation}
      className={`feature ${reverse ? 'feature-reverse' : ''}`}
    >
      <img src={image} alt={title} className="feature-image" />
      <div className="feature-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </animated.div>
  );
};

export default Feature;
