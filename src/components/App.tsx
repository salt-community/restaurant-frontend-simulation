import SimulationBar from "@/components/progress_bar/SimulationBar.tsx";
import {type JSX, useState} from "react";
import OrderBlock from "@/components/blocks/Order/OrderBlock.tsx";
import PaymentBlock from "@/components/blocks/Payment/PaymentBlock.tsx";
import AddressBlock from "@/components/blocks/Address/AddressBlock.tsx";
import KitchenBlock from "@/components/blocks/KitchenBlock.tsx";
import DeliveryBlock from "@/components/blocks/DeliveryBlock.tsx";
import FinishBlock from "@/components/blocks/FinishBlock.tsx";
import {type BlockType, BLOCK_TYPE, BLOCKS_ORDERED} from "@/types/blocks.tsx";

function App() {
  const [currentBlock, setCurrentBlock] = useState<BlockType>(BLOCK_TYPE.ORDER)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const currentStep = BLOCKS_ORDERED.indexOf(currentBlock)
  const blockTypeMapToComponent: Record<BlockType, JSX.Element> = {
    ORDER: <OrderBlock buttonDisabled={buttonDisabled} setButtonDisabled={setButtonDisabled}/>,
    PAYMENT: <PaymentBlock setButtonDisabled={setButtonDisabled}/>,
    ADDRESS: <AddressBlock setButtonDisabled={setButtonDisabled}/>,
    KITCHEN: <KitchenBlock setButtonDisabled={setButtonDisabled}/>,
    DELIVERY: <DeliveryBlock setButtonDisabled={setButtonDisabled}/>,
    FINISH: <FinishBlock setButtonDisabled={setButtonDisabled}/>,
  }
  return (
    <>
      <h1>Restaurant Title</h1>
      <SimulationBar currentStep={currentStep}/>

      <div className="CurrentBlock">
        {
          blockTypeMapToComponent[currentBlock]
        }
        <br/>
        <button
          className="border-2 border-black rounded-md p-2 enabled:hover:bg-gray-200 disabled:opacity-50"
          disabled={buttonDisabled}
          onClick={() => {
          const idx = BLOCKS_ORDERED.indexOf(currentBlock)
          setCurrentBlock(BLOCKS_ORDERED[(idx + 1) % BLOCKS_ORDERED.length])
          setButtonDisabled(true)
        }}>{currentBlock!=BLOCK_TYPE.FINISH
            ? "NEXT"
            : "MENU"
        }</button>
      </div>
    </>
  )
}

export default App
