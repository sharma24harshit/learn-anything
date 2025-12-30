import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`navbar-container border border-red-500 flex justify-between items-center mt-1 rounded-2xl bg-card_bg p-4 text-xl font-bold text-blue-600 ${isScrolled ? 'scrolled' : ''}`}>
      <button className="navbar-button" onClick={() => navigate('/')}>Home</button>
      <button className="navbar-button" onClick={() => navigate('/html')}>Html</button>
      <button className="navbar-button" onClick={() => navigate('/css')}>Css</button>
      <button className="navbar-button" onClick={() => navigate('/js')}>Js</button>
      <button className="navbar-button" onClick={() => navigate('/react')}>React</button>
      {/* <button className="navbar-button" onClick={() => navigate('/ai')}>Ai</button> */}
      <button className="navbar-button" onClick={() => navigate('/dsa')}>Dsa</button>
      <button className="navbar-button" onClick={() => navigate('/jobs')}>Jobs</button>
      <button className="navbar-button" onClick={() => navigate('/links')}>Links</button>
    </div>
  )
}

export default Navbar
