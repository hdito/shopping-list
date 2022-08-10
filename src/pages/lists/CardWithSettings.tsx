import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  IoPencil,
  IoPeople,
  IoSettingsOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { list } from "../../types/list";
import { myFirestore } from "../../firebase";
import { useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { object, string } from "yup";
import { Link } from "react-router-dom";
export const CardWithSettings = ({
  list,
  listToEdit,
  isSettingsBlocked,
  onListToEdit,
  onIsSettingsBlocked,
  onManageAccess,
}: {
  list: list;
  listToEdit: string | null;
  isSettingsBlocked: boolean;
  onListToEdit: (id: string | null) => void;
  onIsSettingsBlocked: (arg: boolean) => void;
  onManageAccess: (list: list) => void;
}) => {
  const [isEditTitle, setEditTitle] = useState(false);
  return (
    <Formik
      initialValues={{
        title: list.title,
      }}
      validationSchema={object({ title: string().required("Required") })}
      onSubmit={async (values, actions) => {
        await updateDoc(doc(myFirestore, "lists", list.id), {
          title: values.title,
        });
        setEditTitle(false);
        actions.resetForm();
        onIsSettingsBlocked(false);
      }}
    >
      {(props) => (
        <div className="rounded overflow-hidden shadow-sm border-2 border-slate-300 hover:shadow-md">
          <div
            className={`h-10 flex items-center gap-1 p-1 pl-2 bg-slate-50 transition-all duration-100`}
          >
            {isEditTitle ? (
              <>
                <Field
                  className="bg-transparent border-y-2 border-t-transparent border-b-slate-300 hover:border-b-slate-500 focus-visible:outline-none focus:border-b-blue-500 focus-visible:border-b-blue-500"
                  name="title"
                  type="text"
                />
                <ErrorMessage name="title">
                  {(msg) => (
                    <span className="font-bold text-red-800">{msg}</span>
                  )}
                </ErrorMessage>
              </>
            ) : (
              <Link to={list.id}>{list.title}</Link>
            )}
            {list.public && (
              <span className="bg-green-600 text-white px-1 py-0.5 rounded ml-auto">
                Public
              </span>
            )}
            <button
              className={`${
                !list.public && "ml-auto"
              } text-gray-700 hover:text-black text-2xl`}
              onClick={() => {
                if (isSettingsBlocked) return;
                if (listToEdit === list.id) {
                  onListToEdit(null);
                } else {
                  onListToEdit(list.id);
                }
              }}
            >
              <IoSettingsOutline title="Settings" />
            </button>
            <button
              onClick={() => deleteDoc(doc(myFirestore, "lists", list.id))}
              className="text-gray-700 hover:text-black text-2xl"
            >
              <IoTrashOutline title="Delete" />
            </button>
          </div>
          {listToEdit === list.id && (
            <div className="h-10 p-1 bg-slate-300 flex gap-1">
              <button
                disabled={isEditTitle}
                className="flex items-center gap-1 rounded bg-slate-700 px-2 text-slate-50 disabled:opacity-50"
                onClick={() => {
                  setEditTitle(true);
                  onIsSettingsBlocked(true);
                }}
              >
                <IoPencil />
                Edit title
              </button>
              <button
                disabled={isEditTitle}
                className="flex items-center gap-1 rounded bg-slate-700 px-2 text-slate-50 disabled:opacity-50"
                onClick={() => onManageAccess(list)}
              >
                <IoPeople />
                Manage access
              </button>
              {isEditTitle && (
                <>
                  <button
                    disabled={props.values.title === list.title}
                    onClick={props.submitForm}
                    className="ml-auto px-2 py-0.5 rounded bg-blue-500 text-white disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    className="px-2 py-0.5 rounded border-slate-500 border-2 bg-slate-50"
                    onClick={() => {
                      setEditTitle(false);
                      onIsSettingsBlocked(false);
                      props.resetForm();
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};
