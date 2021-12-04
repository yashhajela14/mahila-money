import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import Posts from "./components/Posts";

class App extends React.Component {
  render() {
    return (
      <div>
        <Posts />
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
