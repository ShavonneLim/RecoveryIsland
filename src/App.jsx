import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ConciergeVilla from './pages/ConciergeVilla'
import MoodDiaryCentre from './pages/MoodDiaryCentre'
import MindfulnessVilla from './pages/MindfulnessVilla'
import RelaxationVilla from './pages/RelaxationVilla'
import WellnessVilla from './pages/WellnessVilla'
import InspirationVilla from './pages/InspirationVilla'
import AIChatbot from './pages/AIChatbot'
import EmotionScales from './pages/EmotionScales'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concierge" element={<ConciergeVilla />} />
        <Route path="/mood-diary" element={<MoodDiaryCentre />} />
        <Route path="/mindfulness" element={<MindfulnessVilla />} />
        <Route path="/relaxation" element={<RelaxationVilla />} />
        <Route path="/wellness" element={<WellnessVilla />} />
        <Route path="/inspiration" element={<InspirationVilla />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route path="/emotion-scales" element={<EmotionScales />} />
      </Routes>
    </BrowserRouter>
  )
}