export const compareObjects = (item1: string[], item2: string[]) => {
  return JSON.stringify(item1) === JSON.stringify(item2);
};
