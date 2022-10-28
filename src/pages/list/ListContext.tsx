import { doc, FirestoreError, onSnapshot } from 'firebase/firestore';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { myFirestore } from '../../firebase';
import { list } from '../../types/list';

const ListContext = createContext<{
  list: list | null;
  loadingList: boolean;
  listError: FirestoreError | null;
}>({ list: null, loadingList: true, listError: null });

export const useListContext = () => {
  return useContext(ListContext);
};

export const ListProvider = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const listId = params.listId as string;
  const [list, setList] = useState<list | null>(null);
  const [listError, setListError] = useState<FirestoreError | null>(null);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    const unsubscribeItems = onSnapshot(
      doc(myFirestore, 'lists', listId),
      (docSnap) => {
        if (docSnap.exists()) setList(docSnap.data() as list);
        setLoadingList(false);
      },
      (error) => setListError(error)
    );

    return unsubscribeItems;
  }, []);

  return (
    <ListContext.Provider value={{ list, loadingList, listError }}>
      {children}
    </ListContext.Provider>
  );
};
