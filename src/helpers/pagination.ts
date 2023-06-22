export const getPageCount = (totalNotes: number, limit: number): number => {
  return Math.ceil(totalNotes / limit);
};

export const getPagesArray = (totalPages: number) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};
