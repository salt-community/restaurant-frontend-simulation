import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import App from "@/components/App.tsx";

export const Route = createFileRoute('/')({
  component: App,
})
