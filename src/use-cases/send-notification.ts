import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { Notification } from "../app/entities/Notification";
import { Content } from "../app/entities/Notification/Content";

@Injectable()
export class SendNotification {
	constructor(private notificationsRepository: NotificationRepository) {}

	async execute(
		req: SendNotificationRequest,
	): Promise<SendNotificationResponse> {
		const { category, content, recipientId } = req;

		const notification = new Notification({
			content: new Content(content),
			recipientId,
			category,
		});

		await this.notificationsRepository.create(notification);

		return { notification };
	}
}

type SendNotificationRequest = {
	recipientId: string;
	category: string;
	content: string;
};

type SendNotificationResponse = {
	notification: Notification;
};
