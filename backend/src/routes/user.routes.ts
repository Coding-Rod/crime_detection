import express from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import { getUserSchema, createUserSchema, updateUserSchema, deleteUserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

const router = express.Router();
const userService = new UserService();

router.get('/',
  async (req, res) => {
    const user = await userService.getUsers();
    res.status(200).send(user);
  }
);

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const user = await userService.getUser(parseInt(req.params.id));
    res.status(200).send(user);
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const user = await userService.updateUser(parseInt(req.params.id), req.body);
    res.status(200).send(user);
  }
);

router.delete('/:id',
  validatorHandler(deleteUserSchema, 'params'),
  async (req, res) => {
    const user = await userService.deleteUser(parseInt(req.params.id));
    res.status(200).send(user);
  }
);



export default router;
