import React from 'react';
import { useState } from 'react';
import { CreditCard } from '../../card-manager/credit-cards';
import { Form, FloatingLabel } from 'react-bootstrap';

import './style.scss';
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

const coins = ['Bitcoin', 'eGold', 'Ethereum', 'Cardano', 'Solana', 'Tether', 'XRP'];

export default function CardFrom(props: CardFormProps) {
  const [isBalanceValid, setIsBalanceValid] = useState(true);

  const [errors, setErrors] = useState<CreditCard>({
    id: '',
    cardNumber: '',
    cardCryptoType: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    cardBalance: '',
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
    onUpdateState(name, value.toUpperCase());
  };

  const handleFormChangeCrypto = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    onUpdateState(name, value);
  };

  const handleFormChangeNumbers = (event: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = event.target;
    const clearNumber = value.replaceAll(' ', '');
    const withSpace = clearNumber.replace(/\d{4}(?=.)/g, '$& ');

    if (isNaN(Number(clearNumber))) return;
    onUpdateState(name, withSpace);
  };

  const handleFormChangeBalance = (event: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = event.target;
    const withoutCurrency = value.replace('$', '');
    const withoutComma = withoutCurrency.replace(',', '');
    const withCurrency = `$${withoutComma.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    )}`;
    const reg = /^[0-9\b]+$/;

    if (!reg.test(withoutComma)) {
      setIsBalanceValid(false);
    } else {
      setIsBalanceValid(true);
    }

    onUpdateState(name, withCurrency);
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
      cardBalance: '',
    };

    let isErrorFlag = false;
    Object.keys(newErrors).forEach(function (key: any) {
      const keyPair = key as keyof CreditCard;
      let displayableKeyName = key;

      if (!selectedCreditCard[keyPair]) {
        if (displayableKeyName === 'cardNumber') {
          displayableKeyName = 'Card number';
        } else if (displayableKeyName === 'cardHolder') {
          displayableKeyName = 'Card holder';
        } else if (displayableKeyName === 'cardCryptoType') {
          displayableKeyName = 'Crypto coin';
        } else if (displayableKeyName === 'cardBalance') {
          displayableKeyName = 'Card balance';
        } else if (displayableKeyName === 'cardMonth') {
          displayableKeyName = 'Expiration month';
        } else if (displayableKeyName === 'cardYear') {
          displayableKeyName = 'Expiration year';
        } else if (displayableKeyName === 'cardCvv') {
          displayableKeyName = 'CVV/CVC';
        }

        newErrors[keyPair] = `${displayableKeyName} value is required`;
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

    if (!isBalanceValid) {
      newErrors.cardBalance = 'Card balance should contain only digits';
      isErrorFlag = true;
    }

    if (selectedCreditCard['cardNumber'].length !== 19) {
      newErrors.cardNumber = 'Card number should be 16 digits';
      isErrorFlag = true;
    } else if (selectedCreditCard['cardCvv'].length !== 4) {
      newErrors.cardCvv = 'Card CVV/CVC should be 4 digits';
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

  const handleConfirmAction = () => {
    if (!isFormHasErrors()) {
      handleSubmitAction();
    }
  };

  return (
    <>
      <div className='card-form'>
        <div className='card-list'>{children}</div>
        <div className='card-form_wrapper'>
          <FloatingLabel label='Card number'>
            <Form.Control
              id='floatingInputCustom'
              type='text'
              name='cardNumber'
              className='card-form_input'
              autoComplete='off'
              onChange={handleFormChangeNumbers}
              maxLength={19}
              value={selectedCreditCard.cardNumber}
              isInvalid={!!errors.cardNumber}
              placeholder='Card number'
            />
            <Form.Control.Feedback type='invalid'>
              {errors.cardNumber}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label='Card holder'>
            <Form.Control
              type='text'
              name='cardHolder'
              className='card-form_input'
              autoComplete='off'
              onChange={handleFormChange}
              maxLength={25}
              value={selectedCreditCard.cardHolder}
              isInvalid={!!errors.cardHolder}
              placeholder='Card holder'
            />
            <Form.Control.Feedback type='invalid'>
              {errors.cardHolder}
            </Form.Control.Feedback>
          </FloatingLabel>

          <div className='card-form_helper'>
            <FloatingLabel controlId='floatingSelect' label='Card month'>
              <Form.Select
                aria-label='Card month'
                value={selectedCreditCard.cardMonth}
                name='cardMonth'
                className='card-form_input'
                onChange={handleFormChange}
                isInvalid={!!errors.cardMonth}
              >
                {monthsArray.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.cardMonth}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId='floatingSelect' label='Card year'>
              <Form.Select
                aria-label='Card year'
                value={selectedCreditCard.cardYear}
                name='cardYear'
                className='card-form_input'
                onChange={handleFormChange}
                isInvalid={!!errors.cardYear}
              >
                {yearsArray.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.cardYear}
              </Form.Control.Feedback>
            </FloatingLabel>
          </div>

          <FloatingLabel
            controlId='floatingSelect'
            label='Select your crypto coin'
          >
            <Form.Select
              aria-label='Select your crypto coin'
              value={selectedCreditCard.cardCryptoType}
              name='cardCryptoType'
              className='card-form_input'
              onChange={handleFormChangeCrypto}
              isInvalid={!!errors.cardCryptoType}
            >
              <option value='' disabled>
                Crypto coin
              </option>
              {coins.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {errors.cardCryptoType}
            </Form.Control.Feedback>
          </FloatingLabel>

          <div className='card-form_helper'>
            <FloatingLabel label='Card balance'>
              <Form.Control
                id='floatingInputCustom'
                type='text'
                name='cardBalance'
                className='card-form_input'
                autoComplete='off'
                onChange={handleFormChangeBalance}
                maxLength={8}
                value={selectedCreditCard.cardBalance}
                isInvalid={!!errors.cardBalance}
                placeholder='Card number'
              />
              <Form.Control.Feedback type='invalid'>
                {errors.cardBalance}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label='CVV/CVC'>
              <Form.Control
                type='text'
                name='cardCvv'
                className='card-form_input'
                autoComplete='off'
                onChange={handleFormChangeNumbers}
                maxLength={4}
                value={selectedCreditCard.cardCvv}
                isInvalid={!!errors.cardCvv}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
                placeholder='CVV/CVC'
              />
              <Form.Control.Feedback type='invalid'>
                {errors.cardCvv}
              </Form.Control.Feedback>
            </FloatingLabel>
          </div>

          <button onClick={handleConfirmAction} className='card-form_btn'>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
