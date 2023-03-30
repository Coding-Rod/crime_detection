import { Notification } from "../models/notification.model";
import { User } from "../models/user.model";

<<<<<<< HEAD
export interface GetNotificationDTO extends Pick<Notification, "id" | "type" | "message" | "userId" > {}
=======
export interface GetNotificationDTO extends Pick<Notification, "id" | "type" | "message" >, Pick<User, 'name'> {}
>>>>>>> backend

export interface CreateNotificationDTO extends Pick<Notification, "type" | "message" | "userId" > {}

