import fs from 'mz/fs';
import _ from 'lodash';

const cache = Object.create(null);

export default async function render(ctx, path, data) {
  let compiled = cache[path];
  if (!compiled) {
    const str = await fs.readFile(path, 'utf8');
    compiled = _.template(str);
    cache[path] = compiled;
  }
  ctx.body = compiled(data);
}
