import { useState } from 'react';
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
  const { list, loadingList } = useListContext();

  let items: item[] = [];
  if (list?.items)
    items = Object.keys(list.items).map((key) => {
      return list.items[key];
    });

  return (
    <>
      {loadingList || !list ? (
        <LoadingSpinner />
      ) : (
        <>
          <AddItemForm listID={list.id} />
          <div className="flex flex-col gap-1 w-full h-full px-2">
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
          </div>
        </>
      )}
    </>
  );
};
