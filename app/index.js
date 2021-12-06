import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import "./index.css";
import Posts from "./components/Posts";

const Events = () => (
  <div>
    <h2>Events</h2>
  </div>
)

const Loans = () => (
  <div>
    <h2>Loans</h2>
  </div>
)

const Topics = () => (
  <div>
    <h2>Topics</h2>
  </div>
)

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>Posts</Link></li>
            <li><Link to='/events'>Events</Link></li>
            <li><Link to='/loans'>Loans</Link></li>
            <li><Link to='/topics'>Topics</Link></li>
          </ul>
          <Routes>
            <Route exact path='/' element={<Posts />} />
            <Route path='/events' element={<Events />} />
            <Route path='/loans' element={<Loans />} />
            <Route path='/topics' element={<Topics />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
