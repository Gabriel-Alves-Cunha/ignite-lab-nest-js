export class Content {
  readonly #content: string;

  constructor(content: string) {
    if (!this.isLengthValid(content))
      throw new Error(
        `Content lenght must be between: 5 <= length <= 240. Received: \`${content.length}\`.`,
      );

    this.#content = content;
  }

  get value() {
    return this.#content;
  }

  isLengthValid(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
