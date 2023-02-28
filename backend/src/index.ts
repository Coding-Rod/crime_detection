import express from 'express';
import routerApi from './routes/';
import cors from 'cors';

import {
    logErrors,
    errorHandler,
    boomErrorHandler
} from './middlewares/error.handler';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');

const app = express();
const port = 3000;

// Add Json support
app.use(express.json());

// Add the cors middleware
app.use(cors());

// add passport middleware
require('./utils/auth');

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

// Add the router to the app
routerApi(app);

// Add the JSON parser middleware
app.use(express.json());

// Add the swagger middleware
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server listening on port', port);
});