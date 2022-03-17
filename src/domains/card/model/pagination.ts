import { sample, createEvent } from 'effector';
import { fetchCards } from './cards';

const paginate = createEvent<number>();

sample({
  source: paginate,
  fn: (page) => ({ page }),
  target: fetchCards,
});

export { paginate };
