import { useQuery } from "@tanstack/react-query";
import { fetchKitchenStatus } from "../api/fetchKitchenStatus";
import type {
  KitchenStatus,
  KitchenStatusResponse,
} from "../types/kitchenStatus.types";

function isTerminal(status: KitchenStatus) {
  return status === "HANDED_OVER" || status === "CANCELED";
}

export function useKitchenStatus(orderId: string | null) {
  return useQuery({
    queryKey: ["kitchenStatus", orderId],
    enabled: Boolean(orderId),
    queryFn: ({ signal }) =>
      orderId ? fetchKitchenStatus(orderId, signal) : Promise.resolve(null),
    select: (data: KitchenStatusResponse | null) =>
      data
        ? {
            ...data,
            estimatedReadyAt: data.estimatedReadyAt
              ? new Date(data.estimatedReadyAt).toLocaleTimeString()
              : null,
            updatedAt: new Date(data.updatedAt).toLocaleTimeString(),
          }
        : null,
    refetchInterval: (query) => {
      const d = query.state.data;
      return !d || !isTerminal(d.status) ? 3000 : false;
    },
    staleTime: 10_000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
