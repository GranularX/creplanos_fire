import React from 'react';
import { useRotatingText } from '../hooks/useRotatingText';
import { Search } from './Search';
import { Button } from './Button';
import { Sparkles, Zap } from 'lucide-react';

export function Hero() {
  const rotatingWord = useRotatingText(['timely', 'qualitatively', 'quickly', 'affordably']);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#00d4ff,#e500ff,#00d4ff)] animate-gradient-x" />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-md"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `-${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center text-white">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <span className="text-lg font-medium px-4 py-1 rounded-full bg-white/10 backdrop-blur-md">
            Gen Z Workforce Platform
          </span>
          <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6 leading-tight">
          Get it done{' '}
          <span className="relative">
            <span className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur-lg opacity-50" />
            <span className="relative">{rotatingWord}</span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          The future of work is here. Join the largest Gen Z workforce platform 
          powered by cutting-edge technology.
        </p>

        <Search />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="primary">
            <Zap className="w-5 h-5 mr-2" />
            Find a Service
          </Button>
          <Button variant="secondary">Get Started</Button>
        </div>

        {/* Updated stats section with better mobile responsiveness */}
        <div className="mt-16 w-full max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-4 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-lg">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                1M+
              </div>
              <div className="text-xs sm:text-sm text-white/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                50K+
              </div>
              <div className="text-xs sm:text-sm text-white/70">Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
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