import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Button } from "../../components/Button";
import { ErrorMsg } from "./ErrorMsg";
import { auth } from "../../firebase";
import { Message } from "./Message";

export const AuthForm = () => {
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const navigate = useNavigate();
  return (
    <div className="py-2 w-full">
      <h1 className="font-bold text-center mb-2">
        To continue please authentificate
      </h1>
      <div className="sm:shadow-sm sm:rounded border-y-2 sm:border-2 sm:max-w-[40ch] w-full m-auto">
        <div className="flex">
          <button
            onClick={() => {
              setIsSignIn(true);
            }}
            className={`${
              !isSignIn &&
              "shadow-[inset_-2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
            } px-2 py-1 flex-1`}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setIsSignIn(false);
            }}
            className={`${
              isSignIn &&
              "shadow-[inset_2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
            } px-2 py-1 flex-1`}
          >
            Sign up
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 px-4 py-2">
          {isShowMessage && (
            <Message
              message="Check your inbox to verify email"
              onClose={() => setIsShowMessage(false)}
            />
          )}
          {error && <ErrorMsg error={error} onClose={() => setError(null)} />}
          {isSignIn ? (
            <>
              <div className="font-bold">Use your account</div>
              <Formik
                key="sign-in"
                initialValues={{ email: "", password: "" }}
                validationSchema={object({
                  email: string().required("Required"),
                  password: string().min(6).required("Required"),
                })}
                onSubmit={async (values, actions) => {
                  try {
                    const { user } = await signInWithEmailAndPassword(
                      auth,
                      values.email,
                      values.password
                    );
                    if (user.emailVerified) {
                      navigate("/lists", { replace: true });
                    } else {
                      await signOut(auth);
                      throw new Error("Email isn't verified");
                    }
                  } catch (error) {
                    setError(error as Error);
                  }
                }}
              >
                <Form className="grid grid-cols-[auto_1fr] gap-2">
                  <label className="ml-auto" htmlFor="email">
                    Email
                  </label>
                  <div className="flex gap-2">
                    <Field
                      className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
                      id="email"
                      type="email"
                      name="email"
                    ></Field>
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div className="font-bold text-red-800">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <label className="ml-auto" htmlFor="password">
                    Password
                  </label>
                  <div className="flex gap-2">
                    <Field
                      className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
                      id="password"
                      type="password"
                      name="password"
                    ></Field>
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div className="font-bold text-red-800">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <Button className="col-span-2" type="submit">
                    Sign in
                  </Button>
                </Form>
              </Formik>
              <div className="font-bold">Or</div>{" "}
              <Button
                onClick={async () => {
                  await signInWithPopup(auth, new GoogleAuthProvider());
                  navigate("/");
                }}
                type="submit"
                className="flex items-center gap-2"
              >
                <FcGoogle />
                Sign in with Google
              </Button>
            </>
          ) : (
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
                  const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                  await updateProfile(userCredential.user, {
                    displayName: values.name,
                  });
                  await sendEmailVerification(userCredential.user);
                  setIsShowMessage(true);
                  actions.setSubmitting(false);
                  actions.resetForm();
                }}
              >
                <Form className="grid grid-cols-[auto_1fr] gap-2">
                  <label className="ml-auto" htmlFor="name">
                    Name
                  </label>
                  <div className="flex gap-2">
                    <Field
                      className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
                      id="name"
                      type="name"
                      name="name"
                    ></Field>
                    <ErrorMessage name="name">
                      {(msg) => (
                        <div className="font-bold text-red-800">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <label className="ml-auto" htmlFor="email">
                    Email
                  </label>
                  <div className="flex gap-2">
                    <Field
                      className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
                      id="email"
                      type="email"
                      name="email"
                    ></Field>
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div className="font-bold text-red-800">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <label className="ml-auto" htmlFor="password">
                    Password
                  </label>
                  <div className="flex gap-2">
                    <Field
                      className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
                      id="password"
                      type="password"
                      name="password"
                    ></Field>
                    <ErrorMessage name="password">
                      {(msg) => (
                        <div className="font-bold text-red-800">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <Button className="col-span-2" type="submit">
                    Sign up
                  </Button>
                </Form>
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
