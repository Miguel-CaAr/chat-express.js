export class TablesUseCase {
  constructor(CreateTables) {
    this.CreateTables = CreateTables;
  }

  async createTableUsers() {
    return await this.CreateTables.tableUser();
  }

  async createTableMessages() {
    return await this.CreateTables.tableMessage();
  }
}
