import { Timestamp } from 'firebase/firestore';

export const sortByTime = (
  {
    createdAt: createdAt1,
    updatedAt: updatedAt1,
  }: { createdAt?: Timestamp; updatedAt?: Timestamp },
  {
    createdAt: createdAt2,
    updatedAt: updatedAt2,
  }: { createdAt?: Timestamp; updatedAt?: Timestamp }
) => {
  if (updatedAt1) {
    if (updatedAt2) return updatedAt1.toMillis() - updatedAt2.toMillis();
    if (createdAt2) return updatedAt1.toMillis() - createdAt2.toMillis();
    return -1;
  }
  if (updatedAt2) {
    if (createdAt1) return createdAt1.toMillis() - updatedAt2.toMillis();
    return 1;
  }
  if (createdAt1) {
    if (createdAt2) return createdAt1.toMillis() - createdAt2.toMillis();
    return -1;
  }
  if (createdAt2) return 1;
  return 0;
};
