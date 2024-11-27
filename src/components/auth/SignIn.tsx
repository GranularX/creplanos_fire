import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, GithubIcon, Chrome } from 'lucide-react';
import { Button } from '../Button';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic
  };

  return (
    <div className="min-h-screen pt-16 bg-[linear-gradient(45deg,#00d4ff,#e500ff,#00d4ff)] animate-gradient-x">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto glass-card p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back!</h2>
            <p className="text-white/60">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/5 text-white/60">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
                <Chrome className="w-5 h-5 text-white" />
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
                <GithubIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-white/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:text-primary transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}