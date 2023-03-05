import { Notification } from "../models/notification.model";

import {
    IsNotEmpty,
    IsString,
    IsEmail,
    Length,
    IsNumber,
    Min,
} from "class-validator";

export interface GetNotificationDTO extends Pick<Notification, "id" | "type" | "message" > {}

export interface CreateNotificationDTO extends Pick<Notification, "type" | "message" | "userId" > {}

