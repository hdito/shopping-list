import { useFirestoreUserContext } from './../../contexts/FirestoreUserContext';
import { useState, useEffect } from 'react';
import { list } from '../../types/list';
import {
  collection,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { myFirestore } from '../../firebase';
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
        where('owner', '==', firestoreUser.email),
        orderBy('createdAt', 'desc')
      ),
      (querySnap) => {
        const newLists: list[] = [];
        querySnap.forEach((doc) => newLists.push(doc.data() as list));
        setLists(newLists);
        setLoadingLists(false);
      },
      (listsError) => {
        setListsError(listsError);
      }
    );

    return unsubscribeLists;
  }, [firestoreUser, loadingFirestoreUser]);

  return { lists, loadingLists, listsError };
};
