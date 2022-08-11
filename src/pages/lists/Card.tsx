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
import { Link } from "react-router-dom";

export const Card = ({ list, user }: { list: list; user: user }) => {
  return (
    <div className="h-10 rounded border-2 border-slate-300 shadow-sm flex justify-between items-center gap-1 px-2 py-1 hover:shadow-md">
      <Link to={list.id}>{list.title}</Link>
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
