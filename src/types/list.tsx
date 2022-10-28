import { Timestamp } from 'firebase/firestore';
import { item } from './item';

export interface list {
  id: string;
  owner: string;
  title: string;
  public: boolean;
  editor?: string;
  admitted?: string;
  items: { [listId: string]: item };
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
