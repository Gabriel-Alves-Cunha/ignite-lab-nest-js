import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { PrismaService } from "../prisma.service";
import { Notification } from "src/app/entities/Notification";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
	constructor(private prismaService: PrismaService) {}

	async create(notification: Notification): Promise<void> {
		await this.prismaService.notification.create({
			data: {
				recipientId: notification.recipientId,
				content: notification.content.value,
				createdAt: notification.createdAt,
				category: notification.category,
				readAt: notification.readAt,
				id: notification.id,
			},
		});
	}
}
