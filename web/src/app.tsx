import React, { ReactText, useRef } from 'react';
import { toast } from 'react-toastify';

import FullPageSpinner from './components/full-page-spinner';
import { useAuth } from './hooks/use-auth';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

function App() {
  const { isLoading, user, error } = useAuth();
  const toastId = useRef<ReactText | null>(null);

  if (isLoading) return <FullPageSpinner />;

  // There's only going to be one toast at a time here because the user can only
  // either login or signup at this point.
  if (error && !toastId.current) {
    toastId.current = toast.error(error);
  }

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
