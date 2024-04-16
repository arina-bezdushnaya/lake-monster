import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Main} from './pages/main';
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
