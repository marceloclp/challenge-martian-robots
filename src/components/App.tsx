'use client'

import { FC } from "react"

import Grid from "@/components/Grid"
import PanelSendRobot from "@/components/PanelSendRobot"

const App: FC = () => (
  <div className="relative w-screen h-screen overscroll-contain">
    <Grid />
    <div className="absolute left-12 bottom-12 w-[400px]">
      <PanelSendRobot />
    </div>
  </div>
)

export default App
