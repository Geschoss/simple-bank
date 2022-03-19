import {
  sample,
  createEffect,
  createEvent,
  createStore,
  combine,
} from 'effector';
import { api } from 'shared';
import { fetchTransactions } from './transactions';
import { updateState } from './utils';

type Filters = {
  cardID: number[];
  currency: string[];
  date: [string, string];
};
type Store = { loading: boolean; filters: Filters };

const initialStore = {
  loading: false,
  filters: {
    cardID: [],
    currency: [],
    date: ['', ''],
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
const dateChanged =
  createEvent<{ type: 'from' | 'to'; value: string }>();

const $currencyValues = createStore<string[]>([])
  .on(currencyChanged, updateState)
  .reset(cardSelected);

const $cardIDValues = createStore<string[]>([])
  .on(cardIDCahnged, updateState)
  .on(cardSelected, (_, cardID) => [cardID]);

const $dateValues = createStore<[string, string]>(['', ''])
  .on(dateChanged, ([from, to], { type, value }) => {
    if (type === 'from') {
      return [value, to];
    }
    return [from, value];
  })
  .reset(cardSelected);

const $selectedFiltersCount = combine(
  $currencyValues,
  $cardIDValues,
  $dateValues,
  (currencyValues, cardIDValues, [from, to]) => {
    let result = [currencyValues, cardIDValues].reduce(
      (acc, filter) => (filter.length > 0 ? acc + 1 : acc),
      0
    );
    if (from !== '') {
      result++;
    }
    if (to !== '') {
      result++;
    }
    return result;
  }
);

const $filtersValues = combine(
  $currencyValues,
  $cardIDValues,
  $dateValues,
  (currency, cardID, [from, to]) => {
    // TODO simplify
    let filters: Record<string, any> = {};
    if (currency.length > 0) {
      filters.currency = currency;
    }
    if (cardID.length > 0) {
      filters.cardID = cardID.map((value) => parseInt(value, 10));
    }
    if (from === '' && to === '') {
      return filters;
    }
    filters.date = [from, to];

    return filters;
  }
);

sample({
  source: $filtersValues,
  target: fetchTransactions,
});

export {
  $filters,
  fetchFilters,
  $cardIDValues,
  cardIDCahnged,
  $currencyValues,
  $filtersValues,
  cardSelected,
  $dateValues,
  dateChanged,
  currencyChanged,
  $selectedFiltersCount,
};
