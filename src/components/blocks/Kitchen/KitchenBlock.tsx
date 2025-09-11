import {useEffect, useState} from "react";
import Spinner from "@/components/util/Spinner.tsx";
import {fetchKitchenApproval} from "@/api/fetchKitchenApproval.ts";

interface KitchenBlockProps {
  gotoNext: () => void
}

export default function KitchenBlock({gotoNext}: KitchenBlockProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        //TODO: replace with actual orderId
        await fetchKitchenApproval(crypto.randomUUID());
        if (!cancelled) {
          gotoNext()
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          // In case of error, keep NEXT disabled or handle as needed
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <a>Kitchen Block</a>
      {loading ? (
        <div className="flex items-center gap-2">
          <span>- Waiting for approval...</span>
          <Spinner/>
        </div>
      ) : (
        <div className="text-green-700">- Approved! You can continue.</div>
      )}
    </div>
  )
}