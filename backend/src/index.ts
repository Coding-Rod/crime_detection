import express from 'express';
import routerApi from './routes/';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

// Add the router to the app
routerApi(app);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});