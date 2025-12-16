import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate  = useNavigate();
  return (
    <div className='border border-red-500 flex justify-between items-center p-2 underline text-xl font-bold text-blue-600'>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/html')}>Html</button>
        {/* <button onClick={() => navigate('/css')}>Css</button>
        <button onClick={() => navigate('/js')}>Js</button>
        <button className='border border-red-500' onClick={() => navigate('/react')}>React</button>
        <button onClick={() => navigate('/ai')}>Ai</button>
        <button onClick={() => navigate('/dsa')}>Dsa</button> */}
        <button onClick={() => navigate('/jobs')}>Jobs</button>
        <button onClick={() => navigate('/links')}>Links</button>
    </div>
  )
}

export default Navbar