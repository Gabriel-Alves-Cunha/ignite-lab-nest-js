import { randomUUID } from "crypto";

import { Notification } from "@app/entities/Notification/Notification";
import { Content } from "@app/entities/Notification/Content";

export function makeNotification(override: Partial<Notification> = {}) {
	return new Notification({
		content: new Content("Nova solicitação!"),
		recipientId: randomUUID(),
		category: "social",
		...override,
	});
}
