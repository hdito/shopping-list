import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useHref, useLocation, useMatch } from "react-router-dom";
import { myFirestore } from "../../../firebase";
import { item } from "../../../types/item";
import { list } from "../../../types/list";
import { sortByIsFinished } from "../../../utils/sortByIsFinished";
import { sortByIsUrgent } from "../../../utils/sortByIsUrgent";
import { sortByTime } from "../../../utils/sortByTime";
import { AddItemForm } from "./AddItemForm";
import { ItemCard } from "./ItemCard";

export const List = () => {
  const location = useLocation();
  const listID = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1
  );
  const [items, setItems] = useState<item[]>([]);
  const [list, setList] = useState<list | null>(null);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);
  const [isSettingsBlocked, setIsSettingsBlocked] = useState(false);

  useEffect(() => {
    console.log(
      location.pathname.slice(location.pathname.lastIndexOf("/") + 1)
    );
    const unsubscribeList = onSnapshot(
      doc(myFirestore, "lists", listID),
      (docSnap) => {
        if (docSnap.exists()) setList(docSnap.data() as list);
        setLoadingList(false);
      }
    );
    const unsubscribeItems = onSnapshot(
      query(collection(myFirestore, "lists", listID, "items")),
      (querySnap) => {
        const newItems: item[] = [];
        querySnap.forEach((docSnap) => {
          if (docSnap.exists()) newItems.push(docSnap.data() as item);
        });
        setItems(newItems);
        setLoadingItems(false);
      }
    );
    return () => {
      unsubscribeItems();
      unsubscribeList;
    };
  }, []);
  return (
    <main className="flex-1 max-w-prose flex flex-col items-center gap-2 w-full px-4 mt-2">
      {(!loadingItems || !loadingList) && list ? (
        <>
          <AddItemForm list={list} />
          <div className="flex flex-col gap-1 w-full h-full">
            {items.length !== 0 ? (
              <>
                {items
                  .filter((item) => item.createdAt)
                  .sort(sortByTime)
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
                      listID={listID}
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
    </main>
  );
};
