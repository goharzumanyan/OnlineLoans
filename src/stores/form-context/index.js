import { createContext, useContext, useState } from "react";

const initialState = {
  handleOnBeforeSave: () => { },
  handleOnAfterSave: () => { },
  handleOnSave: () => { },
  onBeforeSave: () => { },
  onAfterSave: () => { },
  onSave: () => { },
}

const DataFormContext = createContext(initialState);

export const DataFormProvider = ({ children }) => {
  const [onSave, setOnSave] = useState(() => () => { });
  const [onBeforeSave, setOnBeforeSave] = useState(() => () => { });
  const [onAfterSave, setOnAfterSave] = useState(() => () => { });

  const handleOnSave = (handler) => {
    setOnSave(() => handler);
  }

  const handleOnBeforeSave = (handler) => {
    setOnBeforeSave(() => handler);
  }

  const handleOnAfterSave = (handler) => {
    setOnAfterSave(() => handler);
  }

  return (
    <DataFormContext.Provider value={{ handleOnBeforeSave, handleOnAfterSave, handleOnSave, onSave, onBeforeSave, onAfterSave }}>
      {children}
    </DataFormContext.Provider>
  );
};

export const useDataForm = () => useContext(DataFormContext);
