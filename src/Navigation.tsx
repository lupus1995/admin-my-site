import React from 'react';
import { NavLink as Link, Routes, Route } from 'react-router-dom';
import { Home, Test } from './pages';

const Navigation = () => {
  return (
    <>
      <div>Урлы</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Домашаняя</Link>
          </li>
          <li>
            <Link to='/test'>Тестовая</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  );
};

export default Navigation;
