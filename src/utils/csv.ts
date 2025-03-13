export const csvToJson = <T>(csv: string): T[] => {
  const lines = csv.trim().split('\n');
  const result: T[] = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj = {} as T;
    const currentLine = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      const key = headers[j] as keyof T;
      obj[key] = currentLine[j] as unknown as T[keyof T];
    }

    result.push(obj);
  }

  return result;
};
