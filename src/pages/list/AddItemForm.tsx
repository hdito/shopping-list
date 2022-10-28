import { ErrorMessage, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { Button } from '../../components/Button';
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
      <div className="w-full">
        <Form className="xs:m-auto flex gap-2 flex-col xs:w-fit xs:rounded border-y-2 xs:border-2 border-slate-300 shadow-md px-4 xs:px-2 py-2">
          <label className="flex flex-col gap-1" htmlFor="title-input">
            <div className="font-bold">Title</div>
            <ErrorMessage name="title">
              {(msg) => <div className="text-red-600">{msg}</div>}
            </ErrorMessage>
            <CustomInput id="title-input" name="title" type="text" />
          </label>

          <Button type="submit">Add</Button>
        </Form>
      </div>
    </Formik>
  );
};
