import {useEffect} from "react";
import AddressForm from "@/components/blocks/Address/AdressForm.tsx";

interface AdressBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function AddressBlock({setButtonDisabled}: AdressBlockProps) {
  useEffect(() => {
    setButtonDisabled(false);
  }, []);
  return (
    <div>
      <a>Address Block</a>
      <AddressForm onSubmit={() => {}}/>
    </div>
  )
}