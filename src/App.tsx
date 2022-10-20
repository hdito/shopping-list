import { useState } from 'react';
import { AuthForm } from './pages/auth/AuthForm';
import { list } from './types/list';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Lists } from './pages/lists/Lists';
import { Header } from './pages/lists/Header';
import { useAuth } from './contexts/AuthContext';
import { FirestoreUserProvider } from './contexts/FirestoreUserContext';
import { List } from './pages/lists/list/List';
import { PageLayout } from './pages/lists/PageLayout';

function App() {
  const [isManageAccess, setIsManageAccess] = useState<list | null>(null);
  const currentUser = useAuth();
  return (
    <div className="h-full flex flex-col items-center gap-2 min-w-[300px]">
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
        <Route
          path="/auth"
          element={
            <>
              {!(currentUser && currentUser.emailVerified) ? (
                <AuthForm />
              ) : (
                <Navigate to="/lists" />
              )}
            </>
          }
        />
        <Route
          path="/lists"
          element={
            <>
              {currentUser && currentUser.emailVerified ? (
                <FirestoreUserProvider />
              ) : (
                <Navigate to="/auth" />
              )}
            </>
          }
        >
          <Route element={<Header isManageAccess={isManageAccess} />}>
            <Route
              element={
                <PageLayout
                  onManageAccess={setIsManageAccess}
                  isManageAccess={isManageAccess}
                />
              }
            >
              <Route
                index
                element={<Lists onManageAccess={setIsManageAccess} />}
              />
              <Route path=":id" element={<List />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
