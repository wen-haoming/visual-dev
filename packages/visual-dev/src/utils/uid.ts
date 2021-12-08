export const uid = (end?: number) => {
  return Math.random().toString(36).slice(2, end);
};
