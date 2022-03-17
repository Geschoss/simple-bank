import {
  sample,
  createStore,
  createEffect,
  createEvent,
} from 'effector';
import { debounce } from 'patronum';
import { api } from 'shared';
import { Pagination } from 'domains/common';
import { Transaction } from '../typings';

type TransactionFilter = Partial<
  Pick<
    Transaction,
    | 'cardID'
    | 'cardAccount'
    | 'amount'
    | 'currency'
    | 'transactionDate'
  > & { page: number }
>;

const init = createEvent();
const reset = createEvent();
const fetchTransactions = createEvent<TransactionFilter>();

const fetchTransactionsFx = createEffect(
  (filters?: TransactionFilter) =>
    api.post<Pagination<Transaction>>('/transactions', filters)
);

const $store = createStore<
  Pagination<Transaction> & {
    loading: boolean;
  }
>({ data: [], loading: false, page: 0, pageCount: 0 })
  .on(fetchTransactionsFx, (state) => ({
    ...state,
    loading: true,
  }))
  .on(
    fetchTransactionsFx.doneData,
    (_, { data, page, pageCount }) => ({
      loading: false,
      data,
      page,
      pageCount,
    })
  )
  .reset(reset);

sample({
  clock: debounce({ source: fetchTransactions, timeout: 200 }),
  target: fetchTransactionsFx,
});

sample({
  source: init,
  fn: () => ({}),
  target: fetchTransactions,
});

export { $store, reset, init, fetchTransactions };
