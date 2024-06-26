import { Message } from "../entities/message.js";

export class MessageUseCase {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async createMessage(content, user) {
    const message = new Message(null, content, user);
    return await this.messageRepository.create(message);
  }

  async getMessagesById(id) {
    return await this.messageRepository.getAllById(id);
  }
}
