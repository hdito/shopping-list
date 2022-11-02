import { Outlet } from 'react-router-dom';
import { useFirestoreUserContext } from '../contexts/FirestoreUserContext';

export const FirestoreUserErrorBoundary = () => {
  const { firestoreUserError } = useFirestoreUserContext();
  return (
    <>
      {firestoreUserError ? (
        <div className="w-full p-4">
          <h1 className="font-bold text-4xl">
            Error has occured during authentication
          </h1>
          <p>Reload the page and if the problem persists come back later</p>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
