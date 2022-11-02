import {
  doc,
  FirestoreError,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { myFirestore } from '../firebase';
import { user } from '../types/user';
import { useAuth } from './AuthContext';

const FirestoreUserContext = createContext<{
  firestoreUser: user | null;
  loadingFirestoreUser: boolean;
  firestoreUserError: FirestoreError | null;
}>({
  firestoreUser: null,
  loadingFirestoreUser: true,
  firestoreUserError: null,
});

export const useFirestoreUserContext = () => {
  return useContext(FirestoreUserContext);
};

export const FirestoreUserProvider = ({ children }: PropsWithChildren) => {
  const [firestoreUser, setFirestoreUser] = useState<user | null>(null);
  const [firestoreUserError, setFirestoreUserError] =
    useState<FirestoreError | null>(null);
  const [loadingFirestoreUser, setLoadingUser] = useState(true);
  const currentUser = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribeFirestoreUser = onSnapshot(
      doc(myFirestore, 'users', currentUser.uid),
      async (docSnap) => {
        if (docSnap.exists()) {
          setFirestoreUser(docSnap.data() as user);
          setLoadingUser(false);
          if (firestoreUserError) setFirestoreUserError(null);
        } else {
          try {
            await setDoc(doc(myFirestore, 'users', currentUser.uid), {
              uid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
              createdAt: serverTimestamp(),
            });
          } catch (error) {
            setFirestoreUserError(error as FirestoreError);
          }
        }
      },
      (error) => setFirestoreUserError(error)
    );

    return unsubscribeFirestoreUser;
  }, [currentUser]);

  return (
    <FirestoreUserContext.Provider
      value={{ firestoreUser, loadingFirestoreUser, firestoreUserError }}
    >
      {children}
    </FirestoreUserContext.Provider>
  );
};
