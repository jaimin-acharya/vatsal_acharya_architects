import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const CountUp = ({ end, duration = 2, prefix = '', suffix = '' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, end, { duration });
    return controls.stop;
  }, [end, duration]);

  useEffect(() => {
    const unsubscribe = rounded.onChange((latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.span>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
};

export default CountUp; 