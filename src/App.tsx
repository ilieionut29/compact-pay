import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cards from './card-manager/cards';
import AddCard from './card-manager/add-card';
import EditCard from './card-manager/edit-card';
import NavBar from './components/navbar';

import './style/style.scss';
import './style/animation.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/add-card' element={<AddCard />} />
          <Route path='/cards/:id/edit' element={<EditCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
