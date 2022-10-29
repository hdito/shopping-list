import { ReactNode } from 'react';

export const WideButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children?: ReactNode;
}) => {
  return (
    <button
      className="rounded px-8 py-1 bg-black text-white hover:bg-gray-700 hover:shadow-md transition-all duration-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
