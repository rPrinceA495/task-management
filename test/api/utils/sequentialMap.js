export default async function sequentialMap(array, fn) {
  const result = [];
  for (const value of array) {
    result.push(await fn(value));
  }
  return result;
}
