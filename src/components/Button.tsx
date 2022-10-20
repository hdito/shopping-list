import { ReactNode } from 'react';

export const Button = ({
  children,
  type,
  onClick,
  className,
}: {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        'px-2 py-1 bg-black text-white rounded hover:bg-gray-700 transition-all duration-100 ' +
        className
      }
    >
      {children}
    </button>
  );
};
