interface InventoryItemProps {
  name: string
  description: string
  availableAmount: number
  selectedAmount: number
  setCart: (change: 1 | -1) => void
}

export default function InventoryItem({name, description, availableAmount, selectedAmount, setCart}: InventoryItemProps) {
  const disabled = availableAmount === 0
  const reachedMax = selectedAmount === availableAmount
  const reachedMin = selectedAmount === 0

  return <div
    aria-disabled={disabled}
    className="bg-gray-300 w-[500px] aria-[disabled=false]:hover:bg-gray-400 aria-[disabled=true]:opacity-50"
  >
    <a>{name}</a>
    {/*{item.name}</strong> — {item.description} (available: {item.availableAmount})*/}
    {
      !disabled
        ? (
          <>
            <p>—  {description} (available: {availableAmount})</p>
            <div>
              <button
                className="disabled:opacity-30"
                onClick={() => {
                  setCart(1)
                }}
                disabled={reachedMax}
              >+</button>
              <a>{selectedAmount}</a>
              <button
                className="disabled:opacity-30"
                onClick={() => {
                  setCart(-1)
                }}
                disabled={reachedMin}
              >-</button>
            </div>
          </>
        )
        : <p>—  {description} (Out of stock)</p>
    }

  </div>
}