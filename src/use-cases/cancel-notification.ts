import { Injectable } from '@nestjs/common';

import { NotificationRepository } from 'src/app/repositories/NotificationRepository';
import { NotificationNotFound } from './errors/notification-not-found';

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    req: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = req;

    const notification = await this.notificationsRepository.findByID(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}

type CancelNotificationRequest = {
  notificationId: string;
};

type CancelNotificationResponse = void;
