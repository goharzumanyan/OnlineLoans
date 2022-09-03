import { createContext, useEffect, useContext, useState } from "react";

const initialState = {
  terms: undefined,
  isLoading: false,
  reload: () => { },
  saveTerms: () => { }
}

const LoanTermsContext = createContext(initialState);

export const LoanTermsProvider = ({ children, loanApplicationId }) => {
  const [terms, setTerms] = useState(initialState.attachments);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);

  const load = (loanApplicationId) => {
    setIsLoading(true);
    fetch(`/api/applications/${loanApplicationId}/terms`).then(async (response) => {
      let data = undefined;
      if (response.ok) {
        data = await response.json();
      }
      setTerms(data);
    }).catch(err => console.log("ERROR", err))
      .finally(() => setIsLoading(false));
  }

  const reload = load;

  const saveTerms = ({ offerId, amount, duration, statementDeliveryMethod }) => {
    fetch(`/api/applications/${loanApplicationId}/terms`,
      {
        method: "POST",
        body: JSON.stringify({ offeringId: offerId, amount, duration, statementDeliveryMethod }),
      }).then(async (response) => {
      let data = undefined;
      if (response.ok) {
        data = await response.json();
      }
      setTerms(data);
    }).catch(err => console.log("ERROR", err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    load(loanApplicationId);
  }, [loanApplicationId]);

  return (
    <LoanTermsContext.Provider value={{ terms, isLoading, reload, saveTerms }}>
      {children}
    </LoanTermsContext.Provider>
  );
};

export const useLoanTerms = () => useContext(LoanTermsContext);
