import express from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import { getUserSchema, createUserSchema, updateUserSchema, deleteUserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

const router = express.Router();

router.get('/',
  validatorHandler(getUserSchema, 'body'),
  async (req, res) => {
    const user = await new UserService().getUser(req.params.id);
    res.status(200).send(user);
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const user = await new UserService().createUser(req.body);
    res.status(201).send(user);
  }
);

router.patch('/',
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    const user = await new UserService().updateUser(req.params.id, req.body);
    res.status(200).send(user);
  }
);

router.delete('/',
  validatorHandler(deleteUserSchema, 'body'),
  async (req, res) => {
    const user = await new UserService().deleteUser(req.params.id);
    res.status(200).send(user);
  }
);



export default router;
