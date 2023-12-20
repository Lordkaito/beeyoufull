import db from "@/db";
import { enum_category } from "@prisma/client";

export default class Product {
  constructor(public name: string, public price: number, public description: string, public images: string, public inventory: number, public storeId: number, public tags: string, public category: string, public subcategory: string) {
    this.name = name
    this.price = price
    this.description = description
    this.images = images
    this.inventory = inventory
    this.storeId = storeId
    this.tags = tags
    this.category = category
    this.subcategory = subcategory
  }

  static async getAll() {
    const products = await db.products.findMany();
    await db.$disconnect();
    return products;
  }

  async create() {
    const validCategory = ["ACCESSORIES",
      "ART",
      "BABY",
      "BEAUTY",
      "BOOKS",
      "CLOTHING",
      "ELECTRONICS",
      "FOOD",
      "GARDEN",
      "HEALTH",
      "HOME",
      "JEWELRY",
      "MUSIC",
      "OFFICE",
      "OUTDOORS",
      "PETS",
      "SPORTS",
      "TOYS",
      "VEHICLES",
      "OTHER",];

      if(!validCategory.includes(this.category)) {
        throw new Error("Invalid category");
      }
    const product = await db.products.create({
      data: {
        name: this.name,
        description: this.description,
        images: this.images,
        price: this.price,
        inventory: this.inventory,
        storeId: this.storeId,
        tags: this.tags,
        category: this.category as enum_category,
        subcategory: this.subcategory,
      },
    });
    await db.$disconnect();
    return product;
  }


}