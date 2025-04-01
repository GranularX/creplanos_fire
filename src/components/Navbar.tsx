import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, User, Wallet, Code ,Book} from 'lucide-react'; // Imported Code for API

export function Navbar() {
  const location = useLocation();
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLink = ({ to, icon: Icon, children }: { to: string; icon?: any; children: React.ReactNode }) => (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            Creplanos
          </Link>
          
          {!isAuthPage && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center">
                <NavLink to="/provider-profile" icon={User}>Task Dashboard</NavLink>
{/*                 <NavLink to="/user-profile" icon={User}>User</NavLink> */}
                <NavLink to="/wallet" icon={Wallet}>Wallet</NavLink>
                <NavLink to="/api" icon={Code}>API</NavLink> {/* Updated Icon for API */}
                  <NavLink to="/learn" icon={Book}>LearnsyAI</NavLink> {/* Updated Icon for API */}
                <div className="ml-4 flex items-center gap-3">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Sign Up
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {!isAuthPage && isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            <NavLink to="/provider-profile" icon={User}>Provider</NavLink>
            <NavLink to="/user-profile" icon={User}>User</NavLink>
            <NavLink to="/wallet" icon={Wallet}>Wallet</NavLink>
            <NavLink to="/api" icon={Code}>API</NavLink> {/* Updated Icon for API */}
              <NavLink to="/learn" icon={Book}>Learn</NavLink> {/* Updated Icon for API */}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
