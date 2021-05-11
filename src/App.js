import React, { useState } from 'react'

const App = () => {
  const [num, setNum] = useState(1)

    const sumar = () => setNum(num+1)
    const restar = () => setNum(num-1)
    return (
      <>
        <h1>{num}</h1>
        <button onClick={sumar}>Sumar</button>
        <button onClick={restar}>Restar</button>
      </>
    );
}

export default App