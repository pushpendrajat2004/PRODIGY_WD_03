import React, { useState, useRef } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0) // time in milliseconds
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10) // hundredths
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`
  }

  const start = () => {
    if (!isRunning) {
      setIsRunning(true)
      const startTime = Date.now() - time
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10) // update every 10ms
    }
  }

  const stop = () => {
    if (isRunning) {
      setIsRunning(false)
      clearInterval(intervalRef.current)
    }
  }

  const reset = () => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
    setTime(0)
  }

  return (
    <div className="container">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default App
