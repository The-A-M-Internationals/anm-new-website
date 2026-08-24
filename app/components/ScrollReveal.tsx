"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'pop-up' | 'fade-left' | 'fade-right';
  duration?: number;
  delay?: number;
  threshold?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'pop-up',
  duration = 0.8,
  delay = 0,
  threshold = 'top 85%', // Triggers when the top of the element hits 85% of the viewport height
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    let fromVars: gsap.TweenVars = { opacity: 0 };
    
    switch (animation) {
      case 'pop-up':
        fromVars = { opacity: 0, y: 50, scale: 0.9 };
        break;
      case 'fade-up':
        fromVars = { opacity: 0, y: 50 };
        break;
      case 'fade-left':
        fromVars = { opacity: 0, x: -50 };
        break;
      case 'fade-right':
        fromVars = { opacity: 0, x: 50 };
        break;
    }

    gsap.fromTo(
      containerRef.current,
      fromVars,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: threshold,
          toggleActions: 'play none none reverse', // Plays when entering, reverses when scrolling back up
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`will-change-transform opacity-0 ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
