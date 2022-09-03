import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const initialState = {
  application: {},
};

export const AplicationDataContext = createContext(initialState);

export const VerificationProvider = ({ children }) => {
  const [application, setApplication] = useState(initialState.application);

  const getApplication = useCallback(() => ({}));

  const value = React.useMemo(
    () => ({
      application,
    }),
    [application]
  );

  useEffect(() => {
    getApplication().then((result) => {
      setApplication(result);
    });
  }, []);

  return (
    <AplicationDataContext.Provider value={value}>
      {children}
    </AplicationDataContext.Provider>
  );
};

export const useApplicationDataContext = () =>
  useContext(AplicationDataContext);
