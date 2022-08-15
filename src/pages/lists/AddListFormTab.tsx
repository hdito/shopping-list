import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";

export const AddListFormTab = ({
  value,
  label,
  onSave,
  onCancel,
}: {
  label: string;
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}) => {
  return (
    <Formik
      key={value}
      initialValues={{ [value]: "" }}
      validationSchema={object({
        [value]: string().required("Required"),
      })}
      onSubmit={(values) => {
        onSave(values[value]);
        console.log(values);
      }}
    >
      {(props) => (
        <Form className="flex flex-col gap-2 p-2">
          <div className="flex gap-1">
            <label htmlFor={`add-list-${value}`}>{label}</label>
            <Field
              name={value}
              className="flex-1 border-b-2 border-slate-300 hover:border-slate-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
              type="text"
              id={`add-list-${value}`}
            />
            <ErrorMessage name={value}>
              {(msg) => <div className="font-bold text-red-800">{msg}</div>}
            </ErrorMessage>
          </div>
          <div className="flex gap-1">
            <button
              disabled={!props.isValid || props.values[value] === ""}
              className="px-2 py-0.5 rounded bg-blue-500 text-white disabled:opacity-50 hover:shadow-sm"
              type="submit"
            >
              Add
            </button>
            <button
              className="px-2 py-0.5 rounded border-slate-300 border-2 bg-slate-50 disabled:opacity-50 hover:shadow-sm"
              onClick={() => onCancel()}
              type="button"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
