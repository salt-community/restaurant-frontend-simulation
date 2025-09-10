import './App.css'
import SimulationBar from "./components/SimulationBar.tsx";
import {type JSX, useState} from "react";
import OrderBlock from "./components/OrderBlock.tsx";
import PaymentBlock from "./components/PaymentBlock.tsx";
import AdressBlock from "./components/AdressBlock.tsx";
import KitchenBlock from "./components/KitchenBlock.tsx";
import DeliveryBlock from "./components/DeliveryBlock.tsx";
import FinishBlock from "./components/FinishBlock.tsx";

type BlockType = "ORDER" | "PAYMENT" | "ADRESS" | "KITCHEN" | "DELIVERY" | "FINISH"

const BLOCK_TYPE: Record<BlockType, BlockType> = {
  ORDER: 'ORDER',
  PAYMENT: 'PAYMENT',
  ADRESS: 'ADRESS',
  KITCHEN: 'KITCHEN',
  DELIVERY: 'DELIVERY',
  FINISH: 'FINISH',
} as const;


function App() {
  const [currentBlock, setCurrentBlock] = useState<BlockType>(BLOCK_TYPE.ORDER)
  const blockTypeMapToComponent: Record<BlockType, JSX.Element> = {
    ORDER: <OrderBlock/>,
    PAYMENT: <PaymentBlock/>,
    ADRESS: <AdressBlock/>,
    KITCHEN: <KitchenBlock/>,
    DELIVERY: <DeliveryBlock/>,
    FINISH: <FinishBlock/>,
  }
  const blockTypeMapToNextBlockType: Record<BlockType, BlockType> = {
    ORDER: BLOCK_TYPE.PAYMENT,
    PAYMENT: BLOCK_TYPE.ADRESS,
    ADRESS: BLOCK_TYPE.KITCHEN,
    KITCHEN: BLOCK_TYPE.DELIVERY,
    DELIVERY: BLOCK_TYPE.FINISH,
    FINISH: BLOCK_TYPE.ORDER,
  }
  return (
    <>
      <h1>Restaurant Title</h1>
      <SimulationBar/>

      <div className="CurrentBlock">
        {
          blockTypeMapToComponent[currentBlock]
        }
        <br/>
        <button onClick={() => setCurrentBlock(blockTypeMapToNextBlockType[currentBlock])}>Next</button>
      </div>
    </>
  )
}

export default App
