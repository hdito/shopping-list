import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FirestoreUserProvider } from "../../contexts/FirestoreUserContext";
import { Header } from "./Header";
import { List } from "./List";
import { Lists } from "./Lists";
import { list } from "../../types/list";
import { ManageAccessMenu } from "./ManageAccessMenu";

export const ListsController = () => {
  const [isManageAccess, setIsManageAccess] = useState<list | null>(null);
  const navigate = useNavigate();
  const currentUser = useAuth();
  useEffect(() => {
    if (!currentUser || !currentUser.emailVerified) {
      console.log("In controller");
      navigate("/auth", { replace: true });
    }
  }, []);
  return (
    <>
      <FirestoreUserProvider>
        <Routes>
          <Route element={<Header isManageAccess={isManageAccess} />}>
            <Route
              index
              element={
                <Lists
                  onManageAccess={setIsManageAccess}
                  isManageAccess={isManageAccess}
                />
              }
            />
            <Route path=":id" element={<List />} />
          </Route>
        </Routes>
      </FirestoreUserProvider>
      {isManageAccess && (
        <ManageAccessMenu
          onClose={() => setIsManageAccess(null)}
          isManageAccess={isManageAccess}
        />
      )}
    </>
  );
};
