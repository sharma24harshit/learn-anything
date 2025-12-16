
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home Page/Home'
import JobsPage from './pages/Jobs Page/JobsPage'
import Css from './pages/Css Page/Css'
import Dsa from './pages/Dsa Page/Dsa'
import Ai from './pages/Ai Page/Ai'
import Html from './pages/Html Page/Html'
import Javascript from './pages/Javascript Page/Javascript'
import LinksPage from './pages/Links Page/LinksPage'
import ReactPage from './pages/React Page/ReactPage'
import Navbar from './components/Navbar/Navbar'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<Ai />} />
      <Route path="/dsa" element={<Dsa />} />
      <Route path="/html" element={<Html />} />
      <Route path="/css" element={<Css />} />
      <Route path="/js" element={<Javascript />} />
      <Route path="/react" element={<ReactPage />} />
      <Route path="/links" element={<LinksPage />} />
      <Route path="/jobs" element={<JobsPage />} />
    </Routes>
    
    <Navbar />
<h1 className="text-5xl font-bold text-green-600">
      Tailwind CSS 3.4.3 is working 🚀
    </h1>
    </>
  )
}

export default App
