import { IoClose } from "react-icons/io5";

export const ErrorMsg = ({
  onClose,
  error,
}: {
  onClose: () => void;
  error: Error;
}) => {
  return (
    <div className="relative w-full bg-red-800/70 text-white rounded px-6 py-3">
      <button onClick={onClose} className="absolute right-0.5 top-0.5">
        <IoClose title="Close" />
      </button>
      <h1 className="font-bold text-xl">{error.name}</h1>
      <div>{error.message}</div>
    </div>
  );
};
