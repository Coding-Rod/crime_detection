import { Notification } from "../models/notification.model";
import { GetNotificationDTO, CreateNotificationDTO } from "../dtos/notification.dto";

import { client } from "../db/config";
import { wss } from "../index";

import boom from "@hapi/boom";

export class NotificationService {
    credential: string;
    constructor() {}

    async getNotifications(userId: Notification["userId"], types: Notification["type"][], limit: number, offset: number): Promise<GetNotificationDTO[] | string> {
        
        const notifications = await client.query(
            "SELECT DISTINCT no.idnotification id, no.type, no.message, no.created_at, (select uss.name from users uss where no.user_id = uss.iduser) FROM notifications no, contacts co, users us WHERE (no.user_id = us.iduser and us.iduser = $1 and no.type = ANY($2)) OR (no.user_id = ANY( select caller  FROM contacts co where co.called = $1 and no.type = 3 and no.created_at >= co.created_at)) ORDER BY created_at DESC LIMIT $3 OFFSET $4",
            [userId, types, limit, offset]
        );
        if (!notifications.rows[0]) throw boom.notFound("No notifications found");
        return notifications.rows;
    }

    async createNotification(userId: Notification["userId"], notification: CreateNotificationDTO): Promise<GetNotificationDTO | string> {
        const { type, message } = notification;

        if (type < 0 || type > 4) throw boom.badRequest("Invalid notification type");

        const newNotification = await client.query(
            "INSERT INTO notifications (type, message, user_id, created_at) VALUES ($1, $2, $3, $4) RETURNING idnotification id, type, message",
            [type, message, userId, new Date()]
        );

        const contacts = await client.query(
            "SELECT called FROM contacts WHERE caller = $1",
            [userId]
        );

        const userName = await client.query(
            "SELECT name FROM users WHERE iduser = $1",
            [userId]
        );

        const contactsIds = Object.values(contacts.rows).map((contact) => contact.called);

        wss.clients.forEach((client) => {
            client.send(
                JSON.stringify({
                    type: "notification",
                    data: {
                        id: newNotification.rows[0].id,
                        type: newNotification.rows[0].type,
                        message: newNotification.rows[0].message,
                        users: [...contactsIds, userId],
                        owner: userName.rows[0].name,
                    },
                })
            );
        });

        return newNotification.rows[0];
    }
}