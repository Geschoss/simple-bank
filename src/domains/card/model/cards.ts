import {
  sample,
  createStore,
  createEffect,
  createEvent,
} from 'effector';
import { Pagination } from 'domains/common';
import { api } from 'shared';
import { Card } from '../typings';

type CardsFilter = Partial<
  Pick<Card, 'cardID' | 'cardAccount' | 'currency' | 'status'> & {
    page: number;
  }
>;

const init = createEvent();
const reset = createEvent();
const fetchCards = createEvent<CardsFilter>();

const fetchCardsFx = createEffect((filters?: CardsFilter) =>
  api.post<Pagination<Card>>('/cards', filters)
);

const $store = createStore<{
  cards: Card[];
  page: number;
  loading: boolean;
  pageCount: number;
}>({ cards: [], loading: false, page: 0, pageCount: 0 })
  .on(fetchCardsFx, (state) => ({
    ...state,
    loading: true,
  }))
  .on(fetchCardsFx.doneData, (_, { data, page, pageCount }) => ({
    loading: false,
    cards: data,
    page,
    pageCount,
  }))
  .reset(reset);

sample({
  clock: fetchCards,
  target: fetchCardsFx,
});

sample({
  source: init,
  fn: () => ({}),
  target: fetchCards,
});

export { $store, reset, init, fetchCards };
