import { MouseEvent, useState } from "react";
import { Button } from "../Button";
import { AddListFormTab } from "./AddListFormTab";

export const AddList = () => {
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(true);

  return (
    <div className="m-1 flex flex-col gap-1 w-full">
      {isOpenAddForm ? (
        <>
          <div className="flex gap-0.5 bg-gray-300">
            <button
              onClick={() => {
                setIsCreateNew(true);
              }}
              className={`${isCreateNew && "font-semibold"} flex-1 bg-white `}
              type="button"
            >
              Create new
            </button>
            <button
              onClick={() => {
                setIsCreateNew(false);
              }}
              className={`${!isCreateNew && "font-semibold"} flex-1 bg-white`}
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
              onSave={() => setIsOpenAddForm(false)}
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
        <Button className="self-start" onClick={() => setIsOpenAddForm(true)}>
          Add list
        </Button>
      )}
    </div>
  );
};
