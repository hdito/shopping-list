export const sortByIsUrgent = (
  { isUrgent: isUrgent1 }: { isUrgent: boolean },
  { isUrgent: isUrgent2 }: { isUrgent: boolean }
) => {
  return Number(isUrgent2) - Number(isUrgent1);
};
