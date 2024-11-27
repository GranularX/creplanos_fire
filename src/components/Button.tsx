import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center';
  const variants = {
    primary: `bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg 
              hover:shadow-primary/20 active:scale-95`,
    secondary: `bg-white/10 backdrop-blur-md border border-white/20 text-white 
                hover:bg-white/20 hover:border-white/30 active:scale-95`,
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}