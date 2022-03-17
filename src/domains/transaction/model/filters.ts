import { sample, createEvent } from 'effector';
import { fetchTransactions } from './transactions';

const filtrate = createEvent<number>();

sample({
  source: filtrate,
  fn: (page) => ({ page }),
  target: fetchTransactions,
});

export { filtrate };
