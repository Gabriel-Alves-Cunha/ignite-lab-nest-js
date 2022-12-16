import { Notification } from '@app/entities/Notification/Notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      id: notification.id,
    };
  }
}
