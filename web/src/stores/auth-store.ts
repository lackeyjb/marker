import { queryCache } from 'react-query';
import { create } from './middleware';
import { auth } from '../api';

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

type AuthStore = {
  status: Status;
  user: auth.User | null;
  error: string | null;
  actions: {
    profile: () => Promise<void>;
    login: (params: auth.UserParams) => Promise<void>;
    logout: () => void;
    signup: (params: auth.UserParams) => Promise<void>;
  };
};

export const useAuthStore = create<AuthStore>(set => {
  const action = async <T extends Function>(userFn: T) => {
    try {
      set(state => void (state.status = 'pending'));
      const user: auth.User = await userFn();
      set(state => {
        state.status = 'resolved';
        state.user = user;
      });
    } catch (e) {
      set(state => {
        state.status = 'rejected';
        state.error = e.response?.data?.message ?? 'Something went wrong';
      });
    }
  };

  return {
    status: 'idle',
    user: null,
    error: null,
    actions: {
      profile: () => action(auth.getProfile),
      login: (params: auth.UserParams) => action(() => auth.login(params)),
      logout: () => {
        auth.logout();
        queryCache.clear();
        set(state => void (state.user = null));
      },
      signup: (params: auth.UserParams) => action(() => auth.signup(params)),
    },
  };
}, 'authStore');
