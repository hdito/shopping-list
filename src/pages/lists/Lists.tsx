import {
  onSnapshot,
  query,
  collection,
  where,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestoreUserContext } from "../../contexts/FirestoreUserContext";
import { list } from "../../types/list";
import { myFirestore } from "../../firebase";
import { AddList } from "./AddList";
import { IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import { user } from "../../types/user";
import { Card } from "./Card";
import { CardWithSettings } from "./CardWithSettings";

const sortByTime = (item1: list, item2: list) => {
  const secondsDiff = item2.createdAt.seconds - item1.createdAt.seconds;
  if (secondsDiff !== 0) {
    return secondsDiff;
  } else return item2.createdAt.nanoseconds - item1.createdAt.nanoseconds;
};

export const Lists = ({
  isManageAccess,
  onManageAccess,
}: {
  isManageAccess: list | null;
  onManageAccess: (list: list | null) => void;
}) => {
  const [lists, setLists] = useState<list[]>([]);
  const [shared, setShared] = useState<list[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [loadingShared, setLoadingShared] = useState(true);
  const [listToEdit, setListToEdit] = useState<list | null>(null);
  const { firestoreUser, loading } = useFirestoreUserContext();
  useEffect(() => {
    console.log({ loading, firestoreUser });
    if (loading || !firestoreUser) return;
    console.log("passed!");
    const unsubscribeLists = onSnapshot(
      query(
        collection(myFirestore, "lists"),
        where("owner", "==", firestoreUser.email)
      ),
      (querySnap) => {
        const newLists: list[] = [];
        querySnap.forEach((doc) => newLists.push(doc.data() as list));
        setLists(newLists);
        setLoadingLists(false);
      }
    );
    const unsubscribeShared = onSnapshot(
      query(
        collection(myFirestore, "lists"),
        where("editors", "array-contains", firestoreUser.email)
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
  }, [loading]);
  return (
    <>
      <main
        className={`${
          isManageAccess && "pointer-events-none"
        } flex-1 max-w-prose flex flex-col items-center gap-2 w-full mt-2`}
      >
        {loadingLists || loadingShared ? (
          "Loading..."
        ) : (
          <>
            <AddList user={firestoreUser as user} />
            {!lists.length && !shared.length ? (
              <div className="text-gray-500 italic flex-1 flex items-center">
                You haven't got any lists yet
              </div>
            ) : (
              <></>
            )}
            {lists.length !== 0 && (
              <div className="w-full pl-2 pr-4 border-l-8 border-black flex flex-col gap-1">
                <h2 className="font-bold">My lists</h2>
                {lists
                  .filter((list) => list.createdAt !== null)
                  .sort((list1, list2) => sortByTime(list1, list2))
                  .map((list) => (
                    <CardWithSettings
                      key={list.id}
                      onSettings={setListToEdit}
                      onManageAccess={onManageAccess}
                      list={list}
                      isEdited={
                        listToEdit
                          ? listToEdit.id === list.id
                            ? true
                            : false
                          : false
                      }
                    />
                  ))}
              </div>
            )}
            {shared.length !== 0 && (
              <div className="w-full pl-2 pr-4 border-l-8 border-black flex flex-col gap-1">
                <h2 className="font-bold">Shared</h2>
                {shared
                  .filter((list) => list.createdAt !== null)
                  .sort((list1, list2) => sortByTime(list1, list2))
                  .map((list) => (
                    <Card
                      key={list.id}
                      list={list}
                      user={firestoreUser as user}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};
