import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

import './style.scss';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className='back_button'>
      <IoMdArrowRoundBack />
      <span>click to go back</span>
    </button>
  );
}
