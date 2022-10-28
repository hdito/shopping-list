import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useFirestoreUserContext } from '../../contexts/FirestoreUserContext';
import { auth } from '../../firebase';
import { user } from '../../types/user';

export const ListHeader = () => {
  const { firestoreUser, loadingFirestoreUser } = useFirestoreUserContext();
  const navigate = useNavigate();

  return (
    <header className="flex gap-2 items-center justify-between px-4 py-2 text-lg shadow-md shadow-slate-300 border-b-2 border-slate-300 z-10 sticky bg-white top-0  w-full overflow-hidden">
      {loadingFirestoreUser ? (
        'Loading...'
      ) : (
        <>
          <div className="ml-auto flex items-center gap-1">
            {(firestoreUser as user).name}
            <Button
              onClick={async () => {
                await signOut(auth);
                navigate('/');
              }}
            >
              Sign out
            </Button>
          </div>
        </>
      )}
    </header>
  );
};
