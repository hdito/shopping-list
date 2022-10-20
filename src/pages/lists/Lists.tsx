import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestoreUserContext } from '../../contexts/FirestoreUserContext';
import { list } from '../../types/list';
import { myFirestore } from '../../firebase';
import { AddListForm } from './AddListForm';
import { user } from '../../types/user';
import { Card } from './Card';
import { CardWithSettings } from './CardWithSettings';

export const Lists = ({
  onManageAccess,
}: {
  onManageAccess: (list: list | null) => void;
}) => {
  const [lists, setLists] = useState<list[]>([]);
  const [shared, setShared] = useState<list[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [loadingShared, setLoadingShared] = useState(true);
  const [listToEdit, setListToEdit] = useState<string | null>(null);
  const [isSettingsBlocked, setIsSettingsBlocked] = useState(false);
  const { firestoreUser, loading } = useFirestoreUserContext();
  useEffect(() => {
    if (loading || !firestoreUser) return;
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
        console.log({ listsError });
        setLoadingLists(false);
      }
    );
    const unsubscribeShared = onSnapshot(
      query(
        collection(myFirestore, 'lists'),
        where('editor', '==', firestoreUser.email),
        where('public', '==', true),
        orderBy('createdAt', 'desc')
      ),
      (querySnap) => {
        const newLists: list[] = [];
        querySnap.forEach((doc) => newLists.push(doc.data() as list));
        setShared(newLists);
        setLoadingShared(false);
      }
    );
    return () => {
      unsubscribeLists();
      unsubscribeShared();
    };
  }, [firestoreUser]);
  return (
    <>
      {loadingLists || loadingShared ? (
        'Loading...'
      ) : (
        <>
          <AddListForm user={firestoreUser as user} />
          {!lists.length && !shared.length ? (
            <div className="text-gray-500 italic flex-1 flex items-center px-4">
              You have not got any lists yet
            </div>
          ) : (
            <></>
          )}
          {lists.length !== 0 && (
            <div className="w-full pl-2 pr-4 border-l-8 border-black flex flex-col gap-1">
              <h2 className="font-bold">My lists</h2>
              {lists.map((list) => (
                <CardWithSettings
                  key={list.id}
                  isSettingsBlocked={isSettingsBlocked}
                  onListToEdit={setListToEdit}
                  onIsSettingsBlocked={setIsSettingsBlocked}
                  onManageAccess={onManageAccess}
                  list={list}
                  listToEdit={listToEdit}
                />
              ))}
            </div>
          )}
          {shared.length !== 0 && (
            <div className="w-full pl-2 pr-4 border-l-8 border-black flex flex-col gap-1">
              <h2 className="font-bold">Shared</h2>
              {shared.map((list) => (
                <Card key={list.id} list={list} user={firestoreUser as user} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
