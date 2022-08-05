import { Formik, Field, FieldProps, ErrorMessage } from "formik";
import { object, string } from "yup";
import { Button } from "./Button";
import { Input } from "./Input";

export const AddAdmittedEmail = ({
  admitted,
  onAdd,
}: {
  admitted: string[];
  onAdd: (email: string) => void;
}) => {
  return (
    <Formik
      key="editor"
      initialValues={{ email: "" }}
      validationSchema={object({
        email: string()
          .required("Required")
          .email("Should be a valid email")
          .test("Unique", "Emails need to be unique", (email) => {
            return (
              new Set([...admitted, email]).size === [...admitted, email].length
            );
          }),
      })}
      onSubmit={(values, actions) => {
        onAdd(values.email);
        actions.resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <>
          <label className="justify-self-end" htmlFor="editor-email">
            Editor's email
          </label>
          <div>
            <Field name="email">
              {({ field }: { field: FieldProps }) => (
                <Input id="editor-email" type="email" {...field} />
              )}
            </Field>
            <ErrorMessage name="email">
              {(msg) => <div className="font-bold text-red-800">{msg}</div>}
            </ErrorMessage>
            <Button className="ml-1" onClick={handleSubmit} type="submit">
              Add
            </Button>
          </div>
        </>
      )}
    </Formik>
  );
};
