import {
  updateDoc,
  doc,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { list } from "../../types/list";
import { myFirestore } from "../../firebase";
import { user } from "../../types/user";
import { IoTrashOutline } from "react-icons/io5";

export const Card = ({ list, user }: { list: list; user: user }) => {
  return (
    <div
      key={list.id}
      className="h-10 shadow-sm border-2 flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 hover:rounded-md transition-all duration-100"
    >
      <h2 className="inline-block mr-auto">{list.title}</h2>
      <button
        onClick={() =>
          updateDoc(doc(myFirestore, "lists", list.id), {
            editors: arrayRemove(user.email),
            updatedAt: serverTimestamp(),
          })
        }
        className="text-gray-700 hover:text-black text-2xl"
      >
        <IoTrashOutline title="Delete" />
      </button>
    </div>
  );
};
