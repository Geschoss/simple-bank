import {
  sample,
  createEffect,
  createEvent,
  createStore,
  combine,
} from 'effector';
import { api } from 'shared';
import { fetchTransactions } from './transactions';
import {
  calculateFilters,
  makeFilterPayload,
  RangePayload,
  updateRange,
  updateState,
} from './utils';

type Filters = {
  cardID: number[];
  currency: string[];
  date: [string, string];
  amount: [string, string];
};

type Store = { loading: boolean; filters: Filters };

const initialStore = {
  loading: false,
  filters: {
    cardID: [],
    currency: [],
    date: ['', ''],
    amount: ['', ''],
  } as Filters,
};

const fetchFilters = createEvent();
const fetchFiltersFx = createEffect(() =>
  api.post<Filters>('/filters/transactions')
);

const $filters = createStore<Store>(initialStore)
  .on(fetchFiltersFx, (state) => ({ ...state, loading: true }))
  .on(fetchFiltersFx.doneData, (_, filters) => ({
    loading: false,
    filters,
  }));

sample({
  source: fetchFilters,
  target: fetchFiltersFx,
});

const cardSelected = createEvent<string>();

const cardIDCahnged = createEvent<string>();
const currencyChanged = createEvent<string>();
const dateChanged = createEvent<RangePayload>();
const amountChanged = createEvent<RangePayload>();

const $currencyValues = createStore<string[]>([])
  .on(currencyChanged, updateState)
  .reset(cardSelected);

const $cardIDValues = createStore<string[]>([])
  .on(cardIDCahnged, updateState)
  .on(cardSelected, (_, cardID) => [cardID]);

const $dateValues = createStore(['', ''])
  .on(dateChanged, updateRange)
  .reset(cardSelected);

const $amountValues = createStore(['', ''])
  .on(amountChanged, updateRange)
  .reset(cardSelected);

const $selectedFiltersCount = combine(
  $currencyValues,
  $cardIDValues,
  $dateValues,
  $amountValues,
  calculateFilters
);

const $filtersValues = combine(
  $currencyValues,
  $cardIDValues,
  $dateValues,
  $amountValues,
  makeFilterPayload
);

sample({
  source: $filtersValues,
  target: fetchTransactions,
});

export {
  $filters,
  dateChanged,
  $dateValues,
  fetchFilters,
  cardSelected,
  $cardIDValues,
  cardIDCahnged,
  $amountValues,
  amountChanged,
  $filtersValues,
  $currencyValues,
  currencyChanged,
  $selectedFiltersCount,
};
