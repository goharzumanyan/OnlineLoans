import { createContext, useCallback, useContext, useState } from "react";
import { handleVerifyByCode, redirect } from "../../helpers/utils";
import { contactVerificationService } from "../../service/contact-verification";

const initialState = {
  verificationSession: [],
  application: {},
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [verificationSessionState, setVerificationSession] = useState(
    initialState.verificationSession
  );

  const verifyContact = useCallback((data) =>
    contactVerificationService.verify(data)
  );

  const verifyContactVerificationSession = useCallback((data) =>
    contactVerificationService.verifySessionByCode(data).then((result) => {})
  );

  const verify = (data) => {
    verifyContact(data)
      .then((result) => {
        //DUMMY DATA
        const sessions = result.map(({ id }, index) => ({
          id,
          type: index === 0 ? "phone" : "email",
        }));

        setVerificationSession(sessions);

        redirect("/phone-verification/");
      })
      .catch((error) => {
        alert("error message");
      });
  };

  const verifySession = async (code, type) => {
    await verifyContactVerificationSession(code)
      .then((result) => {
        handleVerifyByCode(type, result.status);
      })
      .catch((error) => {
        alert("error message");
      });
  };

  return (
    <AppContext.Provider
      value={{ verify, verifySession, verificationSessionState }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => useContext(AppContext);
