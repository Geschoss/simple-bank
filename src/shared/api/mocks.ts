import { Transaction } from 'domains/transaction/typings';
import { Card } from 'domains/card/typings';
import { User } from 'domains/user/typings';
import { fakerSDK } from 'shared/lib';
import { array } from 'shared/lib/helpers';

const faker = fakerSDK();
const CARDS_COUNT = 20;
const TRANSACTION_COUNT = 100;
const NAMES = ['Garnett Hintz'];
const USERS_COUNT = NAMES.length;
const merchantInfo = [
  'Schinner - Wiegand',
  'Macejkovic Inc',
  'Koch, Trantow and Sanford',
  'Gorgeous Rubber Keyboard',
  'Sausages',
];
const currency = ['AZN', 'EUR', 'USD'];
const status = ['active', 'blocked'];
const fullName = faker.enums(NAMES);
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

const cardAccount = faker
  .uniqueArray(faker.int(20000, 500000), USERS_COUNT)
  .generate();
const cardIDs = faker
  .uniqueArray(faker.int(200, 500), CARDS_COUNT)
  .generate();

export const users = faker
  .array(
    faker.object<User>({
      fullName,
      cardAccount: faker.unique(cardAccount),
    }),
    USERS_COUNT
  )
  .generate();

export const cardsMock = faker
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

export const transactionsMock = faker
  .array(
    faker.object<Transaction>({
      cardID: faker.enums(cardIDs),
      transactionID: faker.index(),
      cardAccount: faker.enums(cardAccount),
      amount: faker.float(-23232.2, 23232.32, 2),
      currency: faker.enums(currency),
      transactionDate: faker.date(
        '2022-03-01T00:00:00.000Z',
        '2019-01-01T00:00:00.000Z'
      ),
      merchantInfo: faker.enums(merchantInfo),
    }),
    TRANSACTION_COUNT
  )
  .generate()
  .sort(
    (t1, t2) =>
      t2.transactionDate.getTime() - t1.transactionDate.getTime()
  );
