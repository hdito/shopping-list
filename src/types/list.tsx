import { Timestamp } from 'firebase/firestore';
import { item } from './item';

export interface list {
  id: string;
  owner: string;
  title: string;
  public: boolean;
  editor?: string;
  admitted?: string;
  items: { data: { [listId: string]: item }; meta: string | null };
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
