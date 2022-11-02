import {
  collection,
  FirestoreError,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestoreUserContext } from '../../contexts/FirestoreUserContext';
import { myFirestore } from '../../firebase';
import { list } from '../../types/list';

export const useSharedLists = () => {
  const [sharedLists, setSharedlists] = useState<list[]>([]);
  const [loadingSharedLists, setLoadingSharedLists] = useState(true);
  const { firestoreUser, loadingFirestoreUser } = useFirestoreUserContext();
  const [sharedListsError, setSharedListsError] =
    useState<FirestoreError | null>(null);

  useEffect(() => {
    if (loadingFirestoreUser || firestoreUser === null) return;

    const unsubscribeShared = onSnapshot(
      query(
        collection(myFirestore, 'lists'),
        where('editor', '==', firestoreUser.email),
        where('public', '==', true)
      ),
      (querySnap) => {
        const newLists: list[] = [];
        querySnap.forEach((doc) => newLists.push(doc.data() as list));
        setSharedlists(newLists);
        setLoadingSharedLists(false);
      },
      (error) => {
        setSharedListsError(error), console.log('shared', { error });
      }
    );

    return unsubscribeShared;
  }, [loadingFirestoreUser, firestoreUser]);

  return { sharedLists, loadingSharedLists, sharedListsError };
};
