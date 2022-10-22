import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, SignIn, SignUp } from './pages';
import 'react-toastify/dist/ReactToastify.css';
import './resetDefaultStylesBrowsers.css';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />}/>
    </Routes>
  );
}
