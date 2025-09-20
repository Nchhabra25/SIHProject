import confetti from 'canvas-confetti';

export const triggerConfetti = (type: 'success' | 'level-up' | 'badge' = 'success') => {
  switch (type) {
    case 'success':
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#34D399', '#6EE7B7']
      });
      break;
      
    case 'level-up':
      // Multiple bursts for level up
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2
          },
          colors: ['#F59E0B', '#D97706', '#FCD34D', '#FBBF24']
        });
        
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2
          },
          colors: ['#F59E0B', '#D97706', '#FCD34D', '#FBBF24']
        });
      }, 250);
      break;
      
    case 'badge':
      // Fireworks for badge unlock
      confetti({
        particleCount: 200,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']
      });
      
      confetti({
        particleCount: 200,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']
      });
      break;
  }
};