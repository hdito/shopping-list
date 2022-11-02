import {
  deleteDoc,
  deleteField,
  doc,
  FieldValue,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { myFirestore } from './../../firebase';

export const addListAsOwner = (title: string, email: string) => {
  const listId = nanoid(10);
  return setDoc(doc(myFirestore, 'lists', listId), {
    id: listId,
    owner: email,
    items: { data: {}, meta: '' },
    title,
    createdAt: serverTimestamp(),
    public: false,
  });
};

export const addListAsEditor = (listId: string, email: string) => {
  return updateDoc(doc(myFirestore, 'lists', listId), {
    editor: email,
    updatedAt: serverTimestamp(),
  });
};

export const deleteListAsOwner = (listId: string) => {
  return deleteDoc(doc(myFirestore, 'lists', listId));
};

export const deleteListAsEditor = (listId: string) => {
  return updateDoc(doc(myFirestore, 'lists', listId), {
    editor: deleteField(),
    updatedAt: serverTimestamp(),
  });
};

export const updateTitle = (listId: string, title: string) => {
  return updateDoc(doc(myFirestore, 'lists', listId), {
    title,
    updatedAt: serverTimestamp(),
  });
};

export const updateAccessSettings = (
  listId: string,
  newData: {
    public?: boolean;
    admitted?: string | FieldValue;
    editor?: FieldValue;
  }
) => {
  return updateDoc(doc(myFirestore, 'lists', listId), {
    ...newData,
    updatedAt: serverTimestamp(),
  });
};
