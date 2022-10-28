import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { item } from '../../types/item';
import { sortByIsFinished } from '../../utils/sortByIsFinished';
import { sortByIsUrgent } from '../../utils/sortByIsUrgent';
import { AddItemForm } from './AddItemForm';
import { ItemCard } from './ItemCard';
import { useListContext } from './ListContext';

export const List = () => {
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);
  const [isSettingsBlocked, setIsSettingsBlocked] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const { list, loadingList } = useListContext();

  let items: item[] = [];
  if (list?.items)
    items = Object.keys(list.items).map((key) => {
      return list.items[key];
    });

  return (
    <>
      {!loadingList ? (
        <>
          <AddItemForm listID={id} />
          <div className="flex flex-col gap-1 w-full h-full px-2">
            {items.length !== 0 ? (
              <>
                {items
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
                      listID={id}
                    />
                  ))}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-gray-500 italic">
                  There is no items in this list yet
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};
