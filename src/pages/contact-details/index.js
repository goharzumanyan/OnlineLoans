import hy from "date-fns/locale/hy";
import { registerLocale } from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Flag from "../../helpers/Flag";

import { useEffect } from "react";
import { useDataForm } from "../../stores/form-context";
import "react-datepicker/dist/react-datepicker.css";
import { useAppStore } from "../../stores/app-provider";
import "./index.scss";
import { useProfile } from "../../stores/profile";

registerLocale("hy", hy);

// const patterns = {
//   passport: /^[A-Za-z]{2}[0-9]{7}$/,
//   bio: /^[A-Za-z]{2}[0-9]{7}$/,
//   id: /^\d+$/,
// };

const ContactDetails = () => {
  const defaultValues = {
    mobileNumber: "",
    email: "",
  };

  const { register, setValue, handleSubmit, errors, control } = useForm({
    defaultValues,
  });

  const { verify, verifyByCode } = useAppStore();

  const profile = useProfile();
  const dataForm = useDataForm();

  const onSubmit = (data) => {
   
    dataForm.onBeforeSave();
  
    const { mobileNumber, email } = data;
    const { countryCallingCode, nationalNumber } = parsePhoneNumber(mobileNumber);
    const areaCode = nationalNumber.substring(0, 2);
    const phoneNumber = nationalNumber.substring(2);
    const isNewEmailVerified = profile.data?.contactEmail?.emailAddress === email ? profile.data?.contactEmail?.isVerified : false;
    const currentPhone = profile.data?.contactPhone;
    const isNewPhoneVerified = currentPhone &&
     (currentPhone.countryCode === countryCallingCode &&
      currentPhone.areaCode === areaCode && currentPhone.phoneNumber === phoneNumber) ? currentPhone.isVerified : false;
    profile.setData({
      ...profile?.data,
      contactEmail: { emailAddress: email, isVerified: isNewEmailVerified },
      contactPhone: { countryCode: countryCallingCode, areaCode, phoneNumber, isVerified: isNewPhoneVerified }
    });

    dataForm.onAfterSave();
  };

  useEffect(() => {
    dataForm.handleOnSave(() => {
      return handleSubmit(onSubmit)();
    });
  }, []);

  useEffect(() => {
    if (!profile.isLoading
      && profile.data) {
      if (profile.data?.contactPhone) {
        setValue("mobileNumber", `+(${profile.data?.contactPhone?.countryCode})${profile.data?.contactPhone?.areaCode}${profile.data?.contactPhone?.phoneNumber}`);
      }
      if (profile.data?.contactEmail) {
        setValue("email", profile.data?.contactEmail?.emailAddress);
      }
    }
  }, [profile]);

  return (
    <>
      <form>
        <h2 className="section_title">Կոնտակտային տվյալներ</h2>
        <div
          className={`field_block ${
            errors.mobileNumber && errors.mobileNumber.type === "number"
              ? "has-error"
              : ""
          }`}
        >
          <label className="field_name" htmlFor="mobileNumber">
            Բջջային հեռախոսահամար
          </label>
          <Controller
            name="mobileNumber"
            id="mobileNumber"
            className="input"
            control={control}
            rules={{
              required: true,
            }}
            render={(props) => (
              <PhoneInput
                {...props}
                defaultCountry="AM"
                country="AM"
                smartCaret={true}
                initialValueFormat="national"
                placeholder="xx xxxxxx"
                limitMaxLength={true}
                withCountryCallingCode={false}
                flagComponent={Flag}
              />
            )}
          />
          <div className="phone_hint small_text">
            Եթե Դուք հանդիսանում եք Ամերիաբանկի հաճախորդ, խնդրում ենք լրացնել
            Ձեր կողմից Բանկին տրամադրված բջջ.համարը
          </div>

          {errors.mobileNumber && (
            <div className="error_message">Մուտքագրե՛ք ճիշտ հեռախոսահամար</div>
          )}
        </div>
        <div className={`field_block ${errors.email ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="email">
            Էլ. հասցե
          </label>
          <input
            type="text"
            name="email"
            ref={register({
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <div className="error_message">Մուտքագրե՛ք ճիշտ էլ. հասցե</div>
          )}
        </div>
      </form>
    </>
  );
};

export default ContactDetails;
