import { onSnapshot, doc } from "firebase/firestore";
import { replace } from "formik";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { FirestoreUserProvider } from "./contexts/FirestoreUserContext";
import { EditMenu } from "./EditMenu";
import { myFirestore } from "./firebase";
import { Header } from "./Header";
import { List } from "./List";
import { Lists } from "./Lists";
import { list } from "./types/list";
import { user } from "./types/user";

export const ListsController = () => {
  const [editMode, setEditMode] = useState<list | null>(null);
  const navigate = useNavigate();
  const currentUser = useAuth();
  useEffect(() => {
    if (!currentUser || !currentUser.emailVerified) {
      console.log("In controller");
      navigate("/auth", { replace: true });
    }
  }, []);
  return (
    <FirestoreUserProvider>
      <Routes>
        <Route element={<Header editMode={editMode} />}>
          <Route
            index
            element={
              <>
                <Lists onEditMode={setEditMode} editMode={editMode} />
                {editMode && (
                  <EditMenu list={editMode} onClose={() => setEditMode(null)} />
                )}
              </>
            }
          />
          <Route path=":id" element={<List />} />
        </Route>
      </Routes>
    </FirestoreUserProvider>
  );
};
