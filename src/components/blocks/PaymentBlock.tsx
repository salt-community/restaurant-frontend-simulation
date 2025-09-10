import {useEffect} from "react";

interface PaymentBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function PaymentBlock({setButtonDisabled}: PaymentBlockProps) {
  useEffect(() => {
    setButtonDisabled(false);
  }, []);
  return <a>Payment Block</a>
}