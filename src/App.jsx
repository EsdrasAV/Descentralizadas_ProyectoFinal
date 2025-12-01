import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import Shop from './components/shop.jsx'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Shop />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
