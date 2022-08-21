import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, string } from "yup";
import { Button } from "../../components/Button";
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { auth } from "../../firebase";

export const SignUpTab = ({
  onError,
  onMessage,
}: {
  onError: (error: Error) => void;
  onMessage: (arg: boolean) => void;
}) => {
  return (
    <>
      <div className="font-bold">Create account</div>
      <Formik
        key="sign-up"
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={object({
          name: string().required("Required"),
          email: string().required("Required"),
          password: string()
            .min(6, "Password should be at least 6 characters long")
            .required("Required"),
        })}
        onSubmit={async (values, actions) => {
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            await updateProfile(userCredential.user, {
              displayName: values.name,
            });
            await sendEmailVerification(userCredential.user);
            onMessage(true);
            actions.setSubmitting(false);
            actions.resetForm();
          } catch (error) {
            onError(error as Error);
          }
        }}
      >
        <Form className="flex flex-col gap-2">
          <label className="flex flex-col gap-0.5 w-full" htmlFor="name">
            <div className="font-bold">Name</div>
            <ErrorMessage name="name">
              {(msg) => <div className="text-red-600">{msg}</div>}
            </ErrorMessage>
            <CustomInput id="name" type="text" name="name" />
          </label>
          <label className="flex flex-col gap-0.5 w-full" htmlFor="email">
            <div className="font-bold">Email</div>
            <ErrorMessage name="email">
              {(msg) => <div className="text-red-600">{msg}</div>}
            </ErrorMessage>
            <CustomInput id="email" type="email" name="email" />
          </label>
          <label className="flex flex-col gap-0.5 w-full" htmlFor="password">
            <div className="font-bold">Password</div>
            <ErrorMessage name="password">
              {(msg) => <div className="text-red-600">{msg}</div>}
            </ErrorMessage>
            <PasswordInput id="password" name="password" />
          </label>
          <Button className="col-span-2" type="submit">
            Sign up
          </Button>
        </Form>
      </Formik>
    </>
  );
};
