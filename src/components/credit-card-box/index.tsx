import React, { useMemo } from 'react';

import './style.scss';

const CARDS = {
  visa: '^4',
  masterCard: '^5[1-5]',
  discover: '6011',
};

const COINS = {
  eGold: 'EGLD',
  Bitcoin: 'BTC',
};

interface CardProp {
  cardNumber: any;
  cardCryptoType: any;
  cardHolder: any;
  cardMonth: any;
  cardYear: any;
  cardCvv: any;
  isCardFlipped: any;
}

function Card(props: CardProp) {
  const {
    cardNumber,
    cardCryptoType,
    cardHolder,
    cardMonth,
    cardYear,
    cardCvv,
    isCardFlipped,
  } = props;

  const chipType = (cardNumber: any) => {
    const number = cardNumber;
    let re;

    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) != null) {
        return card;
      }
    }

    return 'visa';
  };

  // const coinType = (cardCryptoType: any) => {
  //   const coin = cardCryptoType;
  //   let re;

  //   for (const [card, pattern] of Object.entries(COINS)) {
  //     re = new RegExp(pattern);
  //     if (coin.match(re) != null) {
  //       return card;
  //     }
  //   }

  //   return 'EGLD'; //default type
  // };

  const cardBackgroundName = () => {
    if (cardCryptoType === 'Bitcoin') {
      return `${'Bitcoin'}.png`;
    } else {
      return `${'eGold'}.png`;
    }
  };

  const BACKGROUND_IMG = cardBackgroundName();

  const useChipType = useMemo(() => {
    return chipType(cardNumber);
  }, [cardNumber]);

  // const useCoinType = useMemo(() => {
  //   console.log(cardCryptoType);
  //   return coinType(cardCryptoType);
  // }, [cardCryptoType]);

  const maskCardNumber = (cardNumber: string) => {
    const cardNumberArray = cardNumber.split('');
    cardNumberArray.forEach((val, index) => {
      if (index > 5 && index < 12) {
        if (cardNumberArray[index] != ' ') {
          cardNumberArray[index] = '*';
        }
      }
    });
    return cardNumberArray;
  };

  return (
    <div className={'card-item ' + (isCardFlipped ? 'flipped' : '')}>
      <div className='card-item_side -front'>
        <div className='card-item_cover'>
          <img
            src={`/card-background/${BACKGROUND_IMG}`}
            alt={BACKGROUND_IMG}
          />
        </div>
        <div className='card-item_wrapper'>
          <div className='card-item_top'>
            <div className='card-item_coin'>
              <img
                src={`/crypto-type/${cardCryptoType}.svg`}
                alt={cardCryptoType}
                className='crypto-coin'
              />
              <span className='coin-name'>{cardCryptoType}</span>
            </div>
            <img
              src={`/chip-type/${useChipType}.svg`}
              alt={useChipType}
              className='chip-type'
            />
          </div>

          <div className='card-item_number'>
            <label>CARD NUMBER</label>
            {cardNumber ? (
              maskCardNumber(cardNumber).map((val, index) => (
                <span className='card-item_number_digit fade-in' key={index}>
                  {val}
                </span>
              ))
            ) : (
              <span className='card-item_number_digit'>#</span>
            )}
          </div>

          <div className='card-item_separator' />

          <div className='card-item_content'>
            <div className='card-item_name'>
              <label>CARD HOLDER</label>

              {cardHolder ? (
                cardHolder
                  .split('')
                  .map(
                    (
                      val: boolean | string | null | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <span
                        className='card-item_name_letter fade-in'
                        key={index}
                      >
                        {val}
                      </span>
                    )
                  )
              ) : (
                <span className='card-item_name_placeholder'>Card holder</span>
              )}
            </div>

            <div className='card-item_date'>
              {!cardMonth ? (
                <span className='date-placeholder'>MM</span>
              ) : (
                <span className='slide-in-blurred-top'>{cardMonth}</span>
              )}
              {!cardMonth && !cardYear ? (
                <span className='date-placeholder'>/</span>
              ) : (
                <span>/</span>
              )}

              {!cardYear ? (
                <span className='date-placeholder'>YY</span>
              ) : (
                <span className='slide-in-blurred-top'>
                  {cardYear.substring(2, 4)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='card-item_side -back'>
        <div className='card-item_cover'>
          <img
            src={`/card-background/${BACKGROUND_IMG}`}
            alt={BACKGROUND_IMG}
          />
        </div>

        <div className='card-item_band' />
        <div className='card-item_cvv'>
          <div className='card-item_cvvTitle'>CVV</div>
          <div className='card-item_cvvBand'>
            {cardCvv
              .split('')
              .map((val: any, index: React.Key | null | undefined) => (
                <span key={index}>*</span>
              ))}
          </div>

          <div className='card-item_type -back'>
            <div className='card-item_id'>
              <label>CARD UNIQUE ID</label>
              <span className='card-item_id_text'>
                {`#${cardCryptoType.toUpperCase()}${cardNumber.substring(
                  0,
                  6
                )}${cardHolder
                  .replace(/\s/g, '')
                  .substring(0, 4)
                  .toUpperCase()}${cardNumber.substring(10, 16)}${cardHolder
                  .replace(/\s/g, '')
                  .substring(4, 7)
                  .toUpperCase()}`}
              </span>
            </div>
            <div className='card-type'>
              <img src={`/chip-type/${useChipType}.svg`} alt='useChipType' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
