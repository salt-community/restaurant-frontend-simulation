import {getDeliveryUrl} from "./util/getUrl.ts";
import isMockedFetches from "@/api/util/isMockedFetches.ts";
import type {UUID} from "node:crypto";

export async function fetchDeliveryStatus(orderId: UUID) {
  if (isMockedFetches()) {
    return mockDeliveryStatus()
  } else {
    const url = getDeliveryUrl() + "api/" + orderId + "/status"
    const response = await fetch(url)
    return response.json()
  }
}

async function mockDeliveryStatus() {
  return await new Promise<void>(resolve => setTimeout(resolve, 3000));
}