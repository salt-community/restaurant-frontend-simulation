import './App.css'
import SimulationBar from "./components/SimulationBar.tsx";
import {type JSX, useState} from "react";
import OrderBlock from "./components/OrderBlock.tsx";
import PaymentBlock from "./components/PaymentBlock.tsx";
import AdressBlock from "./components/AdressBlock.tsx";
import KitchenBlock from "./components/KitchenBlock.tsx";
import DeliveryBlock from "./components/DeliveryBlock.tsx";
import FinishBlock from "./components/FinishBlock.tsx";
import {type BlockType, BLOCK_TYPE, BLOCKS_ORDERED} from "./types/blocks.tsx";

function App() {
  const [currentBlock, setCurrentBlock] = useState<BlockType>(BLOCK_TYPE.ORDER)
  const currentStep = BLOCKS_ORDERED.indexOf(currentBlock)
  const blockTypeMapToComponent: Record<BlockType, JSX.Element> = {
    ORDER: <OrderBlock/>,
    PAYMENT: <PaymentBlock/>,
    ADRESS: <AdressBlock/>,
    KITCHEN: <KitchenBlock/>,
    DELIVERY: <DeliveryBlock/>,
    FINISH: <FinishBlock/>,
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
        <button onClick={() => {
          const idx = BLOCKS_ORDERED.indexOf(currentBlock)
          setCurrentBlock(BLOCKS_ORDERED[(idx + 1) % BLOCKS_ORDERED.length])
        }}>Next</button>
      </div>
    </>
  )
}

export default App
