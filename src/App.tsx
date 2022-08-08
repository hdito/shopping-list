import {
  createContext,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
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
import { EditMenu } from "./EditMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import { Lists } from "./Lists";
import { Header } from "./Header";
import { ListsController } from "./ListsController";
import { useAuth } from "./contexts/AuthContext";

const EditListContext = createContext<{
  editMode: list | null;
  setEditMode: React.Dispatch<React.SetStateAction<list | null>>;
} | null>(null);
export const useEditListContext = () => {
  return useContext(EditListContext);
};

function App() {
  const currentUser = useAuth();
  return (
    <div className="h-full flex flex-col items-center">
      <Routes>
        <Route
          path="/"
          element={
            !currentUser || !currentUser.emailVerified ? (
              <Navigate to="/auth" />
            ) : (
              <Navigate to="/lists" />
            )
          }
        />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/lists/*" element={<ListsController />} />
      </Routes>
    </div>
  );
}

export default App;
