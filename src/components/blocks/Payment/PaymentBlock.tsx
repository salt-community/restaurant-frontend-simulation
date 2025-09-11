import {useEffect} from "react";
import PaymentForm from "@/components/blocks/Payment/PaymentForm.tsx";

interface PaymentBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function PaymentBlock({setButtonDisabled}: PaymentBlockProps) {
  useEffect(() => {
    setButtonDisabled(true);
  }, []);
  return (
    <div>
      <a>Payment Block</a>
      <PaymentForm onSubmit={() => {setButtonDisabled(false)}}/>
    </div>
  )
}