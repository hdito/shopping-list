import { Timestamp } from "firebase/firestore";

export const sortByTime = (
  { createdAt: createdAt1 }: { createdAt: Timestamp },
  { createdAt: createdAt2 }: { createdAt: Timestamp }
) => {
  const secondsDiff = createdAt2.seconds - createdAt1.seconds;
  if (secondsDiff !== 0) {
    return secondsDiff;
  } else return createdAt2.nanoseconds - createdAt1.nanoseconds;
};
