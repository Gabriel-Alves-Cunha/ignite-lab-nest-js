import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { Notification } from "src/app/entities/Notification";


export class InMemoryNotificationRepository implements NotificationRepository {
	allNotifications: Notification[] = [];

	async create(notification: Notification) {
		this.allNotifications.push(notification);
	}
}
