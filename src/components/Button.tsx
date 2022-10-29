import { ReactNode } from 'react';

export const Button = ({
  children,
  type,
  onClick,
  className,
  role = 'default',
}: {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  className?: string;
  role?: 'action' | 'cancel' | 'default';
}) => {
  const colorClasses = {
    action: 'bg-blue-500 text-white',
    cancel: 'border-slate-400 border-2 bg-white',
    default: 'bg-black text-white',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-2 py-1 rounded hover:shadow-md transition-all duration-100 hover:opacity-80 ${colorClasses[role]} ${className}`}
    >
      {children}
    </button>
  );
};
