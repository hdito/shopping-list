import { FieldValue, Timestamp } from "firebase/firestore";

export interface list {
  id: string;
  owner: string;
  title: string;
  public: boolean;
  editor?: string;
  admitted?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
