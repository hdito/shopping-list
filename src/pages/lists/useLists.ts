import {
  collection,
  FirestoreError,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { myFirestore } from '../../firebase';
import { list } from '../../types/list';
import { useFirestoreUserContext } from './../../contexts/FirestoreUserContext';
export const useLists = () => {
  const [lists, setLists] = useState<list[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const { firestoreUser, loadingFirestoreUser } = useFirestoreUserContext();
  const [listsError, setListsError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (loadingFirestoreUser || !firestoreUser) return;

    const unsubscribeLists = onSnapshot(
      query(
        collection(myFirestore, 'lists'),
        where('owner', '==', firestoreUser.email)
      ),
      (querySnap) => {
        const newLists: list[] = [];
        querySnap.forEach((doc) => newLists.push(doc.data() as list));
        setLists(newLists);
        setLoadingLists(false);
        if (listsError) setListsError(null);
      },
      (listsError) => {
        {
          setListsError(listsError);
          console.log({ listsError });
        }
      }
    );

    return unsubscribeLists;
  }, [firestoreUser, loadingFirestoreUser]);

  return { lists, loadingLists, listsError };
};
