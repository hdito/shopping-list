import { useField } from "formik";
import { useEffect } from "react";
import { IoCheckmark, IoWarning } from "react-icons/io5";

export const CustomInput = ({
  id,
  name,
  type,
  className,
  ...props
}: {
  id?: string;
  type: string;
  className?: string;
  name: string;
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="relative flex">
      <input
        {...field}
        {...props}
        type={type}
        id={id}
        className={`flex-1 box-border px-2 pr-5 py-1 border-2 rounded bg-transparent focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500 invalid:border-red-600  ${
          meta.error && meta.touched && "border-red-600"
        } ${!meta.error && meta.touched && "border-green-600"} ${className}`}
      />
      {meta.touched && meta.error && (
        <IoWarning
          className="text-red-800 absolute right-1.5 top-1/2 -translate-y-1/2"
          title="Invalid"
        />
      )}
      {meta.touched && !meta.error && (
        <IoCheckmark
          className="text-green-800 absolute right-1.5 top-1/2 -translate-y-1/2"
          title="Valid"
        />
      )}
    </div>
  );
};
