import express from "express";

import validatorHandler from "../middlewares/validator.handler";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

import { UserService } from "../services/user.service";

const router = express.Router();
const userService = new UserService();

const QRCode = require('qrcode');

router.post(
  "/register",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      res.status(201).json(await userService.createUser(req.body));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  validatorHandler(loginUserSchema, "body"),
  async (req, res, next) => {
    try {
      res.status(200).json(await userService.loginUser(req.body));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/qr",
  async (req, res, next) => {
    try {
      const qr = await QRCode.toDataURL(process.env.QR_CODE);
      res.render('index', { qr });
    } catch (error) {
      next(error);
    }
  }
)

export default router;
