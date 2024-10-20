import express from "express";
import passport from "passport";

import validatorHandler from "../middlewares/validator.handler";

import { createNotificationSchema } from "../schemas/notification.schema";

import { NotificationService } from "../services/notification.service";
import { getId } from "../utils/db/getId";

const router = express.Router();
const notificationService = new NotificationService();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const id = await getId(req.headers.authorization as string);
            return res.status(200).send(
            await notificationService.getNotifications(
                id, 
                typeof req.query.types === 'string' ? (req.query.types.split(',') as string[]).map(Number) : [1, 2, 3, 4],
                req.query.limit ? parseInt(req.query.limit as string) : 10,
                req.query.offset ? parseInt(req.query.offset as string) : 0
            ));
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validatorHandler(createNotificationSchema, "body"),
    async (req, res, next) => {
        try {
            const id = await getId(req.headers.authorization as string);
            res.status(200).send(await notificationService.createNotification(id, req.body));
        } catch (err) {
            next(err);
        }
    }
);

export default router;