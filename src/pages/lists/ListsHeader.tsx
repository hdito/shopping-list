import { LoadingSpinner } from '../../components/LoadingSpinner';
import { SignOutButton } from '../../components/SignOutButton';
import { useFirestoreUserContext } from '../../contexts/FirestoreUserContext';
import { user } from '../../types/user';

export const ListsHeader = () => {
  const { firestoreUser, loadingFirestoreUser } = useFirestoreUserContext();

  return (
    <header className="flex gap-2 items-center justify-between px-4 py-2 text-lg shadow-md shadow-slate-300 border-b-2 border-slate-300 z-10 sticky bg-white top-0  w-full overflow-hidden">
      {loadingFirestoreUser ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="ml-auto flex items-center gap-2">
            <div>{(firestoreUser as user).name}</div>
            <SignOutButton />
          </div>
        </>
      )}
    </header>
  );
};
