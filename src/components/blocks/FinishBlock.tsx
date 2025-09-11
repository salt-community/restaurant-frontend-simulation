import {useEffect} from "react";

interface FinishBlockProps {
  setButtonDisabled: (disabled: boolean) => void
}

export default function FinishBlock({setButtonDisabled}: FinishBlockProps) {
  useEffect(() => {
    setButtonDisabled(false);
  }, []);
  return <div className="text-green-700">- Delivered!</div>
}