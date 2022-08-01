import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { MouseEvent, useState } from "react";
import { Button } from "../Button";
import { myFirestore } from "../firebase";
import { AddListFormTab } from "./AddListFormTab";
import short from "short-uuid";
import { user } from "../types/user";

export const AddList = ({ user }: { user: user }) => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(true);

  return (
    <div
      className={`m-1 flex flex-col ${
        isOpenAddForm && "border-2 shadow-md rounded-md mt-2 overflow-hidden"
      } gap-1 w-full`}
    >
      {isOpenAddForm ? (
        <>
          <div className="flex">
            <button
              onClick={() => {
                setIsCreateNew(true);
              }}
              className={`${
                !isCreateNew &&
                "shadow-[inset_-2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
              } flex-1 bg-white px-2 py-1`}
              type="button"
            >
              Create new
            </button>
            <button
              onClick={() => {
                setIsCreateNew(false);
              }}
              className={`${
                isCreateNew &&
                "shadow-[inset_2px_-1px_4px_rgb(0,0,0,0.1)] bg-gray-50"
              } flex-1 bg-white px-2 py-1`}
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
                });
                setIsOpenAddForm(false);
              }}
            />
          ) : (
            <AddListFormTab
              label="Project ID"
              value="id"
              onCancel={() => setIsOpenAddForm(false)}
              onSave={() => setIsOpenAddForm(false)}
            />
          )}
        </>
      ) : (
        <Button onClick={() => setIsOpenAddForm(true)}>Add list</Button>
      )}
    </div>
  );
};
