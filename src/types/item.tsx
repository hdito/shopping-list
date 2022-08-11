import { Timestamp } from "firebase/firestore";

export interface item {
  id: string;
  title: string;
  isFinished: boolean;
  isUrgent: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
