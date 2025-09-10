interface InventoryItemProps {
  name: string
  description: string
  availableAmount: number
  onItemClick: () => void
}

export default function InventoryItem({name, description, availableAmount, onItemClick}: InventoryItemProps) {
  const disabled = availableAmount === 0
  let onClick = () => {}
  if (!disabled) {
    onClick = () => {
      onItemClick()
    }
  }
  return <div
    aria-disabled={disabled}
    className="bg-gray-300 w-[500px] aria-[disabled=false]:hover:bg-gray-400 aria-[disabled=true]:opacity-50"
    onClick={onClick}
  >
    <a>{name}</a>
    {/*{item.name}</strong> — {item.description} (available: {item.availableAmount})*/}
    <p>—  {description} (available: {availableAmount})</p>
  </div>
}