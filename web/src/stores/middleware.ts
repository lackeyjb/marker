import produce from 'immer';
import createFn, { State, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type Config<T extends State> = StateCreator<
  T,
  (fn: (draft: T) => void) => void
>;

export const immer = <T extends State>(config: Config<T>): StateCreator<T> => (
  set,
  get,
  api
) => config(fn => set(produce(fn) as (state: T) => T), get, api);

export const create = <T extends State>(
  config: Config<T>,
  storeName?: string
) => createFn(devtools(immer(config), storeName));
