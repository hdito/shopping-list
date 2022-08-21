import { IoClose } from "react-icons/io5";

export const Message = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="relative w-full bg-green-800/70 text-white rounded px-6 py-3">
      <button onClick={onClose} className="absolute right-0.5 top-0.5">
        <IoClose title="Close" />
      </button>
      {message}
    </div>
  );
};
