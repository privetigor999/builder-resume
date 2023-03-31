export const findIndex = (arr: string[], value: string): string => {
  const findedIndex: number = arr.findIndex((el) => el === value);
  return arr[findedIndex];
};
