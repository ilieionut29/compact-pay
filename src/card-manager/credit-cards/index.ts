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
        id: 'card-1',
        cardNumber: '3455 4562 7710 3507',
        cardCryptoType: 'EGLD',
        cardHolder: 'John Carter',
        cardMonth: '01',
        cardYear: '2023',
        cardCvv: '1111',
        cardBalance: '11.324$'
      },
      {
        id: 'card-2',
        cardNumber: '523 1111 1111 11111',
        cardCryptoType: 'BTC',
        cardHolder: 'John Doe',
        cardMonth: '02',
        cardYear: '2024',
        cardCvv: '2222',
        cardBalance: '11.324$'

      },

      {
        id: 'card-3',
        cardNumber: '6011111111111111',
        cardCryptoType: 'BTC',
        cardHolder: 'John Doe',
        cardMonth: '02',
        cardYear: '2024',
        cardCvv: '2222',
        cardBalance: '11.324$'

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
