import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { ErrorMessage, Field, Formik } from 'formik';
import { useState } from 'react';
import { IoPencil, IoSettingsOutline, IoTrashOutline } from 'react-icons/io5';
import { object, string } from 'yup';
import { Button } from '../../components/Button';
import { item } from '../../types/item';
import { deleteItem, toggleFinishItem, updateItem } from './listApi';

export const ItemCard = ({
  listId,
  item,
  itemToEdit,
  isSettingsBlocked,
  onIsSettingsBlocked,
  onItemToEdit,
}: {
  listId: string;
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
      validationSchema={object({ title: string().required('Required') })}
      onSubmit={async (values, actions) => {
        if (values.title !== item.title || values.isUrgent !== item.isUrgent) {
          const newData: {
            title?: string;
            isUrgent?: boolean;
            updatedAt: FieldValue;
          } = { updatedAt: serverTimestamp() };
          if (values.title !== item.title) newData.title = values.title;
          if (values.isUrgent !== item.isUrgent)
            newData.isUrgent = values.isUrgent;
          await updateItem(listId, item.id, newData);
        }
        actions.resetForm({ values: { ...values } });
        setIsEditTitle(false);
        onIsSettingsBlocked(false);
        onItemToEdit(null);
      }}
    >
      {({ resetForm, submitForm }) => (
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
                    onChange={async (e) =>
                      await toggleFinishItem(
                        e.currentTarget.checked,
                        listId,
                        item.id
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
                    item.isFinished && 'opacity-50'
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
                    resetForm();
                  } else {
                    onItemToEdit(item.id);
                  }
                }}
              >
                <IoSettingsOutline title="Settings" />
              </button>
              <button
                onClick={async () => await deleteItem(listId, item.id)}
                className="text-gray-700 hover:text-black text-2xl"
              >
                <IoTrashOutline title="Delete" />
              </button>
            </div>
          </div>
          {itemToEdit === item.id && (
            <div className="h-10 p-1 pl-2 bg-slate-300 flex gap-2 items-center">
              <label className="text-sm sm:text-base flex gap-1 items-center leading-none">
                <Field type="checkbox" name="isUrgent" />
                Make urgent
              </label>
              <button
                className="text-sm sm:text-base leading-none flex h-full items-center gap-1 rounded bg-slate-700 px-2 text-slate-50 disabled:opacity-50 mr-auto"
                onClick={() => {
                  setIsEditTitle(true);
                  onIsSettingsBlocked(true);
                }}
              >
                <IoPencil />
                Edit title
              </button>

              <div className="flex gap-1 h-full items-center">
                <Button
                  className="text-sm sm:text-base h-full"
                  role="action"
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Save
                </Button>
                <Button
                  className="text-sm sm:text-base h-full"
                  role="cancel"
                  onClick={() => {
                    setIsEditTitle(false);
                    resetForm();
                    onIsSettingsBlocked(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};
