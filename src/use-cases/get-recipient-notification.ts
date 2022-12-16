import { Notification } from "@app/entities/Notification/Notification";
import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "src/app/repositories/NotificationRepository";

@Injectable()
export class GetRecipientNotifications {
	constructor(private notificationsRepository: NotificationRepository) {}

	async execute(
		req: GetRecipientNotificationsRequest,
	): Promise<GetRecipientNotificationsResponse> {
		const { recipientId } = req;

		const notifications =
			await this.notificationsRepository.findManyByRecipientID(recipientId);

		return { notifications };
	}
}

type GetRecipientNotificationsRequest = {
	recipientId: string;
};

type GetRecipientNotificationsResponse = { notifications: Notification[] };
