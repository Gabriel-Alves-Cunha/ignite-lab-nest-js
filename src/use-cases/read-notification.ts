import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { NotificationNotFound } from "./errors/notification-not-found";

@Injectable()
export class ReadNotification {
	constructor(private notificationsRepository: NotificationRepository) {}

	async execute(
		req: ReadNotificationRequest,
	): Promise<ReadNotificationResponse> {
		const { notificationId } = req;

		const notification = await this.notificationsRepository.findByID(
			notificationId,
		);

		if (!notification) throw new NotificationNotFound();

		notification.read();

		await this.notificationsRepository.save(notification);
	}
}

type ReadNotificationRequest = {
	notificationId: string;
};

type ReadNotificationResponse = void;
