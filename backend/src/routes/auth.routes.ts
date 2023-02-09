import express from 'express';

import validatorHandler from '../middlewares/validator.handler';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

import { UserService } from '../services/user.service';

const router = express.Router();
const userService = new UserService();

router.post('/register', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', validatorHandler(loginUserSchema, 'body'), async (req, res, next) => {
    try {
        const user = await userService.loginUser(req.body);
        res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

export default router;