import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditCard() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-1)}>Go back</button>
      <h1>EDIT CARD</h1>
    </>
  );
}
