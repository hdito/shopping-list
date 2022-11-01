import { FirestoreError } from 'firebase/firestore';
import { IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { list } from '../../types/list';
import { deleteListAsEditor } from './listsApi';

export const Card = ({
  list,
  onError,
}: {
  list: list;
  onError: (error: FirestoreError) => void;
}) => {
  return (
    <div className="h-10 rounded border-2 border-slate-300 shadow-sm flex justify-between items-center gap-1 px-2 py-1 hover:shadow-md">
      <Link
        to={list.id}
        state={{ id: list.id, title: list.title }}
        className="min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis"
      >
        {list.title}
      </Link>
      <button
        onClick={async () => {
          try {
            await deleteListAsEditor(list.id);
          } catch (error) {
            onError(error as FirestoreError);
          }
        }}
        className="text-gray-700 hover:text-black text-2xl"
      >
        <IoTrashOutline title="Delete" />
      </button>
    </div>
  );
};
