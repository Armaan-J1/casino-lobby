import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
};

const styles = {
  primary: 'bg-gradient-to-b from-amber-400 to-amber-600 text-neutral-900 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40',
  secondary: 'bg-neutral-800 text-neutral-200 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600',
  danger: 'bg-red-600 text-white hover:bg-red-500'
};

export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}