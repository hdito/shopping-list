import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myFirestore } from "../../../firebase";
import { item } from "../../../types/item";
import { sortByIsFinished } from "../../../utils/sortByIsFinished";
import { sortByIsUrgent } from "../../../utils/sortByIsUrgent";
import { AddItemForm } from "./AddItemForm";
import { ItemCard } from "./ItemCard";

export const List = () => {
  const [items, setItems] = useState<item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [itemToEdit, setItemToEdit] = useState<string | null>(null);
  const [isSettingsBlocked, setIsSettingsBlocked] = useState(false);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const unsubscribeItems = onSnapshot(
      query(
        collection(myFirestore, "lists", id, "items"),
        orderBy("createdAt", "desc")
      ),
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
    };
  }, []);
  return (
    <>
      {!loadingItems ? (
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
