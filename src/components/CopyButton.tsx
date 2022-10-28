import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCheckmark, IoCopyOutline } from 'react-icons/io5';

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (!isCopied) return;
    setTimeout(() => setIsCopied(false), 10000);
  }, [isCopied]);
  return (
    <CopyToClipboard text={text}>
      <button
        type="button"
        onClick={() => setIsCopied(true)}
        className="flex gap-1 items-center border-2 hover:border-slate-500 text-slate-500 hover:text-slate-800 rounded p-1 text-xl transition-all duration-150"
      >
        {!isCopied ? (
          <IoCopyOutline title="Copy list ID" />
        ) : (
          <IoCheckmark title="ID's copied" />
        )}
      </button>
    </CopyToClipboard>
  );
};
