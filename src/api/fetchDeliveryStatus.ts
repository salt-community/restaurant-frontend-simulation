import { getDeliveryUrl } from "./util/getUrl.ts";
import isMockedFetches from "@/api/util/isMockedFetches.ts";

export async function fetchDeliveryStatus(orderId: string): Promise<string> {
  if (isMockedFetches()) {
    return mockDeliveryStatus();
  } else {
    const url = `${getDeliveryUrl()}/api/deliveries/${orderId}/status`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch delivery status");
    return response.json();
  }
}


async function mockDeliveryStatus(): Promise<string> {
  // simulate 3s delay, then return COMPLETED
  await new Promise(resolve => setTimeout(resolve, 3000));
  return "COMPLETED";
}
