import React, { useState } from 'react';
import { useCallback } from 'react';
import CardForm from '../../components/card-form';
import { CreditCard, updateLocalStorageCards } from '../credit-cards';
import Card from '../../components/credit-card-box';

import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
const initialState: CreditCard = {
  id: '',
  cardNumber: '',
  cardCryptoType: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
};

export default function AddCard() {
  const navigate = useNavigate();
  const [state, setState] = useState<CreditCard>(initialState);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const updateStateValues = useCallback(
    (keyName: any, value: any) => {
      setState({
        ...state,
        [keyName]: value || '',
      });
    },
    [state]
  );

  const handleSubmitAction = () => {
    try {
      let newCardsList: CreditCard[] = [];

      if (localStorage.getItem('cards')) {
        const storageCards = JSON.parse(localStorage.getItem('cards') ?? '');
        newCardsList = storageCards ? [...storageCards] : [];
      }

      newCardsList.push({
        ...state,
        id: uuid(),
      });

      updateLocalStorageCards(newCardsList);
      navigate('/');
    } catch (error: any) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <>
      <CardForm
        selectedCreditCard={state}
        onUpdateState={updateStateValues}
        setIsCardFlipped={setIsCardFlipped}
        handleSubmitAction={handleSubmitAction}
      >
        <Card
          cardNumber={state.cardNumber}
          cardCryptoType={state.cardCryptoType}
          cardHolder={state.cardHolder}
          cardMonth={state.cardMonth}
          cardYear={state.cardYear}
          cardCvv={state.cardCvv}
          isCardFlipped={isCardFlipped}
        ></Card>
      </CardForm>
    </>
  );
}
