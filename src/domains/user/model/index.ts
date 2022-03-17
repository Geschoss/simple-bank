import {
  sample,
  createStore,
  createEffect,
} from 'effector';
import { createGate } from 'effector-react';
import { api } from 'shared';
import { User } from '../typings';

const EMPTY_USER: User = {
  fullName: '',
  cardAccount: -1,
};

const userGate = createGate();
const fetchUserFx = createEffect(() => {
  // TODO some auth logick
  return api.post<User>('/user');
});

const $user = createStore<User>(EMPTY_USER).on(
  fetchUserFx.doneData,
  (_, user) => user
);

sample({
  clock: userGate.open,
  target: fetchUserFx,
});

const isUserLoading = (user) => user.cardAccount < 0;

export { userGate, $user, isUserLoading };
