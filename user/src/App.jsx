import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import RegisterPage from './components/Register/RegisterPage'
import Navbar1 from './components/Navbar/Navbar1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar1/>
     <Outlet/>
    
    </>
  )
}

export default App
