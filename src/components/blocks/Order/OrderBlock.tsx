import {useEffect, useState} from "react";
import {fetchInventory} from "@/api/fetchInventory.ts";
import InventoryItem from "@/components/blocks/Order/InventoryItem.tsx";

interface OrderBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function OrderBlock({setButtonDisabled}: OrderBlockProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Array<{
    id: number;
    name: string;
    description: string;
    availableAmount: number;
  }>>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInventory();
        if (!cancelled) {
          setInventory(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load inventory");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);


  return <div>
    <h3>Order Block</h3>
    {loading && <div>Loading inventory…</div>}
    {error && <div style={{color: "red"}}>Error: {error}</div>}
    {!loading && !error && (
      <ul className="flex flex-col gap-2">
        {inventory.map(item => (
          <li key={item.id}>
            <InventoryItem
              name={item.name}
              description={item.description}
              availableAmount={item.availableAmount}
              onItemClick={() => {
                setButtonDisabled(false)
              }}
            />
          </li>
        ))}
      </ul>
    )}
  </div>

}