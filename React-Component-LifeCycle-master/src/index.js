import React from "react";
import ReactDOM from "react-dom";
import { onErrorResumeNext } from "rxjs";

class ErrorCatcher extends React.Component {
  state = { error: null };

  componentDidCatch(error, info) {
    console.log("[componentDidCatch]", error);
    this.setState({ error: info.componentStack });
  }

  render() {
    if (this.state.error) {
      return <div>An error occured: {this.state.error}</div>;
    }
    return this.props.children;
  }
}

class LifeCycle extends React.Component {
  // Inititalize state first
  //(happens before constructor)
  state = { counter: 0 };

  //the first method called after initializing state
  constructor(props) {
    super(props);
  }

  //called after initial render is donne
  componentDidMount() {
    console.log("[Component]", "Mounted");
  }

  // Dont forget to make it static
  //called before initial render, and any time
  // new props are received.
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("[getDerivedStateFromProps");
    console.log("Next props: ", nextProps);
    console.log(" Prev State: ", prevState);
    return null;
  }

  //called before each render. return false to prevent rendering.

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[shouldComponentUpdate]", "Deciding to Update");
    console.log("Next props: ", nextProps);
    console.log(" Next State: ", nextState);
    return true;
  }

  // Called after render() bubt before updating the DOM
  // A good tim e to make calculations based on old DOM nodes.
  // THe value returned is passed into componentDidUpdate

  getSnapshotBeforeUpdate(nextProps, nextState) {
    console.log("[getSnapshotBeforeUpdate]", "About to Update");
    return `Time is ${Date.now()}`;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[componentDidUpdate]", "Updated.");
    console.log("Prev props: ", prevProps);
    console.log(" Prev State: ", prevState);
    console.log("snapshot:", snapshot);
  }

  componentWillUnmount() {
    console.log("[componentWillUnmount", "Goodbye World");
  }

  causeErrorNextRender = () => {
    this.setState({
      causeError: true
    });
  };

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    if (this.state.causeError) {
      throw new Error("oh no!!");
    }

    return (
      <div>
        <span> Counter: {this.state.counter}</span>
        <button onClick={this.handleClick}>Click to increment</button>
        <button onClick={this.causeErrorNextRender}>Throw an error</button>
      </div>
    );
  }
}

ReactDOM.render(
  <ErrorCatcher>
    <LifeCycle />
  </ErrorCatcher>,
  document.querySelector("#root")
);
