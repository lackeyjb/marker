import { useCallback, useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useAuthStore } from '../stores/auth-store';

export function useAuth() {
  const { isLoading, error, loadProfile, user } = useAuthStore(
    useCallback(
      state => ({
        isLoading: state.status === 'idle' || state.status === 'pending',
        error: state.error,
        loadProfile: state.actions.profile,
        user: state.user,
      }),
      []
    ),
    shallow
  );

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    isLoading,
    error,
    user,
  };
}
