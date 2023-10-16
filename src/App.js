// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import HomePage from './components/pages/HomePage';
// import SignInPage from './components/pages/SignInPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signin" element={<SignInPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Simple React Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
