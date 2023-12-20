import db from "@/db";

export default class User {
  constructor(public email: string, public firstName: string, public lastName: string, public password: string, id: number) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  async create() {
    const user = await db.users.create({
      data: {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        updatedAt: new Date(),
      },
    });
    await db.$disconnect();
    return user;
  }

  static async getAll() {
    const users = await db.users.findMany();
    await db.$disconnect();

    return users;
  }

  static async countAll() {
    const count = await db.users.count();
    await db.$disconnect();

    return count;
  }
}