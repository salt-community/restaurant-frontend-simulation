export type TicketStatus = "IN_PROGRESS" | "READY" | "HANDED_OVER" | "CANCELED";

export interface KitchenStatusResponse {
  orderId: string;
  status: TicketStatus;
  estimatedReadyAt: string | null;
  updatedAt: string;
}
