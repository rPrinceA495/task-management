import path from 'path';
import render from './render';

export async function index(ctx) {
  await render(ctx, path.join(__dirname, '../views/index.html'), {
    configuration: JSON.stringify({
    }),
  });
}
