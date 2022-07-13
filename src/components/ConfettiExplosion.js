import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const ConfettiExplosion = () => {
  useEffect(() => {
    confetti({
      particleCount: 200,
    });
  }, []);

  return <></>;
};
export default ConfettiExplosion;
