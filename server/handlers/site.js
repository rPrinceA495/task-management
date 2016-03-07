export function* index() {
  yield this.render('main', {
    configuration: JSON.stringify({
    }),
  });
}
