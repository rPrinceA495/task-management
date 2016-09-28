import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serveStatic from 'koa-static';
import convert from 'koa-convert';
import path from 'path';
import configureRoutes from './configureRoutes';

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(bodyParser());

configureRoutes(app);

console.log('NODE_ENV =', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static file serving middleware...');
  app.use(serveStatic(path.join(__dirname, '../client')));
} else {
  console.log('Setting up webpack middleware...');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('koa-webpack-dev-middleware');
  const webpackConfig = require('../client/webpack.config.babel').default;

  const compiler = webpack(webpackConfig);
  app.use(convert(webpackDevMiddleware(compiler, { noInfo: true })));
}

const port = process.env.PORT || 5555;
console.log(`Listening on port ${port}...`);
app.listen(port);
