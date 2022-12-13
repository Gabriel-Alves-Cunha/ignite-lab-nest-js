import { randomUUID } from "node:crypto";

import { Notification } from ".";
import { Content } from "./Content";

describe("Notification", () => {
	it("should be able to create a Notification", () => {
		const notification = new Notification({
			content: new Content("Nova solicitação"),
			recipientId: randomUUID(),
			createdAt: new Date(),
			category: "social",
		});

		expect(notification).toBeTruthy();
	});
});
