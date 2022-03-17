import { Transaction } from 'domains/transaction/typings';
import { User } from 'domains/user/typings';
import { fakerSDK } from 'shared/lib';

const faker = fakerSDK();

const names = ['Garnett Hintz', 'Devyn Gibson', 'Tito Ward'];
const merchantInfo = [
  'Schinner - Wiegand',
  'Macejkovic Inc',
  'Koch, Trantow and Sanford',
  'Gorgeous Rubber Keyboard',
  'Sausages',
];
const currency = ['AZN', 'EUR', 'USD'];
const fullName = faker.enums(names);
const cardAccount = faker.int(20000, 500000).generate();
const cardIDs = faker.array(faker.int(200, 500), 3).generate();

// public
export const user = faker
  .object<User>({
    fullName,
    cardAccount: faker.constant(cardAccount),
  })
  .generate();

export const transactions = faker
  .array(
    faker.object<Transaction>({
      cardID: faker.enums(cardIDs),
      transactionID: faker.index(),
      cardAccount: faker.constant(cardAccount),
      amount: faker.float(-23232.2, 23232.32, 2),
      currency: faker.enums(currency),
      transactionDate: faker.date(
        '2021-01-01T00:00:00.000Z',
        '2019-01-01T00:00:00.000Z'
      ),
      merchantInfo: faker.enums(merchantInfo),
    }),
    74
  )
  .generate()
  .sort(
    (t1, t2) =>
      t2.transactionDate.getTime() - t1.transactionDate.getTime()
  );
