import { Formik, Field, FieldProps, ErrorMessage } from "formik";
import { object, string } from "yup";
import { Button } from "../../components/Button";
import { CustomInput } from "../../components/CustomInput";
import { Input } from "../../components/Input";

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
          <label className="flex flex-col gap-0.5" htmlFor="editor-email">
            <div className="font-bold">Editor's email</div>
            <ErrorMessage name="email">
              {(msg) => <div className="text-red-600">{msg}</div>}
            </ErrorMessage>
            <CustomInput name="email" type="email" />
          </label>

          <Button className="ml-1" onClick={handleSubmit} type="submit">
            Add
          </Button>
        </>
      )}
    </Formik>
  );
};
