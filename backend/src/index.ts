import express from 'express';
import routerApi from './routes/';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';

import {
    logErrors,
    errorHandler,
    boomErrorHandler
} from './middlewares/error.handler';

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ server });

// Add Json support
app.use(express.json());

// Add the cors middleware
app.use(cors());

// add passport middleware
require('./utils/auth');

app.get('/', (_req, res) => {
    res.redirect('/api/v1/docs');
});

// Add the router to the app
routerApi(app);

// Add the JSON parser middleware
app.use(express.json());

// Add the swagger middleware
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

server.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  // send JSON
  ws.send(JSON.stringify({ message: 'Connection established' }));
});

export { wss };