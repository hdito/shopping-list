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
import { useFirestoreUserContext } from "./contexts/FirestoreUserContext";
import { list } from "./types/list";
import { myFirestore } from "./firebase";
import { AddList } from "./AddList/AddList";
import { IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import { user } from "./types/user";
import { EditMenu } from "./EditMenu";

export const Lists = ({
  editMode,
  onEditMode,
}: {
  onEditMode: (list: list) => void;
  editMode: list | null;
}) => {
  const [lists, setLists] = useState<list[]>([]);
  const [shared, setShared] = useState<list[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [loadingShared, setLoadingShared] = useState(true);
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
          editMode ? "blur pointer-events-none" : ""
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
                  .sort((list1, list2) => {
                    const secondsDiff =
                      list2.createdAt.seconds - list1.createdAt.seconds;
                    if (secondsDiff !== 0) {
                      return secondsDiff;
                    } else
                      return (
                        list2.createdAt.nanoseconds -
                        list1.createdAt.nanoseconds
                      );
                  })
                  .map((list) => (
                    <div
                      key={list.id}
                      className="h-10 shadow-sm border-2 flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 hover:rounded-md transition-all duration-100"
                    >
                      <h2 className="inline-block mr-auto">{list.title}</h2>
                      {list.public && (
                        <span className="bg-green-600 text-white px-1 py-0.5 rounded">
                          Public
                        </span>
                      )}
                      <button
                        onClick={() => onEditMode(list)}
                        className="text-gray-700 hover:text-black text-2xl"
                      >
                        <IoSettingsOutline title="Settings" />
                      </button>
                      <button
                        onClick={() =>
                          deleteDoc(doc(myFirestore, "lists", list.id))
                        }
                        className="text-gray-700 hover:text-black text-2xl"
                      >
                        <IoTrashOutline title="Delete" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
            {shared.length !== 0 && (
              <div className="w-full pl-2 pr-4 border-l-8 border-black flex flex-col gap-1">
                <h2 className="font-bold">Shared</h2>
                {shared
                  .filter((list) => list.createdAt !== null)
                  .sort((list1, list2) => {
                    const secondsDiff =
                      list2.createdAt.seconds - list1.createdAt.seconds;
                    if (secondsDiff !== 0) {
                      return secondsDiff;
                    } else
                      return (
                        list2.createdAt.nanoseconds -
                        list1.createdAt.nanoseconds
                      );
                  })
                  .map((list) => (
                    <div
                      key={list.id}
                      className="h-10 shadow-sm border-2 flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 hover:rounded-md transition-all duration-100"
                    >
                      <h2 className="inline-block mr-auto">{list.title}</h2>
                      <button
                        onClick={() =>
                          updateDoc(doc(myFirestore, "lists", list.id), {
                            editors: arrayRemove((firestoreUser as user).email),
                            updatedAt: serverTimestamp(),
                          })
                        }
                        className="text-gray-700 hover:text-black text-2xl"
                      >
                        <IoTrashOutline title="Delete" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};
