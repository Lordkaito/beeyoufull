import db from "@/db";

export default class EmailUser {
  constructor(public email: string) {
    this.email = email;
  }

  async create() {
    const userEmail = await db.emailUsers.create({
      data: {
        email: this.email,
        updatedAt: new Date(),
      },
    })
    await db.$disconnect();
    return userEmail;
  }

  static async getAll() {
    const users = await db.emailUsers.findMany();
    await db.$disconnect();

    return users;
  }

  static async countAll() {
    const count = await db.emailUsers.count();
    await db.$disconnect();

    return count;
  }
}