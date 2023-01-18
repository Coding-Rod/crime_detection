import express from 'express';
import routerApi from './routes/';
import cors from 'cors';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

// Add the router to the app
routerApi(app);

// Add the cors middleware
app.use(cors());

app.listen(port, () => {
    console.log('Server listening on port', port);
});