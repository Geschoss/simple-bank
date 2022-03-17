import { sample, createEvent } from 'effector';
import { fetchTransactions } from './transactions';

const paginate = createEvent<number>();

sample({
  source: paginate,
  fn: (page) => ({ page }),
  target: fetchTransactions,
});

export { paginate };
