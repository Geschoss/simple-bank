import { Transaction } from 'domains/transaction/typings';
import { Card } from 'domains/card/typings';
import { User } from 'domains/user/typings';
import { fakerSDK } from 'shared/lib';
import { random, array } from 'shared/lib/helpers';

const faker = fakerSDK();
const NAMES = ['Garnett Hintz', 'Devyn Gibson', 'Tito Ward'];
const PER_PAGE = 10;
const CARDS_COUNT = 10;
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
  20
);

const fullName = faker.enums(NAMES);
const cardAccount = faker
  .array(faker.int(20000, 500000), USERCS_COUNT)
  .generate();
const cardIDs = faker
  .array(faker.int(200, 500), CARDS_COUNT)
  .generate();

const users = faker
  .array(
    faker.object<User>({
      fullName,
      cardAccount: faker.enums(cardAccount),
    }),
    USERCS_COUNT
  )
  .generate();
const cardsMock = faker
  .array(
    faker.object<Card>({
      cardID: faker.enums(cardIDs),
      cardAccount: faker.enums(cardAccount),
      maskedCardNumber: faker.enums(maskedCardNumbers),
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
  '/cards': (_, { page = 1, cardAccount }) => {
    const cards = cardsMock.filter(
      (transaction) => transaction.cardAccount === cardAccount
    );

    return {
      page,
      pageCount: Math.ceil(cards.length / PER_PAGE),
      data: cards.slice((page - 1) * PER_PAGE, page * PER_PAGE),
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
  '/transactions': (_, { page = 1, cardAccount }) => {
    const transactions = transactionsMock.filter(
      (transaction) => transaction.cardAccount === cardAccount
    );

    return {
      page,
      pageCount: Math.ceil(transactions.length / PER_PAGE),
      data: transactions.slice(
        (page - 1) * PER_PAGE,
        page * PER_PAGE
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
