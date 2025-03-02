import React from 'react';
import { useRotatingText } from '../hooks/useRotatingText';
import { Search } from './Search';
import { Button } from './Button';
import { Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();
  const rotatingWord = useRotatingText(['timely', 'qualitatively', 'quickly', 'affordably']);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#00d4ff,#e500ff,#00d4ff)] animate-gradient-x" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-md"
            style={{
              width: `${Math.random() * 80 + 50}px`,
              height: `${Math.random() * 80 + 50}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `-${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex flex-col items-center justify-center text-white text-center">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm sm:text-lg font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
            Gen Z Workforce Platform
          </span>
          <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 relative">
          Get it done{' '}
          <span className="relative">
            <span className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur-lg opacity-40" />
            <span className="relative">{rotatingWord}</span>
          </span>
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mx-auto mb-8">
          The future of work is here. Join the largest Gen Z workforce platform
          powered by cutting-edge technology.
        </p>

        {/* <Search /> */}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button variant="primary" onClick={() => navigate('/book')}>
            <Zap className="w-5 h-5 mr-2" />
            Use a Service
          </Button>
          <Button variant="secondary">Learn a skill</Button>
        </div>

        {/* Stats Section */}
        <div className="mt-12 w-full max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                1M+
              </div>
              <div className="text-xs sm:text-sm text-white/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                50K+
              </div>
              <div className="text-xs sm:text-sm text-white/70">Services</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                100%
              </div>
              <div className="text-xs sm:text-sm text-white/70">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
