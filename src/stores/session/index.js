import { createContext, useEffect, useContext, useState } from "react";

const initialState = undefined;

const SessionContext = createContext(initialState);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(initialState);

  const unsetSession = () => setSession({ user: undefined, isAuthenticated: false });

  useEffect(() => {
    setSession(undefined);
    fetch("/auth/session").then(async (response) => {
      if (response.ok) {
        setSession(await response.json());
      }
      else {
        unsetSession();
      }
    }).catch(err => console.log("ERROR", err));
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
