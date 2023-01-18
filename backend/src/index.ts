import express from 'express';
import routerApi from './routes/';
import cors from 'cors';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

// Add the router to the app
routerApi(app);

// Add the cors middleware
app.use(cors());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});