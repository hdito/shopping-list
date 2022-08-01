export interface user {
  uid: string;
  name: string;
  email: string;
  lists: { title: string; id: string; public: boolean }[];
  shared: { title: string; id: string; public: boolean }[];
}
