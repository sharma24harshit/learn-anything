
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
      <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    </Routes>
<h1 className="text-5xl font-bold text-green-600">
      Tailwind CSS 3.4.3 is working 🚀
    </h1>
    </>
  )
}

export default App
