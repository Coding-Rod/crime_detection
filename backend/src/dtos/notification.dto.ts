import { Notification } from "../models/notification.model";

export interface GetNotificationDTO extends Pick<Notification, "id" | "type" | "message" | "userId" > {}

export interface CreateNotificationDTO extends Pick<Notification, "type" | "message" | "userId" > {}

