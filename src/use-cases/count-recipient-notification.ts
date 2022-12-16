import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "src/app/repositories/NotificationRepository";

@Injectable()
export class CountRecipientNotification {
	constructor(private notificationsRepository: NotificationRepository) {}

	async execute(
		req: CountRecipientNotificationRequest,
	): Promise<CountRecipientNotificationResponse> {
		const { recipientId } = req;

		const count = await this.notificationsRepository.countManyByRecipientID(
			recipientId,
		);

		return { count };
	}
}

type CountRecipientNotificationRequest = {
	recipientId: string;
};

type CountRecipientNotificationResponse = { count: number };
