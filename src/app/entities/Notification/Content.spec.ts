import { Content } from './Content';

describe('Notification content', () => {
  it('should be able to create a Notification content', () => {
    const content = new Content('Você tem uma nova solicitação!');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a Notification content with less than 5 chars', () => {
    expect(() => new Content('123!')).toThrow();
  });

  it('should not be able to create a Notification content with more than 240 chars', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
