'use client'

import { FC } from "react"

import Grid from "@/components/Grid"
import PanelExploration from "@/components/PanelExploration"
import PanelSendRobot from "@/components/PanelSendRobot"
import PanelSurface from "@/components/PanelSurface"

const App: FC = () => (
  <div className="relative w-screen h-screen overscroll-contain">
    <Grid />
    <div className="absolute left-12 bottom-12 w-[450px]">
      <PanelSendRobot />
    </div>
    <div className="absolute right-12 bottom-12 w-[450px]">
      <PanelExploration />
    </div>
    <div className="absolute top-12 right-12 w-[450px]">
      <PanelSurface />
    </div>
  </div>
)

export default App
