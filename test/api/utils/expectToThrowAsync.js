export default async function expectToThrowAsync(fn, ErrorType, message) {
  try {
    await fn();
    fail('Expected function to throw an Error.');
  } catch (error) {
    if (!(error instanceof ErrorType)) {
      fail(`Expected function to throw ${ErrorType.name}, but it threw ${error}.`);
    } else if (message) {
      expect(error.message).toBe(message);
    }
  }
}
