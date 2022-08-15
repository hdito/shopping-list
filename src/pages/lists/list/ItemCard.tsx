import {
  deleteDoc,
  doc,
  FieldValue,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { IoPencil, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import { object, string } from "yup";
import { myFirestore } from "../../../firebase";
import { item } from "../../../types/item";

export const ItemCard = ({
  listID,
  item,
  itemToEdit,
  isSettingsBlocked,
  onIsSettingsBlocked,
  onItemToEdit,
}: {
  listID: string;
  itemToEdit: string | null;
  isSettingsBlocked: boolean;
  item: item;
  onItemToEdit: (id: string | null) => void;
  onIsSettingsBlocked: (arg: boolean) => void;
}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  return (
    <Formik
      initialValues={{ title: item.title, isUrgent: item.isUrgent }}
      validationSchema={object({ title: string().required("Required") })}
      onSubmit={async (values, actions) => {
        const newData: {
          title?: string;
          isUrgent?: boolean;
          updatedAt: FieldValue;
        } = { updatedAt: serverTimestamp() };
        if (values.title !== item.title) newData.title = values.title;
        if (values.isUrgent !== item.isUrgent)
          newData.isUrgent = values.isUrgent;
        await updateDoc(doc(myFirestore, "lists", listID, "items", item.id), {
          ...newData,
        });
        actions.resetForm({ values: { ...values } });
        setIsEditTitle(false);
        onIsSettingsBlocked(false);
        onItemToEdit(null);
      }}
    >
      {(props) => (
        <div className="w-full rounded overflow-hidden shadow-sm border-2 border-slate-300 hover:shadow-md">
          <div className="h-10 flex items-center gap-1 justify-between px-2 py-1">
            <div className="flex flex-1 items-center gap-1 min-w-0">
              {isEditTitle ? (
                <>
                  <Field
                    className="min-w-0 bg-transparent border-y-2 border-t-transparent border-b-slate-300 hover:border-b-slate-500 focus-visible:outline-none focus:border-b-blue-500 focus-visible:border-b-blue-500"
                    type="text"
                    name="title"
                  />
                  <ErrorMessage name="title">
                    {(msg) => (
                      <span className="font-bold text-red-800">{msg}</span>
                    )}
                  </ErrorMessage>
                </>
              ) : (
                <>
                  <input
                    checked={item.isFinished}
                    type="checkbox"
                    id={`${item.id}-is-finished`}
                    onChange={(e) =>
                      updateDoc(
                        doc(myFirestore, "lists", listID, "items", item.id),
                        {
                          isFinished: e.currentTarget.checked,
                          updatedAt: serverTimestamp(),
                        }
                      )
                    }
                    className="flex-shrink-0 relative peer box-border rounded appearance-none w-5 h-5 border-2 border-slate-300 checked:before:content-['✓'] before:text-white before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 checked:bg-slate-700 checked:border-none"
                  />
                  <label
                    htmlFor={`${item.id}-is-finished`}
                    className="mr-auto min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis peer-checked:line-through peer-checked:font-bold"
                  >
                    {item.title}
                  </label>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 h-full">
              {item.isUrgent && (
                <div
                  className={`${
                    item.isFinished && "opacity-50"
                  } rounded font-bold bg-orange-600 text-white px-2 h-full flex items-center`}
                >
                  Urgent
                </div>
              )}
              <button
                className="text-gray-700 hover:text-black text-2xl"
                onClick={() => {
                  if (isSettingsBlocked) return;
                  if (itemToEdit === item.id) {
                    onItemToEdit(null);
                    props.resetForm();
                  } else {
                    onItemToEdit(item.id);
                  }
                }}
              >
                <IoSettingsOutline title="Settings" />
              </button>
              <button
                onClick={() =>
                  deleteDoc(doc(myFirestore, "lists", listID, "items", item.id))
                }
                className="text-gray-700 hover:text-black text-2xl"
              >
                <IoTrashOutline title="Delete" />
              </button>
            </div>
          </div>
          {itemToEdit === item.id && (
            <div className="h-10 p-1 pl-2 bg-slate-300 flex gap-2 items-center">
              <div className="text-sm sm:text-base flex gap-1 items-center">
                <Field id="isUrgent" type="checkbox" name="isUrgent" />
                <label className="leading-none" htmlFor="isUrgent">
                  Make urgent
                </label>
              </div>
              <button
                className="text-sm sm:text-base leading-none flex h-full items-center gap-1 rounded bg-slate-700 px-2 text-slate-50 disabled:opacity-50 mr-auto"
                onClick={() => {
                  setIsEditTitle(true);
                  onIsSettingsBlocked(true);
                }}
                disabled={isEditTitle}
              >
                <IoPencil />
                Edit title
              </button>

              <div className="flex gap-1 h-full items-center">
                <button
                  className="text-sm sm:text-base px-2 h-full rounded bg-blue-500 text-white disabled:opacity-50"
                  onClick={() => {
                    props.submitForm();
                  }}
                  disabled={
                    props.values.title === item.title &&
                    props.values.isUrgent === item.isUrgent
                  }
                >
                  Save
                </button>
                <button
                  className="text-sm sm:text-base px-2 h-full rounded border-slate-500 border-2 bg-slate-50 disabled:opacity-50"
                  onClick={() => {
                    setIsEditTitle(false);
                    props.resetForm();
                    onIsSettingsBlocked(false);
                  }}
                  disabled={
                    !(isEditTitle || props.values.isUrgent !== item.isUrgent)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};
