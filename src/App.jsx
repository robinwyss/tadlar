import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import { Home, Player, Login } from './pages';

import reactLogo from './assets/React-icon.png';

/**
 * this container is defined as class so you can modify state
 * when you add more stuff to it
 */
class App extends Component {
  /**
   * this is our statefull render
   * @return {objects} our stateless components
   */
  render() {
    return (
      <BrowserRouter>
        <main className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/player" component={Player} />
            <Route path="/callback" component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
