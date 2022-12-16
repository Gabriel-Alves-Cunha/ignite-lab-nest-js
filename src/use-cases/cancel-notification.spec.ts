import { InMemoryNotificationRepository } from "../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { CancelNotification } from "./cancel-notification";
import { makeNotification } from "@test/factories/notification";

describe("Cancel notification", () => {
	it("should be able to send a notification", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const cancelNotification = new CancelNotification(notificationRepository);

		const newNotification = makeNotification();

		await notificationRepository.create(newNotification);

		await cancelNotification.execute({
			notificationId: newNotification.id,
		});

		expect(notificationRepository.allNotifications[0].canceledAt).toEqual(
			expect.any(Date),
		);
	});

	it("should not be able to cancel a notification when it does not exists", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const cancelNotification = new CancelNotification(notificationRepository);

		const newNotification = makeNotification();

		// await notificationRepository.create(newNotification);

		expect(
			async () =>
				await cancelNotification.execute({
					notificationId: newNotification.id,
				}),
		).rejects.toThrow(NotificationNotFound);
	});
});
