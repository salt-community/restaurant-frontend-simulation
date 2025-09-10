interface InventoryItemProps {
  name: string
  description: string
  availableAmount: number
  onItemClick: () => void
}

export default function InventoryItem({name, description, availableAmount, onItemClick}: InventoryItemProps) {
  return <div
    className="bg-gray-300 w-[500px] hover:bg-gray-400"
    onClick={onItemClick}
  >
    <a>{name}</a>
    {/*{item.name}</strong> — {item.description} (available: {item.availableAmount})*/}
    <p>—  {description} (available: {availableAmount})</p>
  </div>
}