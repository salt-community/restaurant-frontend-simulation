import {useEffect, useState} from "react";
import Spinner from "@/components/util/Spinner.tsx";
import {fetchDeliveryStatus} from "@/api/fetchDeliveryStatus.ts";

interface DeliveryBlockProps {
  orderId: string;
  gotoNext: () => void;
}

export default function DeliveryBlock({orderId, gotoNext}: DeliveryBlockProps) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const pollStatus = async () => {
      try {
        const currentStatus = await fetchDeliveryStatus(orderId);
        if (cancelled) return;

        setStatus(currentStatus);
        if (currentStatus === "COMPLETED") {
          setLoading(false);
          gotoNext();
        } else {
          setLoading(true);
          // Poll again in 3 seconds
          setTimeout(pollStatus, 3000);
        }
      } catch (err) {
        console.error("Failed to fetch delivery status", err);
        if (!cancelled) setLoading(true);
        setTimeout(pollStatus, 5000); // retry in 5s if error
      }
    };

    pollStatus();

    return () => {
      cancelled = true;
    };
  }, [orderId, gotoNext]);

  return (
    <div>
      <a>Delivery Block</a>
      {loading
        ? <div className="flex items-center gap-2">
            <span>- Waiting for delivery...</span>
            <Spinner />
          </div>
        : <div className="text-green-700">- Delivered!</div>
      }
    </div>
  );
}
