import React from 'react';
import { Header, Home, Login, CallPage, NoMatch } from './components';
import { useAppContext } from './context/appContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  const {appState} = useAppContext();

  return (
    <div className="App">
      {appState === "login" && <Login />}
      
      <Router>
        <Switch>
          <Route exact path="/:id">
            <CallPage />
          </Route>
          <Route exact path="/">
            {appState === "home" && (
              <>
                <Header explain={appState} />
                <Home />
              </>
            )}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
