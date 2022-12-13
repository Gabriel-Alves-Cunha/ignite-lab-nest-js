import type { Replace } from "src/@types/helpers";

import { randomUUID } from "node:crypto";

import { Content } from "./Content";

export class Notification {
	#props: NotificationProps;
	#id: string;

	constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
		this.#id = randomUUID();
		this.#props = {
			...props,
			createdAt: props.createdAt ?? new Date(),
		};
	}

	get id() {
		return this.#id;
	}

	set content(content: Content) {
		this.#props.content = content;
	}

	get content() {
		return this.#props.content;
	}

	set recipientId(recipientId: string) {
		this.#props.recipientId = recipientId;
	}

	get recipientId() {
		return this.#props.recipientId;
	}

	set category(category: string) {
		this.#props.category = category;
	}

	get category() {
		return this.#props.category;
	}

	set readAt(readAt: Date | null | undefined) {
		this.#props.readAt = readAt;
	}

	get readAt() {
		return this.#props.readAt;
	}

	get createdAt() {
		return this.#props.createdAt;
	}
}

export type NotificationProps = {
	readAt?: Date | null;
	recipientId: string;
	category: string;
	content: Content;
	createdAt: Date;
};
