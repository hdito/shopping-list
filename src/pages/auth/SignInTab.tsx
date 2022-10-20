import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Formik, Form, ErrorMessage } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { Button } from '../../components/Button';
import { CustomInput } from '../../components/CustomInput';
import { PasswordInput } from '../../components/PasswordInput';
import { auth } from '../../firebase';

export const SignInTab = ({ onError }: { onError: (error: Error) => void }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="font-bold">Use your account</h2>
      <Formik
        key="sign-in"
        initialValues={{ email: '', password: '' }}
        validationSchema={object({
          email: string().email('Must be a valid email').required('Required'),
          password: string()
            .min(6, 'Password must be at least 6 characters ')
            .required('Required'),
        })}
        onSubmit={async (values) => {
          try {
            const { user } = await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            if (user.emailVerified) {
              navigate('/lists', { replace: true });
            } else {
              await signOut(auth);
              throw new Error('Email is not verified');
            }
          } catch (error) {
            onError(error as Error);
          }
        }}
      >
        <Form className="flex flex-col gap-2 w-fit">
          <label className="flex flex-col gap-0.5 w-full" htmlFor="email">
            <div className="font-bold">Email</div>
            <ErrorMessage name="email">
              {(msg) => <div className="text-red-600">{msg}</div>}
            </ErrorMessage>
            <CustomInput id="email" name="email" type="email" />
          </label>

          <label className="flex flex-col gap-0.5 w-min" htmlFor="password">
            <div className="font-bold">Password</div>
            <ErrorMessage name="password">
              {(msg) => <div className="text-red-600 basis-full ">{msg}</div>}
            </ErrorMessage>
            <PasswordInput id="password" name="password" />
          </label>

          <Button className="col-span-2" type="submit">
            Sign in
          </Button>
        </Form>
      </Formik>
      <div className="font-bold">Or</div>{' '}
      <Button
        onClick={async () => {
          try {
            await signInWithPopup(auth, new GoogleAuthProvider());
          } catch (error) {
            onError(error as Error);
          }
          navigate('/');
        }}
        type="button"
        className="flex items-center gap-2"
      >
        <FcGoogle />
        Sign in with Google
      </Button>
    </>
  );
};
