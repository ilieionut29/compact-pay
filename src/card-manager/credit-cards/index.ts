export interface CreditCard {
  id: string;
  cardNumber: string;
  cardCryptoType: string;
  cardHolder: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
  cardBalance: string;
}

export interface AddEditCard extends CreditCard {
  isCardFlipped: boolean;
}

export class CreditCardAPI {
  async fetchCreditCardList(): Promise<CreditCard[]> {
    const apiData: CreditCard[] = [
      {
        id: 'test-card-1',
        cardNumber: '3455 4562 7710 3507',
        cardCryptoType: 'eGold',
        cardHolder: 'David Michael',
        cardMonth: '11',
        cardYear: '2023',
        cardCvv: '4322',
        cardBalance: '$23.159',
      },
      {
        id: 'test-card-2',
        cardNumber: '5485 8845 3422 4359',
        cardCryptoType: 'Bitcoin',
        cardHolder: 'William Jacob',
        cardMonth: '06',
        cardYear: '2024',
        cardCvv: '1949',
        cardBalance: '$285.953',
      },
    ];

    let creditCardsList: CreditCard[] = [];
    if (localStorage.getItem('cards')) {
      const localStorageData: CreditCard[] = JSON.parse(
        localStorage.getItem('cards') ?? ''
      );
      creditCardsList = [...localStorageData];
    } else {
      creditCardsList = [...apiData];
      updateLocalStorageCards(creditCardsList);
    }

    return creditCardsList;
  }
}

export async function fetchCreditCardList(): Promise<CreditCard[]> {
  const api = new CreditCardAPI();
  return api.fetchCreditCardList();
}

export function updateLocalStorageCards(cards: CreditCard[]) {
  localStorage.setItem('cards', JSON.stringify(cards));
}
