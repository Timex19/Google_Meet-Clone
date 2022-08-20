import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appState, setAppState] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setAppState("home");
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);

  const value = { currentUser, appState };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
