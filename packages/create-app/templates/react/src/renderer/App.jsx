import React, { useEffect, useState } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="padding">
      <h1>Count {count}</h1>

      <div>Hello world!</div>
      <div>Fast full page reload from esbuild</div>
    </div>
  )
}
