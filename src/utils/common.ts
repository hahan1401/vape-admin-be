export const splitArray = <T>(largeArray: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < largeArray.length; i += chunkSize) {
    result.push(largeArray.slice(i, i + chunkSize));
  }
  return result;
};
