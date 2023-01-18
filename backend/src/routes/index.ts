import express from 'express';
import { Router } from 'express-serve-static-core';

import usersRouter from './users.router';

function routerApi(app: { use: (arg0: string, arg1: Router) => void; }) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
}

export default routerApi;
