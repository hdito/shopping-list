import { deleteField, FieldValue } from 'firebase/firestore';
import { ErrorMessage, Field, Formik } from 'formik';
import { useState } from 'react';
import { IoPeople, IoTrashOutline } from 'react-icons/io5';
import { object, string } from 'yup';
import { CustomInput } from '../../components/CustomInput';
import { list } from '../../types/list';
import { CopyButton } from '../../components/CopyButton';
import { updateAccessSettings } from './listsApi';
import { Button } from '../../components/Button';

export const ManageAccessMenu = ({ list }: { list: list }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {!isMenuOpen ? (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-xs sm:text-base leading-none flex items-center gap-1 rounded bg-slate-700 px-2 text-slate-50"
        >
          <IoPeople />
          Manage access
        </button>
      ) : (
        <Formik
          initialValues={{ public: list.public, admitted: list.admitted }}
          onSubmit={async (values) => {
            if (
              values.admitted !== list.admitted ||
              values.public !== list.public
            ) {
              const newData: {
                public?: boolean;
                admitted?: string | FieldValue;
                editor?: FieldValue;
              } = {};
              if (!(values.admitted === list.admitted)) {
                if (!values.admitted) {
                  {
                    newData.admitted = deleteField();
                    if (list.editor) newData.editor = deleteField();
                  }
                } else {
                  newData.admitted = values.admitted;
                }
              }
              if (values.public !== list.public) newData.public = values.public;
              try {
                await updateAccessSettings(list.id, newData);
              } catch (manageAccesError) {
                alert(manageAccesError);
              }
            }
            setIsMenuOpen(false);
          }}
        >
          {(outerProps) => (
            <div className="absolute min-h-screen min-w-full top-0 left-0 z-20 bg-black/80">
              <div className="p-4">
                <div className="flex flex-col gap-2 bg-white rounded p-2 max-w-sm w-fit m-auto">
                  <ul className="flex flex-col gap-2 pl-8 pr-2 list-decimal">
                    <h1 className="font-bold text-xl col-start-2">
                      Manage access
                    </h1>
                    <li className="col-start-2">
                      To share your list make it public
                    </li>
                    <div className="flex gap-1 col-start-2">
                      <Field name="public" type="checkbox" id="public"></Field>
                      <label htmlFor="public">Public</label>
                    </div>
                    <li className="col-start-2 mt-3">
                      Send list ID to the other person
                    </li>

                    <label className="flex flex-col gap-0.5">
                      <div className="font-bold">Project ID</div>
                      <div className="flex gap-1">
                        <input
                          className="box-border px-2 py-1 border-2 rounded bg-transparent focus-visible:outline-none"
                          value={list.id}
                          id="id"
                          readOnly
                        ></input>
                        <CopyButton text={list.id} />
                      </div>
                    </label>
                    <li className="col-start-2 mt-3">
                      Specify person&apos;s email as an editor to your list
                    </li>

                    <Formik
                      initialValues={{ email: '' }}
                      validationSchema={object({
                        email: string()
                          .required('Required')
                          .email('Must be a valid email')
                          .test(
                            'Owner',
                            'Cannot add your own email',
                            (value) => value !== list.owner
                          ),
                      })}
                      onSubmit={(values, actions) => {
                        outerProps.setFieldValue('admitted', values.email);
                        actions.resetForm();
                      }}
                    >
                      {(innerProps) => (
                        <div className="flex flex-col gap-2 w-fit">
                          <label
                            className="flex flex-col gap-0.5"
                            htmlFor="email"
                          >
                            <div className="font-bold">Email</div>
                            <ErrorMessage name="email">
                              {(msg) => (
                                <div className="text-red-600">{msg}</div>
                              )}
                            </ErrorMessage>
                            <CustomInput id="email" name="email" type="email" />
                          </label>
                          <button
                            onClick={innerProps.submitForm}
                            className="rounded px-2 py-0.5 bg-slate-700 text-white disabled:opacity-50"
                            type="submit"
                          >
                            {outerProps.values.admitted ? 'Change' : 'Add'}
                          </button>
                        </div>
                      )}
                    </Formik>
                  </ul>
                  {outerProps.values.admitted && (
                    <div className="flex items-center gap-1">
                      <h2 className="font-bold">Current editor:</h2>
                      <div className="min-w-0 max-w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {outerProps.values.admitted}
                      </div>
                      <button
                        className="ml-auto text-gray-700 hover:text-black text-2xl"
                        onClick={() =>
                          outerProps.setFieldValue('admitted', undefined)
                        }
                      >
                        <IoTrashOutline title="Delete email" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-1 col-span-2">
                    <Button
                      className="flex-1"
                      onClick={outerProps.submitForm}
                      role="action"
                    >
                      Save
                    </Button>
                    <Button
                      className="flex-1"
                      role="cancel"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};
