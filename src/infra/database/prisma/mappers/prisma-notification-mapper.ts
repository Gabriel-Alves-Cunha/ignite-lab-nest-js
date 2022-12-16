import type { Notification as RawNotification } from "@prisma/client";

import { Notification } from "@app/entities/Notification/Notification";
import { Content } from "@app/entities/Notification/Content";

export class PrismaNotificationMapper {
	static toPrisma(notification: Notification) {
		return {
			recipientId: notification.recipientId,
			content: notification.content.value,
			createdAt: notification.createdAt,
			category: notification.category,
			readAt: notification.readAt,
			id: notification.id,
		};
	}

	static toDomain(raw: RawNotification): Notification {
		return new Notification(
			{
				content: new Content(raw.content),
				recipientId: raw.recipientId,
				canceledAt: raw.canceledAt,
				createdAt: raw.createdAt,
				category: raw.category,
				readAt: raw.readAt,
			},
			raw.id,
		);
	}
}
