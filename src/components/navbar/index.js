import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
      <>
        <NavLink to='/'>Home</NavLink>  
        <NavLink to='/add-card'>Add card</NavLink>  
        <NavLink to='/edit-card'>Edit-card</NavLink>  
      </>
    )
}
