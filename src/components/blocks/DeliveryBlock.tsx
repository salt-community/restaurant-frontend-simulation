import {useEffect} from "react";

interface DeliveryBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function DeliveryBlock({setButtonDisabled}: DeliveryBlockProps) {
  useEffect(() => {
    setButtonDisabled(false);
  }, []);
  return <a>Delivery Block</a>
}