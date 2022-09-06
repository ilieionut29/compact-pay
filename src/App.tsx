import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cards from './card-manager/cards';
import AddCard from './card-manager/add-card';
import EditCard from './card-manager/edit-card';
import NavBar from './components/navbar';

import './style/style.scss';
import './style/animation.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/add-card' element={<AddCard />} />
          <Route path='/edit-card' element={<EditCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
