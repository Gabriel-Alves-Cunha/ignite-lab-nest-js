import { randomUUID } from 'node:crypto';

import { InMemoryNotificationRepository } from '../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      recipientId: randomUUID(),
      category: 'social',
    });

    expect(notification).toBeTruthy();
    expect(notificationRepository.allNotifications).toHaveLength(1);
    expect(notificationRepository.allNotifications[0]).toEqual(notification);
  });
});
