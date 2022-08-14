import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  IoCopyOutline,
  IoTrashBinOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { list } from "../../types/list";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { object, string } from "yup";
import { compareObjects } from "../../utils/compareObjects";
import { doc, updateDoc } from "firebase/firestore";
import { myFirestore } from "../../firebase";

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
        const newData: { public?: boolean; admitted?: string[] } = {};
        if (values.public) {
          if (!compareObjects(values.admitted, list.admitted))
            newData.admitted = values.admitted;
        }
        if (values.public !== list.public) newData.public = values.public;
        await updateDoc(doc(myFirestore, "lists", list.id), newData);
        onClose();
      }}
    >
      {(outerProps) => (
        <div className="absolute h-full w-full top-0 left-0 z-20 flex justify-center items-center bg-black/80">
          <div className="flex flex-col gap-2 bg-white rounded p-2 max-w-sm">
            <ul className="grid grid-cols-[auto_auto] gap-0.5 items-center list-decimal ">
              <h1 className="font-bold text-xl col-start-2">Manage access</h1>
              <li className="col-start-2">To share your list make it public</li>
              <div className="flex gap-1 col-start-2">
                <Field name="public" type="checkbox" id="public"></Field>
                <label htmlFor="public">Public</label>
              </div>
              <li className="col-start-2 mt-3">
                Send list ID to other persons
              </li>

              <label htmlFor="id">Project ID</label>
              <div className="flex gap-1 items-center">
                <input
                  className="flex-shrink bg-transparent border-y-2 border-t-transparent border-b-slate-500 hover:border-b-slate-700 focus-visible:outline-none focus:border-b-blue-500"
                  value={list.id}
                  id="id"
                  readOnly
                ></input>
                <CopyToClipboard text={list.id}>
                  <button
                    type="button"
                    onClick={(e) => {
                      (e.currentTarget.lastChild as HTMLElement).textContent =
                        "Copied!";
                    }}
                    className="flex gap-1 items-center border-2 border-slate-500 text-slate-800 rounded px-1"
                  >
                    <IoCopyOutline />
                    <span>Copy ID</span>
                  </button>
                </CopyToClipboard>
              </div>
              <li className="col-start-2 mt-3">Add their email to your list</li>

              <Formik
                initialValues={{ email: "" }}
                validationSchema={object({
                  email: string()
                    .required("Required")
                    .email("Must be a valid email")
                    .test(
                      "Unique",
                      "Values need to be unique",
                      (email) =>
                        new Set([...outerProps.values.admitted, email]).size ===
                        [...outerProps.values.admitted, email].length
                    )
                    .test(
                      "Owner",
                      "Can't add your own email",
                      (value) => value !== list.owner
                    ),
                })}
                onSubmit={(values, actions) => {
                  outerProps.setFieldValue("admitted", [
                    ...outerProps.values.admitted,
                    values.email,
                  ]);
                  actions.resetForm();
                }}
              >
                {(innerProps) => (
                  <>
                    <label className="justify-self-end" htmlFor="email">
                      Email
                    </label>
                    <div className="flex gap-1">
                      <Field
                        className="bg-transparent border-y-2 border-t-transparent border-b-slate-500 hover:border-b-slate-700 focus-visible:outline-none focus:border-b-blue-500"
                        id="email"
                        name="email"
                        type="email"
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className="font-bold text-red-800">{msg}</div>
                        )}
                      </ErrorMessage>
                      <button
                        onClick={innerProps.submitForm}
                        disabled={!innerProps.isValid}
                        className="rounded px-2 py-0.5 bg-slate-700 text-white disabled:opacity-50"
                        type="submit"
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </Formik>
            </ul>
            {outerProps.values.admitted.map((item) => (
              <div
                key={item}
                className="flex justify-between rounded pl-2 pr-1 py-0.5 border-2 border-slate-500"
              >
                <div className="min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {item}
                </div>
                <button
                  className="text-gray-700 hover:text-black text-2xl"
                  onClick={() =>
                    outerProps.setFieldValue(
                      "admitted",
                      outerProps.values.admitted.filter(
                        (filtering) => filtering !== item
                      )
                    )
                  }
                >
                  <IoTrashOutline title="Delete email" />
                </button>
              </div>
            ))}
            <div className="flex gap-1 col-span-2">
              <button
                className="flex-1 px-2 py-0.5 rounded bg-blue-500 hover:shadow-sm shadow-blue-500 text-white disabled:opacity-50"
                disabled={
                  list.public === outerProps.values.public &&
                  compareObjects(list.admitted, outerProps.values.admitted)
                }
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
