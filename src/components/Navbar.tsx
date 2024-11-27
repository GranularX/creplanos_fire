import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { Zap } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            Creplanos
          </Link>
          
          {!isAuthPage && (
            <div className="flex items-center gap-4">
              <Link to="/signin">
                <Button variant="secondary">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">
                  <Zap className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}