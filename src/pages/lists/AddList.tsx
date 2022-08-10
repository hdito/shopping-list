import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { MouseEvent, useState } from "react";
import { Button } from "../../components/Button";
import { myFirestore } from "../../firebase";
import { AddListFormTab } from "./AddListFormTab";
import short from "short-uuid";
import { user } from "../../types/user";

export const AddList = ({ user }: { user: user }) => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(true);

  return (
    <div className={`${isOpenAddForm ? "px-0 xs:px-4" : "px-4"} w-full`}>
      <div
        className={`m-auto max-w-sm flex flex-col gap-1 w-full ${
          isOpenAddForm &&
          " border-y-2 xs:border-2 shadow-md xs:rounded-md overflow-hidden"
        }`}
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
                    ? "shadow-[inset_-2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
                    : "bg-white"
                } flex-1 px-2 py-1 whitespace-nowrap`}
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
                    ? "shadow-[inset_2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
                    : "bg-white"
                } flex-1 px-2 py-1 whitespace-nowrap`}
                type="button"
              >
                Add existing list
              </button>
            </div>
            {isCreateNew ? (
              <AddListFormTab
                value="title"
                label="Title"
                onCancel={() => setIsOpenAddForm(false)}
                onSave={async (title) => {
                  const id = short.generate().toString();
                  await setDoc(doc(myFirestore, "lists", id), {
                    title,
                    id,
                    owner: user.email,
                    public: false,
                    editors: [],
                    admitted: [],
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                  });
                  setIsOpenAddForm(false);
                }}
              />
            ) : (
              <AddListFormTab
                label="Project ID"
                value="id"
                onCancel={() => setIsOpenAddForm(false)}
                onSave={async (id) => {
                  updateDoc(doc(myFirestore, "lists", id), {
                    editors: arrayUnion(user.email),
                    updatedAt: serverTimestamp(),
                  });
                  setIsOpenAddForm(false);
                }}
              />
            )}
          </>
        ) : (
          <button
            className="rounded px-2 py-1 bg-black text-white hover:bg-gray-700 hover:shadow-md transition-all duration-100 "
            onClick={() => setIsOpenAddForm(true)}
          >
            Add list
          </button>
        )}
      </div>
    </div>
  );
};
