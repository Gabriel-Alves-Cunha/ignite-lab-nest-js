import { InMemoryNotificationRepository } from "../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";
import { makeNotification } from "@test/factories/notification";

describe("Unread notification", () => {
	it("should be able to unread a notification", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const unreadNotification = new UnreadNotification(notificationRepository);

		const newNotification = makeNotification({ readAt: new Date() });

		await notificationRepository.create(newNotification);

		await unreadNotification.execute({
			notificationId: newNotification.id,
		});

		expect(notificationRepository.allNotifications[0].readAt).toBeUndefined();
	});

	it("should not be able to unread a notification when it does not exists", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const readNotification = new UnreadNotification(notificationRepository);

		const newNotification = makeNotification();

		expect(
			async () =>
				await readNotification.execute({
					notificationId: newNotification.id,
				}),
		).rejects.toThrow(NotificationNotFound);
	});
});
