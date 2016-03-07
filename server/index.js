import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import hbs from 'koa-hbs';
import serveStatic from 'koa-static';
import configureRoutes from './configureRoutes';
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpackConfig from '../client/webpack.config';
import path from 'path';

async function run() {
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

  if (process.env.NODE_ENV === 'production') {
    console.log('Setting static file serving middleware...');
    app.use(serveStatic(path.join(__dirname, '../static')));
  } else {
    console.log('Setting up webpack middleware...');
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, { noInfo: true }));
    app.use(webpackHotMiddleware(compiler, { noInfo: true }));
  }

  const port = process.env.PORT || 5555;
  console.log(`Listening on port ${port}...`);
  app.listen(port);
}

run();
