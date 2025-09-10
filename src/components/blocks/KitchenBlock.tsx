import {useEffect} from "react";

interface KitchenBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function KitchenBlock({setButtonDisabled}: KitchenBlockProps) {
  useEffect(() => {
    setButtonDisabled(false);
  }, []);
  return <a>Kitchen Block</a>
}