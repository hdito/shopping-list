import { useState } from 'react';
import { sortByTime } from '../../utils/sortByTime';
import { AddListForm } from './AddListForm';
import { Card } from './Card';
import { CardWithSettings } from './CardWithSettings';
import { useLists } from './useLists';
import { useSharedLists } from './useSharedLists';

export const Lists = () => {
  const [listToEdit, setListToEdit] = useState<string | null>(null);
  const [isSettingsBlocked, setIsSettingsBlocked] = useState(false);
  const { lists, loadingLists } = useLists();
  const { sharedLists, loadingSharedLists } = useSharedLists();

  return (
    <>
      {loadingLists || loadingSharedLists ? (
        'Loading...'
      ) : (
        <>
          <AddListForm />
          {!lists.length && !sharedLists.length ? (
            <div className="text-gray-500 italic flex-1 flex items-center px-4">
              You have not got any lists yet
            </div>
          ) : (
            <></>
          )}
          {lists.length !== 0 && (
            <div className="w-full pl-2 pr-4 border-l-8 border-black flex flex-col gap-1">
              <h2 className="font-bold">My lists</h2>
              {lists
                .sort(sortByTime)
                .reverse()
                .map((list) => (
                  <CardWithSettings
                    key={list.id}
                    isSettingsBlocked={isSettingsBlocked}
                    onListToEdit={setListToEdit}
                    onIsSettingsBlocked={setIsSettingsBlocked}
                    list={list}
                    listToEdit={listToEdit}
                  />
                ))}
            </div>
          )}
          {sharedLists.length !== 0 && (
            <div className="w-full pl-2 pr-4 border-l-8 border-black flex flex-col gap-1">
              <h2 className="font-bold">Shared</h2>
              {sharedLists
                .sort(sortByTime)
                .reverse()
                .map((list) => (
                  <Card key={list.id} list={list} />
                ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
