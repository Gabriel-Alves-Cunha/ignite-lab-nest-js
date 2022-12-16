import { Injectable } from "@nestjs/common";

import { Notification as DomainNotification } from "@app/entities/Notification/Notification";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
	constructor(private prisma: PrismaService) {}

	async findManyByRecipientID(
		recipientId: string,
	): Promise<DomainNotification[]> {
		const notifications = await this.prisma.notification.findMany({
			where: {
				recipientId,
			},
		});

		return notifications.map(PrismaNotificationMapper.toDomain);
	}

	async countManyByRecipientID(recipientId: string): Promise<number> {
		const count = await this.prisma.notification.count({
			where: {
				recipientId,
			},
		});

		return count;
	}

	async findByID(
		notificationId: string,
	): Promise<DomainNotification | undefined> {
		const rawNotification = await this.prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		});

		if (!rawNotification) return undefined;

		return PrismaNotificationMapper.toDomain(rawNotification);
	}

	async save(notification: DomainNotification): Promise<void> {
		const raw = PrismaNotificationMapper.toPrisma(notification);

		await this.prisma.notification.update({
			where: {
				id: raw.id,
			},
			data: raw,
		});
	}

	async create(notification: DomainNotification): Promise<void> {
		const raw = PrismaNotificationMapper.toPrisma(notification);

		await this.prisma.notification.create({
			data: raw,
		});
	}
}
