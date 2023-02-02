import express from 'express';
import routerApi from './routes/';
import cors from 'cors';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./assets/swagger.json');

const app = express();
const port = 3000;

// Add the cors middleware
app.use(cors());

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

// Add the router to the app
routerApi(app);

// Add the JSON parser middleware
app.use(express.json());

// Add the swagger middleware
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log('Server listening on port', port);
});