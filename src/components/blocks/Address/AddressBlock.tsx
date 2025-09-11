import {useEffect} from "react";
import AddressForm from "@/components/blocks/Address/AdressForm.tsx";

interface AdressBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function AddressBlock({setButtonDisabled}: AdressBlockProps) {
  useEffect(() => {
    setButtonDisabled(true);
  }, []);
  return (
    <div>
      <a>Address Block</a>
      <AddressForm onSubmit={() => {setButtonDisabled(false)}}/>
    </div>
  )
}