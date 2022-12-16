import { randomUUID } from "node:crypto";

import { InMemoryNotificationRepository } from "../../test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notification";
import { makeNotification } from "@test/factories/notification";

describe("Get recipient notifications", () => {
	it("should be able to get recipient notifications", async () => {
		const notificationRepository = new InMemoryNotificationRepository();
		const getRecipientNotifications = new GetRecipientNotifications(
			notificationRepository,
		);
		const recipientId = randomUUID();

		await getRecipientNotifications.execute(makeNotification({ recipientId }));
		await getRecipientNotifications.execute(makeNotification({ recipientId }));
		await getRecipientNotifications.execute(makeNotification());

		const { notifications } = await getRecipientNotifications.execute({
			recipientId,
		});

		expect(notifications).toHaveLength(2);
		expect(notifications).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ recipientId }),
				expect.objectContaining({ recipientId }),
			]),
		);
	});
});
