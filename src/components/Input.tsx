import { FieldInputProps, FormikBag } from "formik";

export const Input = ({ ...props }) => (
  <input
    className="inline-block border-y-2 max-w-[200px] border-t-transparent hover:border-b-gray-500 focus-visible:outline-none focus:border-b-blue-500 focus-visible:border-b-blue-500"
    {...props}
  />
);
