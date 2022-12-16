import { Notification } from "../entities/Notification/Notification";

export abstract class NotificationRepository {
	abstract create(notification: Notification): Promise<void>;

	abstract findByID(notificationId: string): Promise<Notification | undefined>;

	abstract save(notification: Notification): Promise<void>;

	abstract countManyByRecipientID(recipientId: string): Promise<number>;

	abstract findManyByRecipientID(recipientId: string): Promise<Notification[]>
}
