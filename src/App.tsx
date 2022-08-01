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
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { AuthForm } from "./AuthForm";
import { auth, myFirestore } from "./firebase";
import { user } from "./types/user";
import { list } from "./types/list";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState<null | user>(null);
  const [lists, setLists] = useState<list[]>([]);
  const [shared, setShared] = useState<list[]>([]);
  const handleClose = (e: MouseEvent) => {
    if (!editMode) return;
    if ((e.target as HTMLElement).closest("#edit-menu")) return;
    setEditMode(false);
  };
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
    <div
      onClick={(e) => handleClose(e)}
      className="h-full relative flex flex-col items-center"
    >
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
            } flex-1 max-w-prose flex flex-col items-center w-full`}
          >
            <AddList user={user} />
            {lists.length && shared.length ? (
              <div className="text-gray-500 italic flex-1 flex items-center">
                You haven't got any lists yet
              </div>
            ) : (
              <></>
            )}
            {lists.length ? (
              <div className="relative w-full px-2 my-2">
                <div className="absolute w-1 h-full -left-1 bg-black rounded"></div>
                <h2 className="font-bold">My lists</h2>
                {lists.map((list) => (
                  <div
                    key={list.id}
                    className="h-10 shadow-sm border-2 flex items-center gap-1 my-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 hover:rounded-md transition-all duration-100"
                  >
                    <h2 className="inline-block mr-auto">{list.title}</h2>
                    {list.public && (
                      <span className="bg-green-600 text-white px-1 py-0.5 rounded">
                        Public
                      </span>
                    )}
                    <button
                      onClick={() => setEditMode(true)}
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
            ) : (
              <></>
            )}

            {shared.length ? (
              <div className="relative px-2 w-full">
                <div className="absolute w-1 h-full -left-1 bg-black rounded"></div>
                <h2 className="font-bold">Shared</h2>
                {user.lists.map((list) => (
                  <div className="h-10 flex shadow-sm border-2 items-center gap-1 my-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 hover:rounded-md transition-all duration-100">
                    <h2 className="inline-block mr-auto">{list.title}</h2>
                    <button className="text-gray-700 hover:text-black text-2xl">
                      <IoTrashOutline title="Delete" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </main>
          {editMode && (
            <div
              id="edit-menu"
              className="bg-white p-2 border-2 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <h2 className="font-bold">Edit list</h2>
              <label htmlFor="edit-title">Title</label>
              <input type="text" id="edit-title" />
              <button
                onClick={() => setEditMode(false)}
                className="absolute right-1 top-1"
              >
                <IoCloseOutline />
              </button>
              <input type="checkbox" name="" id="public" />
              <label htmlFor="public">Make public</label>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
