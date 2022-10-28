import { ErrorMessage, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { CustomInput } from '../../components/CustomInput';
import { addItem } from './listApi';

export const AddItemForm = ({ listID }: { listID: string }) => {
  return (
    <Formik
      initialValues={{ title: '' }}
      validationSchema={object({ title: string().required('Required') })}
      onSubmit={async ({ title }, actions) => {
        await addItem(listID, title);
        actions.resetForm();
      }}
    >
      <div className="px-2 w-full">
        <Form className="m-auto flex gap-2 flex-col w-fit rounded border-2 border-slate-300 shadow-md px-2 py-2">
          <label className="flex flex-col gap-1" htmlFor="title-input">
            <div className="font-bold">Title</div>
            <ErrorMessage name="title">
              {(msg) => <div className="text-red-600">{msg}</div>}
            </ErrorMessage>
            <CustomInput id="title-input" name="title" type="text" />
          </label>

          <button
            className="rounded bg-slate-700 text-white px-2 py-0.5"
            type="submit"
          >
            Add
          </button>
        </Form>
      </div>
    </Formik>
  );
};