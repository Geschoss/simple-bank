import { sample, createEvent } from 'effector';
import { fetchCards } from './cards';
import { $filtersValues } from './filters';

const paginate = createEvent<number>();

sample({
  source: $filtersValues,
  clock: paginate,
  fn: (filters, page) => ({ ...filters, page }),
  target: fetchCards,
});

export { paginate };
