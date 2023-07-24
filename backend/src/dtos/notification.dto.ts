import { Notification } from "../models/notification.model";
import { User } from "../models/user.model";

export interface GetNotificationDTO extends Pick<Notification, "id" | "type" | "message" >, Pick<User, 'name'> {}

export interface CreateNotificationDTO extends Pick<Notification, "type" | "message" | "userId" > {}

