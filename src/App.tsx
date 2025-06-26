
import { Button } from '@/components/ui/button'
import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Count: {count}</p>
      <Button onClick={() => setCount((count) => count + 1)}>Button</Button>
    </>
  )
}

export default App
