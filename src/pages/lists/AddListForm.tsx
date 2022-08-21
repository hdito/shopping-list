import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { myFirestore } from "../../firebase";
import { AddListTab } from "./AddListTab";
import short from "short-uuid";
import { user } from "../../types/user";

export const AddListForm = ({ user }: { user: user }) => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(true);

  return (
    <div className={`${isOpenAddForm ? "px-0 xs:px-4" : "px-4"} w-full`}>
      <div
        className={`${
          isOpenAddForm &&
          " border-y-2 xs:border-2 border-slate-300 shadow-md xs:rounded-md overflow-hidden"
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
                    ? "shadow-[inset_-2px_-1px_4px_rgb(0,0,0,0.1)] bg-slate-50"
                    : "bg-transparent"
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
                    ? "shadow-[inset_2px_-1px_4px_rgb(0,0,0,0.1)] bg-slate-50"
                    : "bg-transparent"
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
                  const id = short.generate().toString();
                  try {
                    await setDoc(doc(myFirestore, "lists", id), {
                      title,
                      id,
                      owner: user.email,
                      public: false,
                      createdAt: serverTimestamp(),
                    });
                    setIsOpenAddForm(false);
                  } catch (addListError) {
                    console.log(addListError);
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
                    updateDoc(doc(myFirestore, "lists", id), {
                      editor: user.email,
                      updatedAt: serverTimestamp(),
                    }).then((doc) => console.log(doc));
                    setIsOpenAddForm(false);
                  } catch (error) {
                    console.log(error);
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
