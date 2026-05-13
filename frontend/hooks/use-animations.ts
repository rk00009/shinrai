'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * Respect user's motion preference from system settings
 * Returns false if user prefers reduced motion, otherwise returns value
 */
export const useRespectMotion = (enabled: boolean = true): boolean => {
  const prefersReducedMotion = useReducedMotion();
  return enabled && !prefersReducedMotion;
};

/**
 * Hook to manage staggered animation delays
 * Useful for lists and grids
 */
export const useStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

/**
 * Hook to get animation delay based on screen size
 * Desktop animations are faster
 */
export const useResponsiveAnimationDelay = (index: number): number => {
  if (typeof window === 'undefined') return index * 0.1;

  const isMobile = window.innerWidth < 640;
  const delay = isMobile ? index * 0.15 : index * 0.08;
  return delay;
};

/**
 * Hook to create scroll-triggered animations
 * Example: animate when element comes into view
 */
export const useScrollAnimation = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    shouldAnimate: !prefersReducedMotion,
    animationDuration: prefersReducedMotion ? 0 : 0.3,
  };
};

/**
 * Hook for managing bounce/spring animations
 * Used for interactive elements like buttons
 */
export const useBounceAnimation = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    type: prefersReducedMotion ? 'tween' : 'spring',
    stiffness: prefersReducedMotion ? undefined : 260,
    damping: prefersReducedMotion ? undefined : 20,
    duration: prefersReducedMotion ? 0.15 : undefined,
  };
};

/**
 * Hook to manage hover animation states
 * Prevents hover animations on touch devices
 */
export const useHoverAnimation = () => {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  return {
    shouldHover: !isTouch,
    whileHover: isTouch ? {} : { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };
};

/**
 * Custom hook for page transitions
 * Integrates with Next.js router
 */
export const usePageTransition = () => {
  const router = require('next/router').useRouter();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    const handleRouteChange = () => setIsTransitioning(true);
    const handleRouteComplete = () => setIsTransitioning(false);

    router.events?.on('routeChangeStart', handleRouteChange);
    router.events?.on('routeChangeComplete', handleRouteComplete);
    router.events?.on('routeChangeError', handleRouteComplete);

    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
      router.events?.off('routeChangeComplete', handleRouteComplete);
      router.events?.off('routeChangeError', handleRouteComplete);
    };
  }, [router]);

  return { isTransitioning };
};

/**
 * Hook to manage loading skeleton animations
 */
export const useSkeletonAnimation = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    animate: prefersReducedMotion ? false : 'shimmer',
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  };
};

import React from 'react';
