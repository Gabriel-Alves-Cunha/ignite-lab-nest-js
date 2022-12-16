import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { Notification } from "@app/entities/Notification/Notification";

export class InMemoryNotificationRepository implements NotificationRepository {
	allNotifications: Notification[] = [];

	async findManyByRecipientID(recipientId: string): Promise<Notification[]> {
		return this.allNotifications.filter(
			(item) => item.recipientId === recipientId,
		);
	}

	async countManyByRecipientID(recipientId: string): Promise<number> {
		return this.allNotifications.filter(
			(item) => item.recipientId === recipientId,
		).length;
	}

	async findByID(notificationId: string): Promise<Notification | undefined> {
		return this.allNotifications.find((item) => item.id === notificationId);
	}

	async save(notification: Notification): Promise<void> {
		const notificationIndex = this.allNotifications.findIndex(
			(item) => item.id === notification.id,
		);

		if (notificationIndex >= 0)
			this.allNotifications[notificationIndex] = notification;
	}

	async create(notification: Notification) {
		this.allNotifications.push(notification);
	}
}
