import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, fetchCreditCardList } from '../credit-cards';
import CreditCardBox from '../../components/credit-card-box';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import NavBar from '../../components/navbar';
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
    <NavBar />
      <h1>Your cards</h1>
      {cardsData.length === 0 && (
        <>
          <h1>No card exist, go to add card.</h1>
          <Link to='/add-card'>Add card</Link>
        </>
      )}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}

      >
        {cardsData.map((card: CreditCard, id) => (
          <SwiperSlide key={id}>
            <Link key={id} to={`cards/${card.id}/edit`}>
              <span>{card.cardBalance}</span>
              <CreditCardBox
                cardNumber={card.cardNumber}
                cardCryptoType={card.cardCryptoType}
                cardHolder={card.cardHolder}
                cardMonth={card.cardMonth}
                cardYear={card.cardYear}
                cardCvv={card.cardCvv}
                isCardFlipped={false}
              ></CreditCardBox>

              <span>Card info</span>
              <span>Remove card</span> <span>EDIT CARD</span>
              <span>Card balance: {card.cardBalance}</span>
              <span>Card number: {card.cardNumber}</span>
              <span>Card holder: {card.cardHolder}</span>
              <span>Card crypto coin: {card.cardCryptoType}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <Link to='/add-card'>Add card</Link>
      </div>
    </>
  );
}
