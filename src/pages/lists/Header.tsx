import { signOut } from "firebase/auth";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useFirestoreUserContext } from "../../contexts/FirestoreUserContext";
import { auth } from "../../firebase";
import { list } from "../../types/list";
import { user } from "../../types/user";

export const Header = ({ isManageAccess }: { isManageAccess: list | null }) => {
  const { firestoreUser, loading } = useFirestoreUserContext();
  const navigate = useNavigate();
  return (
    <>
      <header
        className={`${
          isManageAccess && "pointer-events-none"
        } px-4 py-2 text-lg shadow-md shadow-slate-300 border-b-2 border-slate-300 z-10 sticky bg-white top-0 flex gap-2 items-center justify-end w-full`}
      >
        {loading ? (
          "Loading..."
        ) : (
          <>
            <Routes>
              <Route
                path=":id"
                element={
                  <Link to="/lists" className="mr-auto hover:underline">
                    Back to lists
                  </Link>
                }
              ></Route>
            </Routes>
            {(firestoreUser as user).name}
            <Button
              onClick={() => {
                signOut(auth);
                navigate("/");
              }}
            >
              Sign out
            </Button>
          </>
        )}
      </header>
      <Outlet />
    </>
  );
};
