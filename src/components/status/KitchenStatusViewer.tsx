import { useKitchenStatus } from "../../hooks/useKitchenStatus";

export function KitchenStatusViewer({ orderId }: { orderId: string }) {
  const { data, isLoading, isError, error } = useKitchenStatus(orderId);

  if (isLoading) return <div>Loading kitchen status...</div>;
  if (isError)
    return <div>Error loading kitchen status: {(error as Error).message}</div>;
  if (data == null)
    return <div>No kitchen status available for order ID: {orderId}</div>;

  return (
    <div style={{ fontFamily: "system-ui", lineHeight: 1.5 }}>
      <div>Order: {data.orderId}</div>
      <div>Status: {data.status}</div>
      <div>
        ETA:
        {data.estimatedReadyAt ? data.estimatedReadyAt.toLocaleString() : "-"}
      </div>
      <div>Updated: {data.updatedAt.toLocaleString()}</div>
    </div>
  );
}
