import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981']
  });
}

export function fireFireworksConfetti() {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  const interval: any = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      },
      colors: ['#a855f7', '#ec4899', '#3b82f6', '#fbbf24', '#34d399']
    });
  }, 250);
}
