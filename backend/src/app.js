import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      cors({
        // Enable CORS just for this origin
        origin: 'http://localhost:3000',
      })
    );

    // Parse requests of content-type - application/json
    this.server.use(bodyParser.json());

    // Parse requests of content-type - application/x-www-form-urlencoded
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // Add allow header for all calls
    this.server.use((_, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'authorization, Origin, Content-Type, Accept'
      );
      next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
