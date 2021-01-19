const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // server.on('connection', function(socket) {
    //   console.log("A new connection to Next.js server was made by a client.");
    //   // 30 second timeout. Change this as you see fit.
    //   socket.setTimeout(30 * 1000);
    // });

    server.get('/post/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'post' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/page/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'page' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/portfolio/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'portfolio' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:rev/:type/:status/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const { id, rev, type, status, wpnonce } = req.params;
      const queryParams = { id, rev, type, status, wpnonce };
      app.render(req, res, actualPage, queryParams);
    });

    server.post('/api/send', (req, res) => {
      return handle(req, res);
    });

    server.post('/api/sample', (req, res) => {
      return handle(req, res);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) {
        console.log("--------------------");
        console.log(err);
        console.log("--------------------");
        throw err;
      }
      console.log('>>> Ready on http://companyjuice.com:3000/');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
