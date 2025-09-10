import {useEffect} from "react";

interface AdressBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function AdressBlock({setButtonDisabled}: AdressBlockProps) {
  useEffect(() => {
    setButtonDisabled(false);
  }, []);
  return <a>Adress Block</a>
}