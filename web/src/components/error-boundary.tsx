import React, { Component } from 'react';

const initialState = { hasError: false };
type State = typeof initialState;

class ErrorBoundary extends Component<{}, State> {
  state = { hasError: false };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError)
      return <div>Something went wrong. Please try refreshing the app.</div>;

    return this.props.children;
  }
}

export default ErrorBoundary;
