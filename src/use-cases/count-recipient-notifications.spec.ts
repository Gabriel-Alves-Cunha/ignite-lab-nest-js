import { randomUUID } from "node:crypto";

import { InMemoryNotificationRepository } from "../../test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notification";
import { makeNotification } from "@test/factories/notification";

describe("Count recipient notifications", () => {
	it("should be able to count recipient notifications", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const countRecipientNotifications = new CountRecipientNotification(
			notificationRepository,
		);
		const recipientId = randomUUID();

		await countRecipientNotifications.execute(
			makeNotification({ recipientId }),
		);
		await countRecipientNotifications.execute(
			makeNotification({ recipientId }),
		);
		await countRecipientNotifications.execute(makeNotification());

		const { count } = await countRecipientNotifications.execute({
			recipientId,
		});

		expect(count).toEqual(2);
	});
});
