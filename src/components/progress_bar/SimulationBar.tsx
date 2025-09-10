import NodeProgressBar from "./NodeProgressBar.tsx";

interface SimulationBarProps {
  currentStep: number
}

export default function SimulationBar({currentStep}: SimulationBarProps) {
  return <NodeProgressBar currentStep={currentStep}/>
}