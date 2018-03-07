import path from 'path';
import render from './render';

const webpackManifest = process.env.NODE_ENV === 'production' ?
  require('../../client/manifest.json') : // eslint-disable-line import/no-unresolved
  null;

function getBundleName(extension) {
  if (process.env.NODE_ENV === 'production') {
    const filename = Object.values(webpackManifest).find(f =>
      f.startsWith('bundle-') &&
      f.endsWith(`.${extension}`)
    );
    if (!filename) {
      throw new Error(`Cannot find ${extension} bundle in webpack manifest.`);
    }
    return filename;
  }
  return `bundle.${extension}`;
}

export async function index(ctx) {
  await render(ctx, path.join(__dirname, '../views/index.html'), {
    cssBundle: getBundleName('css'),
    jsBundle: getBundleName('js'),
    configuration: JSON.stringify({
    }),
  });
}
