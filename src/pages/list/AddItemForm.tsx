import { FirestoreError } from 'firebase/firestore';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';
import { Button } from '../../components/Button';
import { CustomInput } from '../../components/CustomInput';
import { WideButton } from '../../components/WideButton';
import { FormErrorMessage } from '../lists/FormErrorMessage';
import { addItem } from './listApi';

export const AddItemForm = ({ listID }: { listID: string }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState<FirestoreError | null>(null);
  return (
    <>
      {isFormOpen ? (
        <Formik
          initialValues={{ title: '' }}
          validationSchema={object({ title: string().required('Required') })}
          onSubmit={async ({ title }, actions) => {
            try {
              await addItem(listID, title);
              actions.resetForm();
            } catch (error) {
              setFormError(error as FirestoreError);
            }
          }}
        >
          <div className="w-full">
            <Form className="xs:m-auto flex gap-2 flex-col xs:w-fit xs:rounded border-y-2 xs:border-2 border-slate-300 shadow-md px-4 xs:px-2 py-2">
              {formError && (
                <FormErrorMessage
                  error={formError}
                  onHide={() => setFormError(null)}
                />
              )}
              <label className="flex flex-col gap-1" htmlFor="title-input">
                <div className="font-bold">Title</div>
                <ErrorMessage name="title">
                  {(msg) => <div className="text-red-600">{msg}</div>}
                </ErrorMessage>
                <CustomInput id="title-input" name="title" type="text" />
              </label>
              <div className="flex gap-2">
                <Button role="action" type="submit" className="flex-1">
                  Add
                </Button>
                <Button
                  role="cancel"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </Formik>
      ) : (
        <div className="px-4 w-full flex flex-col xs:w-fit">
          <WideButton onClick={() => setIsFormOpen(true)}>Add item</WideButton>
        </div>
      )}
    </>
  );
};
