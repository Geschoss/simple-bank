import { Transaction } from 'domains/transaction/typings';
import { Card } from 'domains/card/typings';
import { User } from 'domains/user/typings';
import { fakerSDK } from 'shared/lib';
import { random, array } from 'shared/lib/helpers';

const faker = fakerSDK();
const NAMES = ['Garnett Hintz'];
const TRANSACTION_PER_PAGE = 10;
const CARDS_PER_PAGE = 9;
const CARDS_COUNT = 30;
const USERCS_COUNT = NAMES.length;

const merchantInfo = [
  'Schinner - Wiegand',
  'Macejkovic Inc',
  'Koch, Trantow and Sanford',
  'Gorgeous Rubber Keyboard',
  'Sausages',
];
const currency = ['AZN', 'EUR', 'USD'];
const status = ['active', 'blocked'];
const maskedCardNumbers = array.make(
  () =>
    faker
      .array(
        faker.enums([
          '3581',
          '7755',
          '1410',
          '0486',
          '6011',
          '6212',
          '2540',
          '3255',
        ]),
        4
      )
      .generate()
      .join('-'),
  CARDS_COUNT
);

const fullName = faker.enums(NAMES);
const cardAccount = faker
  .uniqueArray(faker.int(20000, 500000), USERCS_COUNT)
  .generate();
const cardIDs = faker
  .uniqueArray(faker.int(200, 500), CARDS_COUNT)
  .generate();

const users = faker
  .array(
    faker.object<User>({
      fullName,
      cardAccount: faker.unique(cardAccount),
    }),
    USERCS_COUNT
  )
  .generate();

const cardsMock = faker
  .array(
    faker.object<Card>({
      cardID: faker.unique(cardIDs),
      cardAccount: faker.enums(cardAccount),
      maskedCardNumber: faker.unique(maskedCardNumbers),
      expireDate: faker.date(
        '2021-01-01T00:00:00.000Z',
        '2035-01-01T00:00:00.000Z'
      ),
      // TODO need think about depending mocks
      currency: faker.enums(currency),
      status: faker.enums(status),
      balance: faker.float(0, 2342344.23, 2),
    }),
    CARDS_COUNT
  )
  .generate();

const transactionsMock = faker
  .array(
    faker.object<Transaction>({
      cardID: faker.enums(cardIDs),
      transactionID: faker.index(),
      cardAccount: faker.enums(cardAccount),
      amount: faker.float(-23232.2, 23232.32, 2),
      currency: faker.enums(currency),
      transactionDate: faker.date(
        '2021-01-01T00:00:00.000Z',
        '2019-01-01T00:00:00.000Z'
      ),
      merchantInfo: faker.enums(merchantInfo),
    }),
    100
  )
  .generate()
  .sort(
    (t1, t2) =>
      t2.transactionDate.getTime() - t1.transactionDate.getTime()
  );

const fakeEndpoinst = {
  user: null,
  '/filters/transactions': (_, { cardAccount }) => {
    const transactions = transactionsMock.filter(
      (transaction) => transaction.cardAccount === cardAccount
    );

    const filters = transactions.reduce(
      (filters, { cardID, currency }) => {
        filters.cardID.add(cardID);
        filters.currency.add(currency);
        return filters;
      },
      {
        cardID: new Set<number>(),
        currency: new Set<string>(),
      }
    );
    return {
      cardID: Array.from(filters.cardID),
      currency: Array.from(filters.currency),
    };
  },
  '/filters/cards': (_, { cardAccount }) => {
    const cards = cardsMock.filter(
      (card) => card.cardAccount === cardAccount
    );

    const filters = cards.reduce(
      (filters, { cardID, cardAccount, currency, status }) => {
        filters.cardID.add(cardID);
        filters.cardAccount.add(cardAccount);
        filters.currency.add(currency);
        filters.status.add(status);
        return filters;
      },
      {
        cardID: new Set<number>(),
        cardAccount: new Set<number>(),
        currency: new Set<string>(),
        status: new Set<string>(),
      }
    );

    return {
      cardID: Array.from(filters.cardID),
      cardAccount: Array.from(filters.cardAccount),
      currency: Array.from(filters.currency),
      status: Array.from(filters.status),
    };
  },
  '/card': (_, { id, cardAccount }) => {
    return cardsMock
      .filter((card) => card.cardAccount === cardAccount)
      .find((card) => card.cardID === id);
  },
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
  '/user': () => {
    const index = random.int(0, users.length);

    return users[index];
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
    { page = 1, cardAccount, currency, cardID }
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
    const timeout = random.int(200, 700);
    const response: R = endpoin(url, payload);
    console.log({ url, response, payload, timeout });
    return new Promise<R>((res) => {
      setTimeout(() => {
        res(response);
      }, timeout);
    });
  },
};
