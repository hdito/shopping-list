import { MouseEvent, useState } from "react";
import { AddList } from "./AddList/AddList";
import { Button } from "./Button";
import {
  IoCloseOutline,
  IoSettingsOutline,
  IoTrashOutline,
} from "react-icons/io5";

function App() {
  const [lists, setLists] = useState([
    { title: "List 1", id: "12321", public: true },
    { title: "List 2", id: "1221321", public: true },
    { title: "List 3", id: "1237681", public: false },
  ]);
  const [editMode, setEditMode] = useState(false);
  const handleClose = (e: MouseEvent) => {
    if (!editMode) return;
    if ((e.target as HTMLElement).closest("#edit-menu")) return;
    setEditMode(false);
  };
  return (
    <div onClick={(e) => handleClose(e)} className="relative">
      <header
        className={`${
          editMode && "blur pointer-events-none"
        } px-2 py-2 text-lg shadow-sm z-10 sticky`}
      >
        Lorem, ipsum
      </header>
      <main className={`${editMode && "blur pointer-events-none"} mx-1`}>
        <div className="max-w-prose flex flex-col items-center m-auto">
          <AddList />
          <div className="relative w-full px-2 my-2">
            <div className="absolute w-1 h-full -left-1 bg-black rounded"></div>
            <h2 className="font-bold">My lists</h2>
            {lists.map((list) => (
              <div className="h-10 flex items-center gap-1 my-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 hover:rounded-md transition-all duration-100">
                <h2 className="inline-block mr-auto">{list.title}</h2>
                {list.public && (
                  <span className="bg-green-600 text-white px-1 py-0.5 rounded">
                    Public
                  </span>
                )}
                <button
                  onClick={() => setEditMode(true)}
                  className="text-gray-700 hover:text-black text-2xl"
                >
                  <IoSettingsOutline title="Settings" />
                </button>
                <button className="text-gray-700 hover:text-black text-2xl">
                  {" "}
                  <IoTrashOutline title="Delete" />
                </button>
              </div>
            ))}
          </div>
          <div className="relative px-2 w-full">
            <div className="absolute w-1 h-full -left-1 bg-black rounded"></div>
            <h2 className="font-bold">Shared</h2>
            {lists.map((list) => (
              <div className="h-10 flex items-center gap-1 my-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 hover:rounded-md transition-all duration-100">
                <h2 className="inline-block mr-auto">{list.title}</h2>
                <button className="text-gray-700 hover:text-black text-2xl">
                  <IoTrashOutline title="Delete" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      {editMode && (
        <div
          id="edit-menu"
          className="bg-white p-2 border-2 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h2 className="font-bold">Edit list</h2>
          <label htmlFor="edit-title">Title</label>
          <input type="text" id="edit-title" />
          <button
            onClick={() => setEditMode(false)}
            className="absolute right-1 top-1"
          >
            <IoCloseOutline />
          </button>
          <input type="checkbox" name="" id="public" />
          <label htmlFor="public">Make public</label>
        </div>
      )}
    </div>
  );
}

export default App;
