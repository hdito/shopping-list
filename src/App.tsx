import { MouseEvent, useEffect, useRef, useState } from "react";
import { AddList } from "./AddList/AddList";
import { Button } from "./Button";
import {
  IoCloseOutline,
  IoSettingsOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthForm } from "./AuthForm";
import { auth, myFirestore } from "./firebase";
import { user } from "./types/user";
import { list } from "./types/list";
import { EditMenu } from "./EditMenu";

function App() {
  const [editMode, setEditMode] = useState<list | null>(null);
  const [user, setUser] = useState<null | user>(null);
  const [lists, setLists] = useState<list[]>([]);
  const [shared, setShared] = useState<list[]>([]);
  const unsubscribeUser = useRef<Unsubscribe | null>(null);
  const unsubscribeLists = useRef<Unsubscribe | null>(null);
  const unsubscribeShared = useRef<Unsubscribe | null>(null);
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribeUser.current = onSnapshot(
          doc(myFirestore, "users", user.uid),
          (docSnap) => {
            if (docSnap.exists()) {
              console.log(docSnap.data());
              setUser(docSnap.data() as user);
            } else {
              setDoc(doc(myFirestore, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
              });
            }
            unsubscribeLists.current = onSnapshot(
              query(
                collection(myFirestore, "lists"),
                where("owner", "==", user.email)
              ),
              (querySnap) => {
                const newLists: list[] = [];
                querySnap.forEach((doc) => newLists.push(doc.data() as list));
                setLists(newLists);
              }
            );
            unsubscribeShared.current = onSnapshot(
              query(
                collection(myFirestore, "lists"),
                where("editors", "array-contains", user.email)
              ),
              (querySnap) => {
                const newLists: list[] = [];
                querySnap.forEach((doc) => newLists.push(doc.data() as list));
                setShared(newLists);
              }
            );
          }
        );
      } else {
        setUser(null);
        if (unsubscribeUser.current) unsubscribeUser.current();
        if (unsubscribeLists.current) unsubscribeLists.current();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="reative h-full flex flex-col items-center">
      {!user ? (
        <AuthForm />
      ) : (
        <>
          <header
            className={`${
              editMode ? "blur pointer-events-none" : ""
            } px-4 py-2 text-lg shadow-sm border-b-2 z-10 sticky top-0 flex gap-2 items-center justify-end w-full`}
          >
            {user.name}
            <Button onClick={() => signOut(auth)}>Sign out</Button>
          </header>
          <main
            className={`${
              editMode ? "blur pointer-events-none" : ""
            } flex-1 max-w-prose flex flex-col items-center gap-2 w-full mt-2`}
          >
            <AddList user={user} />
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
                        onClick={() => setEditMode(list)}
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
                            editors: arrayRemove(user.email),
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
          </main>
          {editMode && (
            <div className="bg-black/25 absolute h-full w-full top-0 left-0 flex justify-center items-center xs:px-2">
              <EditMenu list={editMode} onClose={() => setEditMode(null)} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
