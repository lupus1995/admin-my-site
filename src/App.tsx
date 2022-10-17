import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, SignUp } from './pages';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
  );
}
