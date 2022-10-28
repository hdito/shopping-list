import { useState } from 'react';
import { useFirestoreUserContext } from '../../contexts/FirestoreUserContext';
import { user } from '../../types/user';
import { AddListTab } from './AddListTab';
import { addListAsEditor, addListAsOwner } from './listsApi';

export const AddListForm = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(true);
  const firestoreUserContext = useFirestoreUserContext();
  const firestoreUser = firestoreUserContext.firestoreUser as user;

  return (
    <div className={`${isOpenAddForm ? 'px-0 xs:px-4' : 'px-4'} w-full`}>
      <div
        className={`${
          isOpenAddForm &&
          ' border-y-2 xs:border-2 border-slate-300 shadow-md xs:rounded-md overflow-hidden'
        } m-auto flex flex-col gap-1 w-fit`}
      >
        {isOpenAddForm ? (
          <>
            <div className="flex">
              <button
                onClick={() => {
                  setIsCreateNew(true);
                }}
                className={`${
                  !isCreateNew
                    ? 'shadow-[inset_-2px_-1px_4px_rgb(0,0,0,0.1)] bg-slate-50'
                    : 'bg-transparent'
                } px-4 py-1 whitespace-nowrap`}
                type="button"
              >
                Create new
              </button>
              <button
                onClick={() => {
                  setIsCreateNew(false);
                }}
                className={`${
                  isCreateNew
                    ? 'shadow-[inset_2px_-1px_4px_rgb(0,0,0,0.1)] bg-slate-50'
                    : 'bg-transparent'
                } px-4 py-1 whitespace-nowrap text-start`}
                type="button"
              >
                Add existing list
              </button>
            </div>
            {isCreateNew ? (
              <AddListTab
                value="title"
                label="Title"
                onCancel={() => setIsOpenAddForm(false)}
                onSave={async (title) => {
                  try {
                    await addListAsOwner(title, firestoreUser.email);
                    setIsOpenAddForm(false);
                  } catch (addListError) {
                    alert(addListError);
                  }
                }}
              />
            ) : (
              <AddListTab
                label="Project ID"
                value="id"
                onCancel={() => setIsOpenAddForm(false)}
                onSave={async (id) => {
                  try {
                    setIsOpenAddForm(false);
                    await addListAsEditor(id, firestoreUser.email);
                  } catch (error) {
                    alert(error);
                  }
                }}
              />
            )}
          </>
        ) : (
          <button
            className="rounded px-8 py-1 bg-black text-white hover:bg-gray-700 hover:shadow-md transition-all duration-100 "
            onClick={() => setIsOpenAddForm(true)}
          >
            Add list
          </button>
        )}
      </div>
    </div>
  );
};
