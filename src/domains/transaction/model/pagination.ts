import { sample, createEvent } from 'effector';
import { $filtersValues } from './filters';
import { fetchTransactions } from './transactions';

const paginate = createEvent<number>();

sample({
  source: $filtersValues,
  clock: paginate,
  fn: (filters, page) => ({ ...filters, page }),
  target: fetchTransactions,
});

export { paginate };
