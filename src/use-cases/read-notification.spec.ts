import { InMemoryNotificationRepository } from "../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification";
import { ReadNotification } from "./read-notification";

describe("Read notification", () => {
	it("should be able to read a notification", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const readNotification = new ReadNotification(notificationRepository);

		const newNotification = makeNotification();

		await notificationRepository.create(newNotification);

		await readNotification.execute({
			notificationId: newNotification.id,
		});

		expect(notificationRepository.allNotifications[0].readAt).toEqual(
			expect.any(Date),
		);
	});

	it("should not be able to read a notification when it does not exists", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const readNotification = new ReadNotification(notificationRepository);

		const newNotification = makeNotification();

		expect(
			async () =>
				await readNotification.execute({
					notificationId: newNotification.id,
				}),
		).rejects.toThrow(NotificationNotFound);
	});
});
