import { verificationCodeExpiredStatuses } from "../configs";
import customHistory from "./history";

export const redirect = function (path) {
  customHistory.push(path);
};

export const handleVerifyByCode = function (type, status) {
  if (verificationCodeExpiredStatuses.includes(status)) {
    alert("show  error message");
    return;
  }

  //success case
  if (!verificationCodeExpiredStatuses.includes(status)) {
    /*  we can store session id in URL [email/verification/ID]  for using  this ID after reload if needed  */
    return type === "phone"
      ? redirect("/email-verification/")
      : redirect("/buyer-personal-details/");
  }
};
