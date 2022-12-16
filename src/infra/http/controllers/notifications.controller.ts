import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { CreateNotificationBody } from "../dtos/create-notification-body";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { CancelNotification } from "src/use-cases/cancel-notification";
import { SendNotification } from "src/use-cases/send-notification";
import { ReadNotification } from "src/use-cases/read-notification";
import { UnreadNotification } from "src/use-cases/unread-notification";
import { CountRecipientNotification } from "src/use-cases/count-recipient-notification";
import { GetRecipientNotifications } from "src/use-cases/get-recipient-notification";

@Controller('notifications')
export class NotificationsController {
	constructor(
		private sendNotification: SendNotification,
		private cancelNotification: CancelNotification,
		private readNotification: ReadNotification,
		private unreadNotification: UnreadNotification,
		private countRecipientNotifications: CountRecipientNotification,
		private getRecipientNotifications: GetRecipientNotifications,
	) {}

	@Post()
	async create(@Body() body: CreateNotificationBody) {
		const { recipientId, content, category } = body;

		const { notification } = await this.sendNotification.execute({
			recipientId,
			category,
			content,
		});

		return { notification: NotificationViewModel.toHttp(notification) };
	}

	@Patch(":id/cancel")
	async cancel(@Param("id") id: string) {
		await this.cancelNotification.execute({
			notificationId: id,
		});
	}

	@Patch(":id/read")
	async read(@Param("id") id: string) {
		await this.readNotification.execute({
			notificationId: id,
		});
	}

	@Patch(":id/unread")
	async unread(@Param("id") id: string) {
		await this.unreadNotification.execute({
			notificationId: id,
		});
	}

	@Get("count/from/:recipientId")
	async countFromRecipient(
		@Param("recipientId") recipientId: string,
	): Promise<{ count: number }> {
		return await this.countRecipientNotifications.execute({
			recipientId,
		});
	}

	@Get("from/:recipientId")
	async getFromRecipient(
		@Param("recipientId") recipientId: string,
	) {
		const { notifications } = await this.getRecipientNotifications.execute({
			recipientId,
		});

		return { notifications: notifications.map(NotificationViewModel.toHttp) };
	}
}
