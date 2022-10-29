import { myFirestore } from './../../firebase';
import {
  doc,
  updateDoc,
  serverTimestamp,
  deleteField,
  FieldValue,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const toggleFinishItem = (
  isFinished: boolean,
  listId: string,
  itemId: string
) => {
  return updateDoc(doc(myFirestore, 'lists', listId), {
    [`items.${itemId}.isFinished`]: isFinished,
    [`items.${itemId}.updatedAt`]: serverTimestamp(),
  });
};

export const deleteItem = (listId: string, itemId: string) => {
  return updateDoc(doc(myFirestore, 'lists', listId), {
    [`items.${itemId}`]: deleteField(),
  });
};

export const updateItem = (
  listId: string,
  itemId: string,
  newData: {
    title?: string | undefined;
    isUrgent?: boolean | undefined;
    updatedAt: FieldValue;
  }
) => {
  const data: { [key: string]: string | boolean | FieldValue } = {
    [`items.${itemId}.updatedAt`]: serverTimestamp(),
  };
  if (newData.title) data[`items.${itemId}.title`] = newData.title;
  if (newData.isUrgent) data[`items.${itemId}.isUrgent`] = newData.isUrgent;
  return updateDoc(doc(myFirestore, 'lists', listId), { ...data });
};

export const addItem = (listId: string, title: string) => {
  const itemId = nanoid();

  console.log({
    [`items.${itemId}`]: {
      id: itemId,
      title,
      isFinished: false,
      isUrgent: false,
      createdAt: serverTimestamp(),
    },
  });

  return updateDoc(doc(myFirestore, 'lists', listId), {
    [`items.${itemId}`]: {
      id: itemId,
      title,
      isFinished: false,
      isUrgent: false,
      createdAt: serverTimestamp(),
    },
  });
};
