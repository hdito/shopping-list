import { signOut } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { Button } from "./Button";
import { useFirestoreUserContext } from "./contexts/FirestoreUserContext";
import { auth } from "./firebase";
import { list } from "./types/list";
import { user } from "./types/user";

export const Header = ({ editMode }: { editMode: list | null }) => {
  const { firestoreUser, loading } = useFirestoreUserContext();
  return (
    <>
      <header
        className={`${
          editMode ? "blur pointer-events-none" : ""
        } px-4 py-2 text-lg shadow-sm border-b-2 z-10 sticky top-0 flex gap-2 items-center justify-end w-full`}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            {(firestoreUser as user).name}
            <Button onClick={() => signOut(auth)}>Sign out</Button>
          </>
        )}
      </header>
      <Outlet />
    </>
  );
};
