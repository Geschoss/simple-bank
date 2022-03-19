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
};
type Store = { loading: boolean; filters: Filters };

const initialStore = {
  loading: false,
  filters: {
    cardID: [],
    currency: [],
  },
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

const $currencyValues = createStore<string[]>([])
  .on(currencyChanged, updateState)
  .reset(cardSelected);

const $cardIDValues = createStore<string[]>([])
  .on(cardIDCahnged, updateState)
  .on(cardSelected, (_, cardID) => [cardID]);

const $selectedFiltersCount = combine(
  $currencyValues,
  $cardIDValues,
  (...stores) =>
    stores.reduce(
      (acc, filter) => (filter.length > 0 ? acc + 1 : acc),
      0
    )
);

const $filtersValues = combine(
  $currencyValues,
  $cardIDValues,
  (currency, cardID) => {
    let filters: Record<string, any> = {};
    if (currency.length > 0) {
      filters.currency = currency;
    }
    if (cardID.length > 0) {
      filters.cardID = cardID.map((value) => parseInt(value, 10));
    }
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
  currencyChanged,
  $selectedFiltersCount,
};
