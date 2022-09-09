import { NavLink } from 'react-router-dom';

import './style.scss';

export default function NavBar() {
  return (
    <nav className='navbar'>
      <img
        src='./logo/logo.svg'
        alt='crypto-pay-logo'
        className='navbar_logo'
      />

      <NavLink className='navbar_item' to='/add-card'>
        Add card
      </NavLink>
    </nav>
  );
}
