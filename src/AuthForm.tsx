import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { object, ref, string } from "yup";
import { Button } from "./Button";
import { auth } from "./firebase";

export const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="flex flex-col gap-2 items-center py-2">
      <h1 className="font-bold">To continue please authentificate</h1>
      <div className="sm:shadow-sm sm:rounded border-y-2 sm:border-2 sm:max-w-[40ch] w-full">
        <div className="flex">
          <button
            onClick={() => setIsSignIn(true)}
            className={`${
              !isSignIn &&
              "shadow-[inset_-2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
            } px-2 py-1 flex-1`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`${
              isSignIn &&
              "shadow-[inset_2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
            } px-2 py-1 flex-1`}
          >
            Sign up
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 px-4 py-2">
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
                onSubmit={(values) => console.log(values)}
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
                onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
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
                  email: "",
                  password: "",
                  repeatedPassword: "",
                }}
                validationSchema={object({
                  email: string().required("Required"),
                  password: string().min(6).required("Required"),
                  repeatedPassword: string().oneOf(
                    [ref("password")],
                    "Passwords must match"
                  ),
                })}
                onSubmit={(values) => console.log(values)}
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
                    <ErrorMessage name="password">
                      {(msg) => (
                        <div className="font-bold text-red-800">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <label htmlFor="repeated-password">Repeat password</label>
                  <div className="flex gap-2">
                    <Field
                      className="flex-1 border-b-2 hover:border-gray-500 focus-visible:outline-none focus:border-blue-500 focus-visible:border-blue-500"
                      id="repeated-password"
                      type="password"
                      name="repeatedPassword"
                    ></Field>
                    <ErrorMessage name="repeatedPassword">
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
