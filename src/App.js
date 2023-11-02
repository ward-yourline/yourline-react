import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import LandingPage from './components/pages/LandingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='landing' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
