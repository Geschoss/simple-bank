import { sample, createStore, createEffect } from 'effector';
import { createGate } from 'effector-react';
import { api } from 'shared';
import { User } from '../typings';

const userGate = createGate();
const fetchUserFx = createEffect(() => {
  // TODO some auth logick
  return api.post<User>('/user').then((user) => {
    api.setToken(user.cardAccount);
    return user;
  });
});

const $store = createStore<{ loading: boolean; user: User | null }>({
  user: null,
  loading: false,
})
  .on(fetchUserFx, (state) => ({ ...state, loading: true }))
  .on(fetchUserFx.doneData, (_, user) => ({
    user,
    loading: false,
  }));

sample({
  clock: userGate.open,
  target: fetchUserFx,
});

export { userGate, $store };
