export type KitchenStatus =
  | "IN_PROGRESS"
  | "READY"
  | "HANDED_OVER"
  | "CANCELED";

export interface KitchenStatusResponse {
  orderId: string;
  status: KitchenStatus;
  estimatedReadyAt: string | null;
  updatedAt: string;
}
