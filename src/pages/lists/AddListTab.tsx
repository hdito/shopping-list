import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { CustomInput } from '../../components/CustomInput';

export const AddListTab = ({
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
      initialValues={{ [value]: '' }}
      validationSchema={object({
        [value]: string().required('Required'),
      })}
      onSubmit={(values, actions) => {
        onSave(values[value]);
        actions.resetForm();
      }}
    >
      {(props) => (
        <Form className="flex flex-col gap-2 p-2">
          <div className="w-full flex flex-col gap-2">
            <label
              className="flex flex-col gap-0.5"
              htmlFor={`add-list-${value}`}
            >
              <div className="font-bold">{label}</div>
              <ErrorMessage name={value}>
                {(msg) => <div className="text-red-600">{msg}</div>}
              </ErrorMessage>
              <CustomInput id={`add-list-${value}`} name={value} type="text" />
            </label>
          </div>
          <div className="w-full flex gap-2">
            <button
              className="flex-1 px-2 py-0.5 rounded bg-blue-500 text-white disabled:opacity-50 hover:shadow-sm"
              type="submit"
            >
              Add
            </button>
            <button
              className="flex-1 px-2 py-0.5 rounded border-slate-300 border-2 bg-slate-50 disabled:opacity-50 hover:shadow-sm"
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
