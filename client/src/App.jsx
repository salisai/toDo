import React from 'react'
import Background from './components/Background'
import Foreground from './components/Foreground'

const App = () => {
  return (
    <div className='w-full relative h-screen bg-zinc-800'>
        <Background/>
        <Foreground/>
    </div>
  )
}

export default App