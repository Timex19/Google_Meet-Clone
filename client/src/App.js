import React from 'react';
import { Header, Home, Login } from './components';
import { useAppContext } from './context/appContext';
import './App.css';

function App() {
  const {appState} = useAppContext();

  return (
    <div className="App">
      {appState === "login" && <Login />}

      {appState === "home" && (
        <>
          <Header explain={appState} />
          <Home />
        </>
      )}
    </div>
  );
}

export default App;
