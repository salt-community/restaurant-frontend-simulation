import {getOrderUrl} from "./util/getUrl.ts";
import isMockedFetches from "@/api/util/isMockedFetches.ts";

type OrderItem = {
  itemId: number
  quantity: number
  price: number
}

export async function fetchOrder(orderItems: OrderItem[]) {
  if (isMockedFetches()) {
    return mockOrder()
  } else {
    const url = getOrderUrl() + "api/order/"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: orderItems
      }),
    })
    return response.json()
  }
}

async function mockOrder() {
  return await new Promise<void>(resolve => setTimeout(resolve, 3000));
}