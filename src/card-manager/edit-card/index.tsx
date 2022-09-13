import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {
  CreditCard,
  fetchCreditCardList,
  updateLocalStorageCards,
} from '../credit-cards';
import Card from '../../components/credit-card-box';
import BackButton from '../../components/back-button';
import CardFrom from '../../components/card-form';

import './style.scss';

const initialState: CreditCard = {
  id: '',
  cardNumber: '',
  cardCryptoType: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  cardBalance: '',
};

export default function EditCard() {
  const { id: parmId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<CreditCard>(initialState);
  const [cardsData, setCardsData] = useState<CreditCard[]>([]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parmId]);

  async function fetchData() {
    const cards: CreditCard[] = await fetchCreditCardList();
    setCardsData(cards);
    if (cards && cards.length > 0) {
      const selectedCard = cards.find((card) => card.id === parmId);
      setState(selectedCard ?? initialState);
    }
  }

  const updateStateValues = useCallback(
    (keyName: any, value: any) => {
      setState({
        ...state,
        [keyName]: value || '',
      });
    },
    [state]
  );

  function handleSubmitAction() {
    try {
      const cards: CreditCard[] = cardsData;
      const selectedCard: CreditCard =
        cards.find((card) => card.id === parmId) ?? initialState;
      const selectedCardIndex = cards.indexOf(selectedCard);
      cards[selectedCardIndex] = state;
      updateLocalStorageCards(cards);
      navigate('/');
    } catch (error: any) {
      alert(error);
      console.log(error);
    }
  }

  function handleDeleteAction() {
    try {
      const cards: CreditCard[] = cardsData;
      const selectedCard: CreditCard =
        cards.find((card) => card.id === parmId) ?? initialState;
      const selectedCardIndex = cards.indexOf(selectedCard);
      cards.splice(selectedCardIndex, 1);
      updateLocalStorageCards(cards);
      navigate('/');
    } catch (error: any) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <>
      <BackButton />
      <div className='edit-wrapper'>
        <CardFrom
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
        </CardFrom>
        <div className='action'>
          <button className='action-remove' onClick={handleShow}>
            Remove card
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Remove card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this card from your wallet?
          </Modal.Body>
          <Modal.Footer>
            <button className='modal-action_close' onClick={handleClose}>
              Close
            </button>
            <button
              className='modal-action_remove'
              onClick={handleDeleteAction}
            >
              Remove
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
