import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "../Button";
import * as Yup from "yup";

export const AddListFormTab = ({
  value,
  label,
  onSave,
  onCancel,
}: {
  label: string;
  value: string;
  onSave: () => void;
  onCancel: () => void;
}) => {
  return (
    <Formik
      key={value}
      initialValues={{ [value]: "" }}
      validationSchema={Yup.object({
        [value]: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        onSave();
        console.log(values);
      }}
    >
      <Form className="flex flex-col gap-1">
        <div className="flex gap-1">
          <label htmlFor={value}>{label}</label>
          <Field
            name={value}
            className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
            type="text"
            id={value}
          />
          <ErrorMessage name={value}>
            {(msg) => <div className="font-bold text-red-800">{msg}</div>}
          </ErrorMessage>
        </div>
        <div className="flex gap-1">
          <Button type="submit">Save</Button>
          <Button onClick={() => onCancel()} type="button">
            Cancel
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
