import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { CreditCard } from '../../card-manager/credit-cards';

interface CardFormProps {
  selectedCreditCard: CreditCard;
  onUpdateState: any;
  setIsCardFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitAction: () => void;
  children: any;
}

const monthsArray = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? '0' + month : month;
});
const currentYear = new Date().getFullYear();
const yearsArray = Array.from({ length: 9 }, (_x, i) => currentYear + i);

const coins = ['Bitcoin', 'eGold'];

export default function CardFrom(props: CardFormProps) {
  const [ccNumber, setCcNumber] = useState('');

  const [errors, setErrors] = useState<CreditCard>({
    id: '',
    cardNumber: '',
    cardCryptoType: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
  });

  const {
    selectedCreditCard,
    onUpdateState,
    setIsCardFlipped,
    handleSubmitAction,
    children,
  } = props;

  const handleFormChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    onUpdateState(name, value);
  };

  const handleFormChangeNumbers = (event: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = event.target;
    if (isNaN(Number(value))) return;
    onUpdateState(name, value);
  };

  const isFormHasErrors = () => {
    const newErrors: CreditCard = {
      id: '',
      cardNumber: '',
      cardCryptoType: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    };

    let isErrorFlag = false;
    Object.keys(newErrors).forEach(function (key: any) {
      const keyPair = key as keyof CreditCard;
      const displayableKeyName = key.toLowerCase().replace('card', 'Card');

      if (!selectedCreditCard[keyPair]) {
        newErrors[keyPair] = `${displayableKeyName} value required.`;
        isErrorFlag = true;
      } else {
        newErrors[keyPair] = '';
        isErrorFlag = false;
      }
    });
    if (isErrorFlag) {
      setErrors(newErrors);
      return isErrorFlag;
    }

    if (selectedCreditCard['cardNumber'].length !== 16) {
      newErrors.cardNumber = 'Card number should be 16 digits';
      isErrorFlag = true;
    } else if (selectedCreditCard['cardCvv'].length !== 4) {
      newErrors.cardCvv = 'Card cvv should be 4 digits';
      isErrorFlag = true;
    }

    setErrors(newErrors);
    return isErrorFlag;
  };

  const onCvvFocus = () => {
    setIsCardFlipped(true);
  };

  const onCvvBlur = () => {
    setIsCardFlipped(false);
  };

  const handleConfirmAction = (e: any) => {
    if (!isFormHasErrors()) {
      handleSubmitAction();
    }
  };

  return (
    <div className='card-form'>
      <div className='card-list'>{children}</div>

      <div className='card-form__inner'>
        <div className='card-input'>
          <label htmlFor='cardNumber' className='card-input__label'>
            Card number
          </label>
          <Form.Control
            type='text'
            name='cardNumber'
            className='card-input__input'
            autoComplete='off'
            onChange={handleFormChangeNumbers}
            maxLength={16}
            value={selectedCreditCard.cardNumber}
            isInvalid={!!errors.cardNumber}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.cardNumber}
          </Form.Control.Feedback>
        </div>

        <div className='card-input'>
          <label htmlFor='cardName' className='card-input__label'>
            Card holder name
          </label>
          <Form.Control
            type='text'
            name='cardHolder'
            className='card-input__input'
            autoComplete='off'
            onChange={handleFormChange}
            maxLength={25}
            value={selectedCreditCard.cardHolder}
            isInvalid={!!errors.cardHolder}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.cardHolder}
          </Form.Control.Feedback>
        </div>

        <div className='card-form__row'>
          <div className='card-form__group'>
            <label htmlFor='cardMonth' className='card-input__label'>
              Expiration date
            </label>
            <Form.Control
              as='select'
              className='card-input__input -select'
              value={selectedCreditCard.cardCryptoType}
              name='cardCryptoType'
              onChange={handleFormChange}
              isInvalid={!!errors.cardCryptoType}
            >
              <option value='' disabled>
                COIN
              </option>

              {coins.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              {errors.cardCryptoType}
            </Form.Control.Feedback>
          </div>
        </div>

        <div className='card-form__row'>
          <div className='card-form__col'>
            <div className='card-form__group'>
              <label htmlFor='cardMonth' className='card-input__label'>
                Expiration date
              </label>
              <Form.Control
                as='select'
                className='card-input__input -select'
                value={selectedCreditCard.cardMonth}
                name='cardMonth'
                onChange={handleFormChange}
                isInvalid={!!errors.cardMonth}
              >
                <option value='' disabled>
                  Month
                </option>

                {monthsArray.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.cardMonth}
              </Form.Control.Feedback>
              <Form.Control
                as='select'
                className='card-input__input -select'
                value={selectedCreditCard.cardYear}
                name='cardYear'
                onChange={handleFormChange}
                isInvalid={!!errors.cardYear}
              >
                <option value='' disabled>
                  Year
                </option>

                {yearsArray.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.cardYear}
              </Form.Control.Feedback>
            </div>
          </div>

          <div className='card-form__col -cvv'>
            <div className='card-input'>
              <label htmlFor='cardCVV' className='card-input__label'>
                CVV (Securty code)
              </label>
              <Form.Control
                type='text'
                name='cardCvv'
                className='card-input__input'
                autoComplete='off'
                onChange={handleFormChangeNumbers}
                maxLength={4}
                value={selectedCreditCard.cardCvv}
                isInvalid={!!errors.cardCvv}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.cardCvv}
              </Form.Control.Feedback>
            </div>
          </div>
        </div>

        <div className='card-form__row'>
          <div className='card-form__col'>
            <div className='d-grid gap-2'>
              <button onClick={handleConfirmAction}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
