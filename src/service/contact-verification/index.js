import { httpService } from "../httpSeervice";

class ContactVerification {
  verify(data) {
    const { email, mobileNumber } = data;

    Promise.all([
      httpService.post("api/contact-verifications/", {
        // TODO api url`s should be moved to configs
        contactType: "phone",
        contact: mobileNumber,
      }),
      httpService.post("/api/contact-verifications/", {
        contactType: "email",
        contact: email,
      }),
    ]).then((response) => {
      return response; // handle response
    });
  }

  async verifySessionByCode(code, id) {
    return await httpService.post(
      `/api/contact-varifications/${8}/confirmation`,
      {
        verificationCode: code,
      }
    );
  }
}

export const contactVerificationService = new ContactVerification();
