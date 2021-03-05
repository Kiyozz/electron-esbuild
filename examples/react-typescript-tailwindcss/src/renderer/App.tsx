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
    <div>
      <h1>Count {count}</h1>

      <div>Hello world!</div>
      <div>Fast full page reload from esbuild.</div>
      <div>
        It was possible to use Tailwind thanks to the postcss esbuild plugin. Because compilation goes through postcss,
        compilation speed is increased.
      </div>
    </div>
  )
}
