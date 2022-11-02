import { FirestoreError } from 'firebase/firestore';
import { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { item } from '../../types/item';
import { sortByIsFinished } from '../../utils/sortByIsFinished';
import { sortByIsUrgent } from '../../utils/sortByIsUrgent';
import { sortByTime } from '../../utils/sortByTime';
import { AddItemForm } from './AddItemForm';
import { ItemCard } from './ItemCard';
import { useListContext } from './ListContext';

export const List = () => {
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);
  const [isSettingsBlocked, setIsSettingsBlocked] = useState(false);
  const { list, loadingList, listError: listQueryError } = useListContext();
  const [listError, setListError] = useState<FirestoreError | null>(null);

  let items: item[] = [];
  if (list?.items.data)
    items = Object.keys(list.items.data).map((key) => {
      return list.items.data[key];
    });

  return (
    <>
      {listQueryError ? (
        <div className="text-red-700 font-bold flex-1 flex items-center px-4">
          Failed to load items
        </div>
      ) : (
        <>
          {loadingList || !list ? (
            <LoadingSpinner />
          ) : (
            <>
              <AddItemForm listID={list.id} />
              <div className="flex flex-1 flex-col gap-1 w-full h-full px-2">
                {items.length !== 0 ? (
                  <>
                    {items
                      .sort(sortByTime)
                      .reverse()
                      .sort(sortByIsUrgent)
                      .sort(sortByIsFinished)
                      .map((item) => (
                        <ItemCard
                          itemToEdit={itemToEdit}
                          isSettingsBlocked={isSettingsBlocked}
                          onIsSettingsBlocked={setIsSettingsBlocked}
                          onItemToEdit={setItemToEdit}
                          key={item.id}
                          item={item}
                          listId={list.id}
                          onError={setListError}
                        />
                      ))}
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-gray-500 italic">
                      There are no items in this list yet
                    </div>
                  </div>
                )}
                {listError && (
                  <div className="fixed right-4 bottom-4">
                    <ErrorMessage
                      error={listError}
                      onHide={() => setListError(null)}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
