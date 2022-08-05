import { FieldValue, Timestamp } from "firebase/firestore";

export interface list {
  id: string;
  owner: string;
  title: string;
  editors: string[];
  public: boolean;
  admitted: string[];
  updatedAt: Timestamp;
  createdAt: Timestamp;
}
