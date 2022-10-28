import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { FirestoreUserProvider } from './contexts/FirestoreUserContext';
import { AuthForm } from './pages/auth/AuthForm';
import { List } from './pages/list/List';
import { ListProvider } from './pages/list/ListContext';
import { ListHeader } from './pages/list/ListHeader';
import { ListsPage } from './pages/lists/ListsPage';
import { PageLayout } from './pages/lists/PageLayout';

function App() {
  const currentUser = useAuth();
  const isUserVerified = currentUser?.emailVerified ? true : false;

  return (
    <div className="h-full flex flex-col items-center gap-2 min-w-[300px]">
      <Routes>
        <Route
          path="/"
          element={
            !isUserVerified ? <Navigate to="/auth" /> : <Navigate to="/lists" />
          }
        />
        <Route
          path="/auth"
          element={
            <>{!isUserVerified ? <AuthForm /> : <Navigate to="/lists" />}</>
          }
        />
        <Route
          path="/lists"
          element={
            <>
              {isUserVerified ? (
                <FirestoreUserProvider />
              ) : (
                <Navigate to="/auth" />
              )}
            </>
          }
        >
          <Route index element={<ListsPage />} />
          <Route
            path=":listId"
            element={
              <ListProvider>
                <ListHeader />
                <PageLayout>
                  <List />
                </PageLayout>
              </ListProvider>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
