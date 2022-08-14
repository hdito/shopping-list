import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import { myFirestore } from "../firebase";
import { user } from "../types/user";
import { useAuth } from "./AuthContext";

const FirestoreUserContext = createContext<{
  firestoreUser: user | null;
  loading: boolean;
}>({ firestoreUser: null, loading: true });
export const useFirestoreUserContext = () => {
  return useContext(FirestoreUserContext);
};
export const FirestoreUserProvider = () => {
  const [firestoreUser, setFirestoreUser] = useState<user | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribeFirestoreUser = onSnapshot(
      doc(myFirestore, "users", currentUser.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setFirestoreUser(docSnap.data() as user);
          setLoading(false);
        } else {
          setDoc(doc(myFirestore, "users", currentUser.uid), {
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
          });
        }
      }
    );
    return unsubscribeFirestoreUser;
  }, []);
  return (
    <FirestoreUserContext.Provider value={{ firestoreUser, loading }}>
      <Outlet />
    </FirestoreUserContext.Provider>
  );
};
