import { PropsWithChildren } from 'react';

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="flex-1 max-w-prose flex flex-col items-center gap-2 w-full">
        {children}
      </main>
    </>
  );
};
