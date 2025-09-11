import {getPaymentUrl} from "./util/getUrl.ts";
import type {UUID} from "node:crypto";
import isMockedFetches from "@/api/util/isMockedFetches.ts";

export async function fetchPayment(orderId: UUID, amount: number, providerPaymentId: string) {
  if (isMockedFetches()) {
    return mockPayment()
  } else {
    const url = getPaymentUrl() + "api/payments/"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        amount: amount,
        providerPaymentId: providerPaymentId
      }),
    })
    return response.json()
  }
}

async function mockPayment() {
  return await new Promise<void>(resolve => setTimeout(resolve, 3000));
}