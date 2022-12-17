import { NavLink } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';

import './style.scss';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <img
        src='./logo/logo.svg'
        alt='crypto-pay-logo'
        className='navbar_logo'
        width={250}
        height={52}
      />
      <NavLink className='navbar_item' to='/add-card'>
        Add card <FaLongArrowAltRight />
      </NavLink>
    </nav>
  );
};

export default NavBar;
