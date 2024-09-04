import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error);
    console.error("Error info:", errorInfo);

    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="glass-effect max-w-md w-full shadow-lg rounded-lg overflow-hidden p-6 text-center">
            <h1 className="text-2xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="text-gray-700 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page or contact support if the issue persists.
            </p>
            {/* Conditionally render error details */}
            {error && (
              <div className="text-left text-gray-600 mb-4">
                <details>
                  <summary className="cursor-pointer text-blue-600">View Error Details</summary>
                  <p>{error.toString()}</p>
                  <pre>{errorInfo ? errorInfo.componentStack : 'No additional information available'}</pre>
                </details>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
