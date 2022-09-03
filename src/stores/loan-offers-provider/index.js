import { createContext, useEffect, useContext, useState } from "react";

const initialState = {
  offers: [],
  isLoading: false,
}

const LoanOffersContext = createContext(initialState);

export const LoanOffersProvider = ({ children, loanApplicationId }) => {
  const [offers, setOffers] = useState(initialState.offers);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  const load = (loanApplicationId) => {
    setIsLoading(true);
    fetch(`/api/applications/${loanApplicationId}/offers`).then(async (response) => {
      let data = undefined;
      if (response.ok) {
        data = await response.json();
      }
      setOffers(data);
    }).catch(err => console.log("ERROR", err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    load(loanApplicationId);
  }, [loanApplicationId]);
  return (
    <LoanOffersContext.Provider value={{ offers, isLoading }}>
      {children}
    </LoanOffersContext.Provider>
  );
};

export const useLoanOffers = () => useContext(LoanOffersContext);
