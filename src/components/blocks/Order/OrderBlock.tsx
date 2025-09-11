import {useEffect, useState} from "react";
import {fetchInventory} from "@/api/fetchInventory.ts";
import InventoryItem from "@/components/blocks/Order/InventoryItem.tsx";

interface OrderBlockProps {
  buttonDisabled: boolean
  setButtonDisabled: (disabled: boolean) => void
}

export default function OrderBlock({buttonDisabled, setButtonDisabled}: OrderBlockProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inventory, setInventory] = useState<Array<{
    id: number;
    name: string;
    description: string;
    availableAmount: number;
  }>>([]);
  const [cart, setCart] = useState<Array<number>>([])

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInventory();
        if (!cancelled) {
          setInventory(data);
          setCart(Array(data.length).fill(0))
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

  useEffect(() => {
    if (!buttonDisabled && cart.every(item => item == 0)) setButtonDisabled(true);
    else if (buttonDisabled && cart.some(item => item != 0)) setButtonDisabled(false);
  }, [cart]);

  return (
    <div>
      <h3>Order Block</h3>
      {loading && <div>Loading inventory…</div>}
      {error && <div style={{color: "red"}}>Error: {error}</div>}
      {!loading && !error && (
        <ul className="flex flex-col gap-2">
          {inventory.map((item, idx) => (
            <li key={item.id}>
              <InventoryItem
                name={item.name}
                description={item.description}
                availableAmount={item.availableAmount}
                selectedAmount={cart[idx]}
                setCart={(change: 1 | -1) => {
                  setCart(prev => {
                    const next = [...prev]
                    next[idx] = next[idx] + change
                    return next
                  })
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )

}