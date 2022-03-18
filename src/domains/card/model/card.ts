import {
  sample,
  createStore,
  createEffect,
  createEvent,
} from 'effector';
import { api } from 'shared';
import { Card } from '../typings';

const reset = createEvent();
const fetch = createEvent<number>();

const fetchCardFx = createEffect((id: number) =>
  api.post<Card>('/card', { id })
);

const $store = createStore<{
  loading: boolean;
  card: Card | null;
}>({ card: null, loading: false })
  .on(fetchCardFx, (state) => ({
    ...state,
    loading: true,
  }))
  .on(fetchCardFx.doneData, (_, card) => ({
    loading: false,
    card,
  }))
  .reset(reset);

sample({
  source: fetch,
  target: fetchCardFx,
});

export { $store, reset, fetch };
