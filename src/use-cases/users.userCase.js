import { User } from "../entities/user.js";

export class UsersUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async createUser(name, picture, password) {
    const user = new User(null, name, picture, password);
    return await this.usersRepository.create(user);
  }

  async getUserById(id) {
    return await this.usersRepository.getAllById(id);
  }
}