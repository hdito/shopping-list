export const sortByIsFinished = (
  { isFinished: isFinished1 }: { isFinished: boolean },
  { isFinished: isFinished2 }: { isFinished: boolean }
) => {
  return Number(isFinished1) - Number(isFinished2);
};
