export const Input = ({ ...props }) => (
  <input
    {...props}
    className={`inline-block border-y-2 max-w-[200px] border-t-transparent hover:border-b-gray-500 focus-visible:outline-none bg-transparent focus:border-b-blue-500 focus-visible:border-b-blue-500 ${props?.className}`}
  />
);
