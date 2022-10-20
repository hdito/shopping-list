import { Timestamp } from 'firebase/firestore';

export interface user {
  uid: string;
  name: string;
  email: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
