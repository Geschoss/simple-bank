import {
  sample,
  createStore,
  createEffect,
  createEvent,
} from 'effector';
import { debounce } from 'patronum';
import { api } from 'shared';
import { Transaction } from '../typings';

const reset = createEvent();
const fetch = createEvent<number>();

const fetchTransactionFx = createEffect((id: number) =>
  api.post<Transaction>('/transaction', { id })
);

const $store = createStore<{
  loading: boolean;
  data: Transaction | null;
}>({ data: null, loading: false })
  .on(fetchTransactionFx, (state) => ({
    ...state,
    loading: true,
  }))
  .on(fetchTransactionFx.doneData, (_, data) => ({
    loading: false,
    data,
  }))
  .reset(reset);

sample({
  source: debounce({ source: fetch, timeout: 200 }),
  target: fetchTransactionFx,
});

export { $store, reset, fetch };