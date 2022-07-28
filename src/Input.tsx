export const Input = ({
  id,
  className,
  placeholder,
  type,
  value,
  name,
  onChange,
}: {
  name?: string | undefined;
  className?: string | undefined;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  value?: string | number | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  id?: string | undefined;
}) => {
  return (
    <input
      id={id}
      name={name}
      className={
        "border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500" +
        className
      }
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    ></input>
  );
};
