import {
  sample,
  createEffect,
  createEvent,
  createStore,
  combine,
} from 'effector';
import { api } from 'shared';
import { fetchCards } from './cards';
import { updateState } from './utils';

type Filters = {
  cardID: number[];
  currency: string[];
  status: string[];
};
type Store = { loading: boolean; filters: Filters };

const initialStore = {
  loading: false,
  filters: {
    cardID: [],
    currency: [],
    status: [],
  },
};

const fetchFilters = createEvent();
const fetchFiltersFx = createEffect(() =>
  api.post<Filters>('/filters/cards')
);

const $store = createStore<Store>(initialStore)
  .on(fetchFiltersFx, (state) => ({ ...state, loading: true }))
  .on(fetchFiltersFx.doneData, (_, filters) => ({
    loading: false,
    filters,
  }));

sample({
  source: fetchFilters,
  target: fetchFiltersFx,
});

const statusChanged = createEvent<string>();
const cardIDCahnged = createEvent<string>();
const currencyChanged = createEvent<string>();

const $statusValues = createStore<string[]>([]).on(
  statusChanged,
  updateState
);
const $currencyValues = createStore<string[]>([]).on(
  currencyChanged,
  updateState
);
const $cardIDValues = createStore<string[]>([]).on(
  cardIDCahnged,
  updateState
);

const $selectedFiltersCount = combine(
  $statusValues,
  $currencyValues,
  $cardIDValues,
  (...stores) =>
    stores.reduce(
      (acc, filter) => (filter.length > 0 ? acc + 1 : acc),
      0
    )
);

const $filtersValues = combine(
  $statusValues,
  $currencyValues,
  $cardIDValues,
  (status, currency, cardID) => {
    let filters: Record<string, any> = {};
    if (status.length > 0) {
      filters.status = status;
    }
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
  target: fetchCards,
});

export {
  $store,
  fetchFilters,
  statusChanged,
  $statusValues,
  $currencyValues,
  $cardIDValues,
  cardIDCahnged,
  $filtersValues,
  currencyChanged,
  $selectedFiltersCount,
};
