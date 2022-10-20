import { ErrorMessage, Field, Formik } from 'formik';
import { IoCopyOutline, IoTrashOutline } from 'react-icons/io5';
import { list } from '../../types/list';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { object, string } from 'yup';
import {
  deleteField,
  doc,
  FieldValue,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { myFirestore } from '../../firebase';
import { CustomInput } from '../../components/CustomInput';

export const ManageAccessMenu = ({
  isManageAccess,
  onClose,
}: {
  isManageAccess: list;
  onClose: () => void;
}) => {
  const list = isManageAccess;
  return (
    <Formik
      initialValues={{ public: list.public, admitted: list.admitted }}
      onSubmit={async (values) => {
        if (
          values.admitted !== list.admitted ||
          values.public !== list.public
        ) {
          try {
            const newData: {
              public?: boolean;
              admitted?: string | FieldValue;
              updatedAt: FieldValue;
            } = { updatedAt: serverTimestamp() };
            if (!(values.admitted === list.admitted)) {
              if (!values.admitted) {
                newData.admitted = deleteField();
              } else {
                newData.admitted = values.admitted;
              }
            }
            if (values.public !== list.public) newData.public = values.public;
            updateDoc(doc(myFirestore, 'lists', list.id), newData);
          } catch (manageAccesError) {
            console.log(manageAccesError);
          }
        }
        onClose();
      }}
    >
      {(outerProps) => (
        <div className="absolute h-full w-full top-0 left-0 z-20 flex justify-center items-center bg-black/80">
          <div className="flex flex-col gap-2 bg-white rounded p-2 max-w-sm w-fit">
            <ul className="flex flex-col gap-2 px-8 list-decimal ">
              <h1 className="font-bold text-xl col-start-2">Manage access</h1>
              <li className="col-start-2">To share your list make it public</li>
              <div className="flex gap-1 col-start-2">
                <Field name="public" type="checkbox" id="public"></Field>
                <label htmlFor="public">Public</label>
              </div>
              <li className="col-start-2 mt-3">Send list ID to other person</li>

              <label className="flex flex-col gap-0.5">
                <div className="font-bold">Project ID</div>

                <input
                  className="box-border px-2 py-1 border-2 rounded bg-transparent focus-visible:outline-none"
                  value={list.id}
                  id="id"
                  readOnly
                ></input>
                <CopyToClipboard text={list.id}>
                  <button
                    type="button"
                    onClick={(e) => {
                      (e.currentTarget.lastChild as HTMLElement).textContent =
                        'Copied!';
                    }}
                    className="self-start flex gap-1 items-center border-2 border-slate-500 text-slate-800 rounded px-1"
                  >
                    <IoCopyOutline />
                    <span>Copy ID</span>
                  </button>
                </CopyToClipboard>
              </label>
              <li className="col-start-2 mt-3">
                Add person email to to your list
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
                      className="flex flex-col gap-0.5 w-fit"
                      htmlFor="email"
                    >
                      <div className="font-bold">Email</div>
                      <ErrorMessage name="email">
                        {(msg) => <div className="text-red-600">{msg}</div>}
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
              <button
                className="flex-1 px-2 py-0.5 rounded bg-blue-500 hover:shadow-sm shadow-blue-500 text-white disabled:opacity-50"
                onClick={outerProps.submitForm}
              >
                Save
              </button>
              <button
                className="flex-1 px-2 py-0.5 rounded border-slate-500 text-slate-800 border-2 bg-slate-50 hover:shadow-sm shadow-slate-300"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
