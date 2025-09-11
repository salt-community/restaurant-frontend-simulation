import {useEffect, useState} from "react";
import Spinner from "@/components/util/Spinner.tsx";
import {fetchDeliveryStatus} from "@/api/fetchDeliveryStatus.ts";

interface DeliveryBlockProps {
  gotoNext: () => void
}

export default function DeliveryBlock({gotoNext}: DeliveryBlockProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Disable the NEXT button while waiting

    (async () => {
      try {
        //TODO: replace with actual orderId
        await fetchDeliveryStatus(crypto.randomUUID());
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
      <a>Delivery Block</a>
      {loading
        ? <div className="flex items-center gap-2">
            <span>- Waiting for delivery...</span>
            <Spinner/>
          </div>
        : <div className="text-green-700">- Delivered!</div>
      }
    </div>
  )
}