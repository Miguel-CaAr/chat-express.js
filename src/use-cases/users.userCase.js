import { User } from "../entities/user.js";

export class UsersUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async createUser(name, picture) {
    const user = new User(null, name, picture);
    return await this.usersRepository.create(user);
  }

  async getUserById(id) {
    return await this.usersRepository.getAllById(id);
  }
}