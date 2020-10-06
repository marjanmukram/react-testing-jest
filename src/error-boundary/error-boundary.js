import React from "react";
import { reportError } from "./api";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    reportError(error, info);
  }

  tryAgain = () => this.setState({ hasError: false });

  render() {
    return this.state.hasError ? (
      <>
        <div role='alert'>There was a problem.</div>
        <button onClick={this.tryAgain}>Try Again?</button>
      </>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
