import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WarningMessage from './components/warning';

import Cards from './card-manager/cards';
import AddCard from './card-manager/add-card';
import EditCard from './card-manager/edit-card';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/effect-creative';
import './style/style.scss';
import './style/animation.scss';

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
      <WarningMessage />
    </>
  );
};

export default App;
