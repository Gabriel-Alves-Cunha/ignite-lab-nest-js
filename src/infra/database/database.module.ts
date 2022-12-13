import { Module } from "@nestjs/common";

import { PrismaNotificationsRepository } from "./prisma/repositories/prisma-notifications-repository";
import { NotificationRepository } from "src/app/repositories/NotificationRepository";
import { PrismaService } from "./prisma/prisma.service";

@Module({
	providers: [PrismaService,
	{
		provide: NotificationRepository,
		useClass: PrismaNotificationsRepository
	}],
	exports: [NotificationRepository]
})
export class DatabaseModule {}
