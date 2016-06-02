import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import hbs from 'koa-hbs';
import serveStatic from 'koa-static';
import configureRoutes from './configureRoutes';
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
// import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import path from 'path';

const app = koa();

app.use(function* (next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.app.emit('error', err, this);
  }
});

app.use(hbs.middleware({
  viewPath: path.join(__dirname, 'views'),
}));

app.use(bodyParser());

configureRoutes(app);

console.log('NODE_ENV =', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static file serving middleware...');
  app.use(serveStatic(path.join(__dirname, '../client')));
} else {
  console.log('Setting up webpack middleware...');
  const webpackConfig = require('../client/webpack.config.babel').default;
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true }));
  // app.use(webpackHotMiddleware(compiler, { noInfo: true }));
}

const port = process.env.PORT || 5555;
console.log(`Listening on port ${port}...`);
app.listen(port);
