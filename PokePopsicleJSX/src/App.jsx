import { useState } from 'react'
import './App.css'
import PokePopsicle from './pages/PokePopsicle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello world</h1>
      <PokePopsicle/>
    </>
  )
}

export default App
