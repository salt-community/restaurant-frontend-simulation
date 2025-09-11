import {getKitchenUrl} from "./util/getUrl.ts";
import isMockedFetches from "@/api/util/isMockedFetches.ts";
import type {UUID} from "node:crypto";

export async function fetchKitchenApproval(orderId: UUID) {
  if (isMockedFetches()) {
    return mockKitchenApproval()
  } else {
    const url = getKitchenUrl() + "api/" + orderId + "/status"
    const response = await fetch(url)
    return response.json()
  }
}

async function mockKitchenApproval() {
  return await new Promise<void>(resolve => setTimeout(resolve, 3000));
}