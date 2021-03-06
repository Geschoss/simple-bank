import {
  sample,
  createStore,
  createEffect,
  createEvent,
} from 'effector';
import { api } from 'shared';
import { Transaction } from '../typings';

const reset = createEvent();
const fetch = createEvent<number>();

const fetchTransactionFx = createEffect((id: number) =>
  api.post<Transaction>('/transaction', { id })
);

const $store = createStore<{
  loading: boolean;
  transaction: Transaction | null;
}>({ transaction: null, loading: false })
  .on(fetchTransactionFx, (state) => ({
    ...state,
    loading: true,
  }))
  .on(fetchTransactionFx.doneData, (_, transaction) => ({
    loading: false,
    transaction,
  }))
  .reset(reset);

sample({
  source: fetch,
  target: fetchTransactionFx,
});

export { $store, reset, fetch };
