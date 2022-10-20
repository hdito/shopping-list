import { useField } from 'formik';
import { useState } from 'react';
import {
  IoCheckmark,
  IoEyeOffOutline,
  IoEyeOutline,
  IoWarning,
} from 'react-icons/io5';

export const PasswordInput = ({
  name,
  id,
  ...props
}: {
  id: string;
  name: string;
}) => {
  const [field, meta] = useField(name);
  const [type, setType] = useState<'password' | 'text'>('password');
  return (
    <div className="relative">
      <input
        {...field}
        {...props}
        type={type}
        id={id}
        className={`px-2 py-1 pr-10 box-border border-2 rounded bg-transparent focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500 invalid:border-red-600  ${
          meta.error && meta.touched && 'border-red-600'
        } ${!meta.error && meta.touched && 'border-green-600'}`}
      />
      {meta.touched && meta.error && (
        <IoWarning
          className="text-red-800 absolute right-6 top-1/2 -translate-y-1/2"
          title="Invalid"
        />
      )}
      {meta.touched && !meta.error && (
        <IoCheckmark
          className="text-green-800 absolute right-6 top-1/2 -translate-y-1/2"
          title="Valid"
        />
      )}
      <button
        type="button"
        onClick={() =>
          setType((prev) => {
            if (prev === 'password') return 'text';
            return 'password';
          })
        }
        className="absolute right-1.5 top-1/2 -translate-y-1/2"
      >
        {type === 'password' ? (
          <IoEyeOutline title="Show" />
        ) : (
          <IoEyeOffOutline title="Hide" />
        )}
      </button>
    </div>
  );
};
