import { ErrorMessage, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { Button } from '../../components/Button';
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
      {() => (
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
            <Button className="flex-1" type="submit" role="action">
              Add
            </Button>
            <Button
              className="flex-1"
              onClick={() => onCancel()}
              type="button"
              role="cancel"
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
