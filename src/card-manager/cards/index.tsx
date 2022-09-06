import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, fetchCreditCardList } from '../credit-cards';
import CreditCardBox from '../../components/credit-card-box';

export default function Cards() {
  const [cardsData, setCardsData] = useState<CreditCard[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const cards: CreditCard[] = await fetchCreditCardList();
    setCardsData(cards);
  }

  return (
    <>
      <h1>Your cards</h1>
      {cardsData.length === 0 && (
        <>
          <h1>No card exist, go to add card.</h1>
          <Link to='/add-card'>Add card</Link>
        </>
      )}

      {cardsData.map((card: CreditCard, id) => (
        <div key={id}>
          <Link key={id} to={`cards/${card.id}/edit`}>
            <CreditCardBox
              cardNumber={card.cardNumber}
              cardCryptoType={card.cardCryptoType}
              cardHolder={card.cardHolder}
              cardMonth={card.cardMonth}
              cardYear={card.cardYear}
              cardCvv={card.cardCvv}
              isCardFlipped={false}
            ></CreditCardBox>
          </Link>
        </div>
      ))}

      <div>
        <Link to='/add-card'>Add card</Link>
      </div>
    </>
  );
}
