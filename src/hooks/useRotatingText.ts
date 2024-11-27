import { useState, useEffect } from 'react';

export function useRotatingText(words: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return words[currentIndex];
}