import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, EffectCreative, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiShow, BiHide } from 'react-icons/bi';
import { TiArrowRightThick, TiArrowLeftThick } from 'react-icons/ti';
import { CreditCard, fetchCreditCardList } from '../credit-cards';
import NavBar from '../../components/navbar';
import CreditCardBox from '../../components/credit-card-box';
import LockButton from '../../components/lock-button';

import './style.scss';

export default function Cards() {
  const [cardsData, setCardsData] = useState<CreditCard[]>([]);
  const [cvvActive, setCvvActive] = useState(false);
  const [cardLocked, setCardLocked] = useState(false);

  const [cardLock, setCardLock] = useState({
    stage: 'INITIAL',
    text: 'Block wallet',
    progress: 0,
  });

  const inc = (progress: number) => {
    if (progress >= 100) {
      setCardLock({
        stage: 'DONE',
        text: cardLocked ? 'All cards was unblocked' : 'All cards was blocked',
        progress: 100,
      });

      setTimeout(() => {
        setCardLock({
          stage: 'INITIAL',
          text: cardLocked ? 'Block wallet' : 'Unblock wallet',
          progress: 0,
        });
      }, 2000);

      return;
    }

    const nextProgress = progress + 4;

    setCardLock({
      stage: 'PROGRESS',
      progress: nextProgress,
      text: `${nextProgress}%`,
    });

    setTimeout(() => inc(nextProgress), 200);
  };

  const lockCardHandler = () => {
    setCardLocked(!cardLocked);
    setCardLock({
      text: '0%',
      progress: 0,
      stage: 'PROGRESS',
    });

    setTimeout(() => inc(0), 200);
  };

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
      {cardsData.length === 0 && (
        <div className='empty-info'>
          <h1 className='empty-title'>Your wallet is empty </h1>
          <span className='empty-text'>
            You don't have any card added yet in your wallet. Click on ADD CARD
            to create a new card. You can edit, remove or block it any time when
            you want.
          </span>
          <span className='empty-text'>
            We offer support for three types of chip card and over 10 crypto
            coins, with different card background for every coin.
          </span>
        </div>
      )}
      {cardsData.length > 0 && (
        <>
          <span className='title'>Wallet collection</span>
          <div className='siwper-nav'>
            <div className='nav-btn prev' id="swiperPrevBtn">
              <TiArrowLeftThick />
            </div>
            <div className='nav-center'>slide between cards</div>
            <div className='nav-btn next' id="swiperNextBtn">
              <TiArrowRightThick />
            </div>
          </div>
          <Swiper
            modules={[EffectCreative, Navigation, A11y]}
            grabCursor={true}
            loop={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-120%', 0, -500],
              },
              next: {
                shadow: true,
                translate: ['120%', 0, -500],
              },
            }}
            navigation={{
              prevEl:"#swiperPrevBtn",
              nextEl: "#swiperNextBtn",
            }}
          >
            {cardsData.map((card: CreditCard, id) => (
              <SwiperSlide key={id}>
                <CreditCardBox
                  cardNumber={card.cardNumber}
                  cardCryptoType={card.cardCryptoType}
                  cardHolder={card.cardHolder}
                  cardMonth={card.cardMonth}
                  cardYear={card.cardYear}
                  cardCvv={card.cardCvv}
                  isCardFlipped={false}
                ></CreditCardBox>
                <div className='card-preview'>
                  <div className='action top'>
                    <LockButton
                      onClick={lockCardHandler}
                      stage={cardLock.stage}
                      progress={cardLock.progress}
                    >
                      {cardLock.text}
                    </LockButton>
                  </div>
                  <ul className='card-info'>
                    <li className='card-info_label'>
                      <div className='card-info_data'>Balance</div>
                      <div className='card-info_value color'>
                        {card.cardBalance}
                      </div>
                    </li>
                    <li className='card-info_label'>
                      <div className='card-info_data'>Card number</div>
                      <div className='card-info_value'>{card.cardNumber}</div>
                    </li>
                    <li className='card-info_label'>
                      <div className='card-info_data'>Holder name</div>
                      <div className='card-info_value'>{card.cardHolder}</div>
                    </li>
                    <li className='card-info_label'>
                      <div className='card-info_data'>Crypto coin</div>
                      <div className='card-info_value color'>
                        {card.cardCryptoType}
                      </div>
                    </li>
                    <li className='card-info_label'>
                      <div className='card-info_data'>Card unique ID</div>
                      <div className='card-info_value'>
                        {`#${card.cardCryptoType.toUpperCase()}${card.cardNumber.substring(
                          0,
                          6
                        )}${card.cardHolder
                          .replaceAll(' ', '')
                          .substring(0, 4)
                          .toUpperCase()}${card.cardNumber
                          .replaceAll(' ', '')
                          .substring(10, 16)}${card.cardHolder
                          .replaceAll(' ', '')
                          .substring(4, 7)
                          .toUpperCase()}`}
                      </div>
                    </li>
                    <li className='card-info_label'>
                      <div className='card-info_data'>Expiration date</div>
                      <div className='card-info_value'>
                        {card.cardMonth}/{card.cardYear}
                      </div>
                    </li>
                    <li className='card-info_label'>
                      <div className='card-info_data'>CVV/CVC</div>
                      <div className='card-info_value'>
                        {' '}
                        {cvvActive ? (
                          <>
                            <span>{card.cardCvv}</span>
                            <BiHide
                              className='icon'
                              onClick={() => setCvvActive(false)}
                            />
                          </>
                        ) : (
                          <>
                            <span>●●●●</span>
                            <BiShow
                              className='icon'
                              onClick={() => setCvvActive(true)}
                            />
                          </>
                        )}
                      </div>
                    </li>
                  </ul>
                  <div className='action bottom'>
                    <Link
                      to={`cards/${card.id}/edit`}
                      className='action-btn action-edit'
                    >
                      Edit card
                    </Link>
                    <Link
                      to={`cards/${card.id}/edit`}
                      className='action-btn action-remove'
                    >
                      Remove current card
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
}
