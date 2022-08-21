import { FieldInputProps, FieldMetaProps, FormikState } from "formik";
import { useEffect } from "react";

export const Input = ({ className, ...props }: { className?: string }) => {
  return (
    <input
      {...props}
      className={`px-2 py-1 border-2 rounded bg-transparent hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500 invalid:border-red-600  ${
        className && className
      }
      }`}
    />
  );
};
