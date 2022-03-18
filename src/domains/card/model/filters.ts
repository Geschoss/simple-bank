import {
  sample,
  createEffect,
  createEvent,
  createStore,
} from 'effector';
import { api } from 'shared';

type Filters = {
  cardID: number[];
  cardAccount: number[];
  currency: string[];
  status: string[];
};
type Store = { loading: boolean; filters: Filters };

const initialStore = {
  loading: false,
  filters: {
    cardID: [],
    cardAccount: [],
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

export { fetchFilters, $store };
