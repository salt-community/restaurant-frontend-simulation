import { getKitchenUrl } from "./util/getUrl";
import type { KitchenStatusResponse } from "../types/kitchenStatus.types";

const BASE_URL = getKitchenUrl();

export async function fetchKitchenStatus(
  orderId: string,
  signal?: AbortSignal
): Promise<KitchenStatusResponse | null> {
  const url = `${BASE_URL}/api/tickets/${encodeURIComponent(orderId)}/status`;
  const res = await fetch(url, { signal });

  if (res.status === 404) return null;

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `GET ${url} failed (${res.status}): ${text || res.statusText}`
    );
  }

  return (await res.json()) as KitchenStatusResponse;
}
