import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { SignOutButton } from '../../components/SignOutButton';
import { useFirestoreUserContext } from '../../contexts/FirestoreUserContext';
import { user } from '../../types/user';
import { useListContext } from './ListContext';

export const ListHeader = () => {
  const { firestoreUser, loadingFirestoreUser } = useFirestoreUserContext();
  const { list, loadingList } = useListContext();

  return (
    <header className="flex gap-2 items-center justify-between px-4 py-2 text-lg shadow-md shadow-slate-300 border-b-2 border-slate-300 z-10 sticky bg-white top-0 w-full">
      {loadingFirestoreUser || loadingList ? (
        <LoadingSpinner />
      ) : (
        <>
          <Link className="hover:underline" to="/">
            Lists
          </Link>
          <h1 className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 max-w-[20%] lg:max-w-[50%] overflow-hidden overflow-ellipsis font-bold max-w-1/2 self-center">
            {list?.title}
          </h1>
          <div className="flex items-center gap-2">
            <div className="max-w-[100px] lg:max-w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">
              {(firestoreUser as user).name}
            </div>
            <SignOutButton />
          </div>
        </>
      )}
    </header>
  );
};
