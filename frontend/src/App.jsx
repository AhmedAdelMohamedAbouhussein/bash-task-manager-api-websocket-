import {Routes, Route} from 'react-router-dom'
import Monitor from "./pages/monitor/Monitor.jsx";
import Report from "./pages/reports/Reports.jsx";
import CPU from "./pages/cpu/CPU.jsx"
import Disk from "./pages/disk/Disk.jsx"
import GPU from "./pages/gpu/GPU.jsx"
import Network from "./pages/network/Network.jsx"
import RAM from "./pages/ram/RAM.jsx"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Monitor />} />
      <Route path="/report" element={<Report />} />

      <Route path="/cpu" element={<CPU />} />
      <Route path="/disk" element={<Disk />} />
      <Route path="/gpu" element={<GPU />} />
      <Route path="/network" element={<Network />} />
      <Route path="/ram" element={<RAM />} />
    </Routes>
  )
}

export default App
