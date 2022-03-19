import { random } from 'shared/lib/helpers';
import { cardsMock, transactionsMock, users } from './mocks';

const TRANSACTION_PER_PAGE = 10;
const CARDS_PER_PAGE = 9;

const makeArrayValues = (filters, [key, value]) => ({
  ...filters,
  [key]: Array.from(value),
});

// server logic
const fakeEndpoinst = {
  '/user': () => {
    const index = random.int(0, users.length);
    return users[index];
  },

  '/filters/transactions': (_, { cardAccount }) => {
    // make unique filters values
    return Object.entries(
      transactionsMock
        .filter(
          (transaction) => transaction.cardAccount === cardAccount
        )
        .reduce(
          (filters, { cardID, currency }) => {
            filters.cardID.add(cardID);
            filters.currency.add(currency);
            return filters;
          },
          {
            cardID: new Set(),
            currency: new Set(),
          }
        )
    ).reduce(makeArrayValues, {});
  },

  '/filters/cards': (_, { cardAccount }) => {
    // make unique filters values
    return Object.entries(
      cardsMock
        .filter((card) => card.cardAccount === cardAccount)
        .reduce(
          (filters, { cardID, cardAccount, currency, status }) => {
            filters.cardID.add(cardID);
            filters.cardAccount.add(cardAccount);
            filters.currency.add(currency);
            filters.status.add(status);
            return filters;
          },
          {
            cardID: new Set(),
            cardAccount: new Set(),
            currency: new Set(),
            status: new Set(),
          }
        )
    ).reduce(makeArrayValues, {});
  },

  '/card': (_, { id, cardAccount }) =>
    cardsMock
      .filter((card) => card.cardAccount === cardAccount)
      .find((card) => card.cardID === id),

  '/cards': (
    _,
    { page = 1, cardAccount, status, currency, cardID }
  ) => {
    const cards = cardsMock.filter((card) => {
      if (card.cardAccount !== cardAccount) {
        return false;
      }

      if (currency && !currency.includes(card.currency)) {
        return false;
      }

      if (status && !status.includes(card.status)) {
        return false;
      }
      if (cardID && !cardID.includes(card.cardID)) {
        return false;
      }
      return true;
    });

    return {
      page,
      pageCount: Math.ceil(cards.length / CARDS_PER_PAGE),
      data: cards.slice(
        (page - 1) * CARDS_PER_PAGE,
        page * CARDS_PER_PAGE
      ),
    };
  },

  '/transaction': (_, { id, cardAccount }) => {
    return transactionsMock
      .filter(
        (transaction) => transaction.cardAccount === cardAccount
      )
      .find((transaction) => transaction.transactionID === id);
  },

  '/transactions': (
    _,
    { page = 1, cardAccount, currency, cardID, date, amount }
  ) => {
    const transactions = transactionsMock.filter((transaction) => {
      if (transaction.cardAccount !== cardAccount) {
        return false;
      }

      if (currency && !currency.includes(transaction.currency)) {
        return false;
      }

      if (cardID && !cardID.includes(transaction.cardID)) {
        return false;
      }

      if (date) {
        const [from, to] = date;
        const transactionTime = transaction.transactionDate.getTime();
        if (from !== '') {
          const fromTime = new Date(from).getTime();
          if (transactionTime < fromTime) {
            return false;
          }
        }

        if (to !== '') {
          const fromTime = new Date(to).getTime();
          if (transactionTime > fromTime) {
            return false;
          }
        }
      }

      if (amount) {
        const [from, to] = amount;

        if (from !== '') {
          const fromAmount = parseInt(from, 10);
          if (transaction.amount < fromAmount) {
            return false;
          }
        }

        if (to !== '') {
          const fromAmount = parseInt(to, 10);
          if (transaction.amount < fromAmount) {
            return false;
          }
        }
      }

      return true;
    });

    return {
      page,
      pageCount: Math.ceil(
        transactions.length / TRANSACTION_PER_PAGE
      ),
      data: transactions.slice(
        (page - 1) * TRANSACTION_PER_PAGE,
        page * TRANSACTION_PER_PAGE
      ),
    };
  },
};

export const fakeAxios = {
  post<R>(url: string, payload: Record<string, any> = {}) {
    const endpoin = fakeEndpoinst[url];
    if (!endpoin) {
      throw new Error(`Cant find endpoints ${url}`);
    }
    const response: R = endpoin(url, payload);
    const timeout = random.int(200, 700);
    return new Promise<R>((res) => {
      setTimeout(() => {
        console.log({ url, response, payload, timeout });
        res(response);
      }, timeout);
    });
  },
};
