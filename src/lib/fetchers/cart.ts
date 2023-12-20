import { cookies } from "next/headers"
import db from "@/db"
import { carts, products, stores } from "@/db/schema"
import type { CartLineItem } from "@/types"

export async function getCart(input?: {
  storeId: number
}): Promise<any> {
  const cartId = cookies().get("cartId")?.value

  if (!cartId || isNaN(Number(cartId))) return []

  const cart = await db.carts.findFirst({
    select: {
      items: true,
    },
    where: {
      id: Number(cartId),
    },
  });

  const items = cart?.items;
  const productIds = Array.isArray(items) ? items.map((item) => {console.log(item); return item}) : [];


  if (productIds.length === 0) return []

  const uniqueProductIds = [...new Set(productIds)]

  const cartLineItems = await db.products.findMany({
    select: {
      id: true,
      name: true,
      images: true,
      category: true,
      subcategory: true,
      price: true,
      inventory: true,
      storeId: true,
      description: true,
      tags: true,
      createdAt: true,
    },
    where: {
      AND: [
        { id: {
          in: uniqueProductIds as number[] } },
        input?.storeId ? { storeId: input.storeId } : {},
      ],
    },
    orderBy: {
      storeId: 'desc',
      createdAt: 'asc',
    }
  })

  return cartLineItems
}

export async function getUniqueStoreIds() {
  const cartId = cookies().get("cartId")?.value

  if (!cartId || isNaN(Number(cartId))) return []

  try {
    const cart = await db.products.findFirst({
  select: {
    storeId: true,
  },
  where: {
    id: Number(cartId),
  },
});


    // const storeIds = cart?.map((item) => Number(item.storeId)).filter((id) => id)

    return cart
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function getCartItems(input: { cartId?: number }) {
  if (!input.cartId || isNaN(input.cartId)) return []

  try {
    const cart = await db.carts.findFirst({
      where: {
        id: input.cartId,
      },
    });

    return cart?.items
  } catch (err) {
    console.error(err)
    return []
  }
}
