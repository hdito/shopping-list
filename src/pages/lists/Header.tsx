import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "../../components/Button";
import { useFirestoreUserContext } from "../../contexts/FirestoreUserContext";
import { auth, myFirestore } from "../../firebase";
import { list } from "../../types/list";
import { user } from "../../types/user";

export const Header = ({ isManageAccess }: { isManageAccess: list | null }) => {
  const { firestoreUser, loading } = useFirestoreUserContext();
  const [listTitle, setListTitle] = useState<string | null>(null);
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { id?: string; title?: string } | null;

  useEffect(() => {
    if (!id) {
      setListTitle(null);
      return;
    }
    if (state && state?.title) {
      setListTitle(state.title);
      return;
    }
    getDoc(doc(myFirestore, "lists", id))
      .then((doc) => {
        console.log("title loaded");
        if (doc.exists()) setListTitle(doc.data().title);
      })
      .catch((headerError) => console.log(headerError));
  }, [id]);
  const navigate = useNavigate();
  return (
    <>
      <header
        className={`${
          isManageAccess && "pointer-events-none"
        } flex gap-2 items-center justify-between px-4 py-2 text-lg shadow-md shadow-slate-300 border-b-2 border-slate-300 z-10 sticky bg-white top-0  w-full overflow-hidden`}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            {id && (
              <>
                <Link to="/lists">
                  <IoChevronBack className="sm:hidden" title="Back to lists" />
                  <span className="hidden sm:inline hover:underline">
                    Back to lists
                  </span>
                </Link>
                <h1 className="flex-1 min-w-0 text-center font-bold whitespace-nowrap overflow-ellipsis overflow-hidden ">
                  {listTitle}
                </h1>
              </>
            )}
            <div className={`${!id && "ml-auto"} flex items-center gap-1`}>
              {(firestoreUser as user).name}
              <Button
                onClick={async () => {
                  await signOut(auth);
                  navigate("/");
                }}
              >
                Sign out
              </Button>
            </div>
          </>
        )}
      </header>
      <Outlet />
    </>
  );
};
