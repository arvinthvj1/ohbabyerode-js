import { useEffect, useRef } from 'react';
import { useSpring, useMotionValue, useTransform, animate } from 'framer-motion';

const CountUp = ({ value, prefix = "" }) => {
  const nodeRef = useRef();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: "easeOut" 
    });

    return controls.stop;
  }, [value, motionValue]);

  useEffect(() => {
    // Sync the display value
    const unsubscribe = rounded.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${latest}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix]);

  return <span ref={nodeRef} />;
};

export default CountUp;
