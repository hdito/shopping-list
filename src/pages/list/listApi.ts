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
    [`items.data.${itemId}.isFinished`]: isFinished,
    [`items.data.${itemId}.updatedAt`]: serverTimestamp(),
    'items.meta': itemId,
    updatedAt: serverTimestamp(),
  });
};

export const deleteItem = (listId: string, itemId: string) => {
  return updateDoc(doc(myFirestore, 'lists', listId), {
    [`items.data.${itemId}`]: deleteField(),
    'items.meta': itemId,
    updatedAt: serverTimestamp(),
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
    [`items.data.${itemId}.updatedAt`]: serverTimestamp(),
  };
  if (newData.title) data[`items.data.${itemId}.title`] = newData.title;
  if (newData.isUrgent)
    data[`items.data.${itemId}.isUrgent`] = newData.isUrgent;
  return updateDoc(doc(myFirestore, 'lists', listId), {
    ...data,
    'items.meta': itemId,
    updatedAt: serverTimestamp(),
  });
};

export const addItem = (listId: string, title: string) => {
  const itemId = nanoid();

  return updateDoc(doc(myFirestore, 'lists', listId), {
    [`items.data.${itemId}`]: {
      id: itemId,
      title,
      isFinished: false,
      isUrgent: false,
      createdAt: serverTimestamp(),
    },
    'items.meta': itemId,
    updatedAt: serverTimestamp(),
  });
};
