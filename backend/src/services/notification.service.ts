import { Notification } from "../models/notification.model";
import { GetNotificationDTO, CreateNotificationDTO } from "../dtos/notification.dto";

import { client } from "../db/config";
import { wss } from "../index";
import { config } from "../config";

import axios from 'axios';
import FormData from 'form-data';

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
            "SELECT name, phone FROM users WHERE iduser = $1",
            [userId]
        );

        const contactsIds = Object.values(contacts.rows).map((contact) => contact.called);

        if (type == 3) {

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

            // Send notification to whatsapp

            const base_url = 'https://whatsapp.toolhero.tech/api/send';

            let data = {                
                type: 'text',
                number: userName.rows[0].phone,
                message: message,
                instance_id: config.whatsappInstanceId,
                access_token: config.whatsappAccessToken
            };

            const url = base_url 
                        +'?type='+data.type
                        +'&number='+data.number.replace('+', '')
                        +'&message='+data.message
                        +'&instance_id='+data.instance_id
                        +'&access_token='+data.access_token;

            let req_config = {
                method: 'post',
                url: url,
                headers: { 
                    'Content-Type': 'application/json'
                },
            };

            axios.request(req_config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log("Whatsapp ERROR");
                    console.log(error);
                });

            // For contacts
            contactsIds.forEach(async (contact) => {
                let contact_data = {
                    number: '',
                    type: 'text',
                    message: message + ' from user ' + userName.rows[0].name+ ' with phone number +' + userName.rows[0].phone,
                    instance_id: config.whatsappInstanceId,
                    access_token: config.whatsappAccessToken
                }
                
                let number = await client.query(
                    "SELECT name, phone FROM users WHERE iduser = $1",
                    [contact]
                );

                contact_data.number = number.rows[0].phone.replace('+', '');
                contact_data.message = 'Hi ' + number.rows[0].name + ',\n' + contact_data.message;
                if (contact_data.number) {
                    
                    const url = base_url
                                +'?type='+contact_data.type
                                +'&number='+contact_data.number
                                +'&message='+contact_data.message
                                +'&instance_id='+contact_data.instance_id
                                +'&access_token='+contact_data.access_token;

                    let req_config = {
                        method: 'post',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    };

                    axios.request(req_config)
                        .then((response) => {
                            console.log("Message sent successfully")
                            console.log(JSON.stringify(contact_data));
                            console.log(JSON.stringify(response.data));
                        })
                        .catch((error) => {
                            console.log("Error sending message")
                            console.log(JSON.stringify(contact_data));
                            console.log(error);
                        });
                }
            });
        }


        return newNotification.rows[0];
    }
}