import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { NotificationNotFound } from "./errors/notification-not-found";

@Injectable()
export class UnreadNotification {
	constructor(private notificationsRepository: NotificationRepository) {}

	async execute(
		req: UnreadNotificationRequest,
	): Promise<UnreadNotificationResponse> {
		const { notificationId } = req;

		const notification = await this.notificationsRepository.findByID(
			notificationId,
		);

		if (!notification) throw new NotificationNotFound();

		notification.unread();

		await this.notificationsRepository.save(notification);
	}
}

type UnreadNotificationRequest = {
	notificationId: string;
};

type UnreadNotificationResponse = void;
