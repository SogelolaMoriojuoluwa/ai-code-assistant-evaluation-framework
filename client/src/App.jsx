import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './component/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudies from './pages/CaseStudies'
import Clinic from './pages/Clinic'

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cases" element={<CaseStudies />} />
          <Route path="/clinic" element={<Clinic />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App