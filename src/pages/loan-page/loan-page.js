import { Controller, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import Select from "react-select";
import { ProfileProvider, useProfile } from "../../stores/profile";
import { LoanOffersProvider, useLoanOffers } from "../../stores/loan-offers-provider";
import { LoanTermsProvider, useLoanTerms } from "../../stores/loan-terms-provider";
import "./loan-page.scss";
import { useEffect, useState } from "react";

const BorrowerDetails = () => {
  const { data, isLoading } = useProfile();

  const profile = data;
  const email = profile?.contactEmail?.emailAddress ?? '';
  const address = profile?.residenceAddress ?? profile?.registrationAddress;
  const fullAddress = address ? `${address.street ?? ''} ${address.building}${address.unit ? `, բն. ${address.unit}` : ''}` : '';
  const phone = profile?.contactPhone;
  const phoneNumber = phone ? `+(${phone.countryCode}) ${phone.areaCode} ${phone.phoneNumber}` : '';
  const identificationDocument = profile?.identificationDocument?.number ?? '';

  return (<>
    <div className="user_name">{isLoading ? null : `${profile?.lastname} ${profile?.name} ${profile?.patronymic}`}</div>
    <ul className="data_list">
      <li>
        <div className="data_type">Անձնագիր</div>
        <div className="data_result">
          {isLoading ? null : identificationDocument}
        </div>
      </li>
      <li>
        <div className="data_type">Էլ. հասցե</div>
        <div className="data_result">{isLoading ? null : email}</div>
      </li>
      <li>
        <div className="data_type">Բջջային</div>
        <div className="data_result">{isLoading ? null : phoneNumber}</div>
      </li>
      <li>
        <div className="data_type">Բնակության հասցե</div>
        <div className="data_result">{isLoading ? null : fullAddress}</div>
      </li>
    </ul>
  </>
  );
}

const LoanOfferDetails = () => {
  const loanData = useLoanOffers();

  return (
    <>
      <ul className="data_list">
        <li>
          <div className="data_type">Ամսական վճար</div>
          <div className="data_result">{loanData.monthly}</div>
        </li>
        <li>
          <div className="data_type">Ընդհանուր գումար</div>
          <div className="data_result">{loanData.full_amount} AMD</div>
        </li>
        <li>
          <div className="data_type">Տոկոսադրույք</div>
          <div className="data_result">{loanData.percent}</div>
        </li>
        <li>
          <div className="data_type">Ժամկետ</div>
          <div className="data_result">{loanData.date}</div>
        </li>
      </ul>
    </>
  );
}

const LoanApplicationItemsDetails = () => {
  return (
    <>
      <table className="data_table">
        <thead>
          <tr>
            <th>Անվանում</th>
            <th>Արժեք</th>
          </tr>
        </thead>
        <tbody>
          {
            // loanData.products
            [].map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}

const LoanTermsDetails = () => {
  const statementOptions = [{ id: "email", name: "E-Mail" }, { id: "mail", name: "Mail" }];
  const terms = useLoanTerms();
  const hasTerms = false;//terms.terms !== undefined;
  //const hasTerms = terms.terms !== undefined;
  const { register, setValue, handleSubmit, control, errors } = useForm({ defaultValues: { statementOption: statementOptions[1].id } });

  const submitData = (aa) => {
    console.log(aa);
  };

  useEffect(() => {
    if (terms
      && !terms.isLoading
      && terms.terms) {
      console.log(terms.terms.statementDeliveryMethod);
      setValue("statementOption", terms.terms.statementDeliveryMethod);
    }
  }, [terms]);

  return (
    <>
      <div className="data_group">
        <h2 className="section_title icon_doc">Քաղվածքների ստացում</h2>
        <div className="field_block">
          <div className="field_name">Ընտրեք քաղվածքների ստացման եղանակը</div>
          <Controller
            rules={{ required: true }}
            control={control}
            name="statementOption"
            render={(props) => (
              <Select
              getOptionLabel={(option) => option["name"]}
              getOptionValue={(option) => option["id"]}
              value={props.value === undefined ? undefined : statementOptions.find(item => item.id === props.value)}
              classNamePrefix="select"
              isDisabled={hasTerms}
              options={statementOptions}
              onChange={val => props.onChange(val.id)}
              placeholder="Ընտրել"
            />)} />
        </div>
      </div>
      {hasTerms ? null
        : <>
          <div
            className={`field_block checkbox_field ${errors.agree ? "has-error" : ""
              }`}
          >
            <label>
              <input
                ref={register({ required: true })}
                name="agree"
                value={1}
                type="checkbox"
              />
              <span className="check_btn icon_checked">Ես համաձայն եմ</span>
            </label>
            <a
              className="inner_link"
              href="https://ameriabank.am/personal/loans/consumer-loans/consumer-finance"
              target="_blank"
              rel="noreferrer"
            >
              Վարկային պայմանների հետ
            </a>
            {errors.agree && (
              <div className="error_message">
                Դուք պետք է համաձայնեք վարկային պայմանների հետ agree
              </div>
            )}
          </div>
        </>
      }
    </>
  );
}

const LoanPage = () => {
  const { appId } = useParams();

  return (
    <>
      <div>
        <div className="data_group">
          <h2 className="section_title icon_user">Գնորդի անձնական տվյալներ</h2>
          <ProfileProvider>
            <BorrowerDetails />
          </ProfileProvider>
        </div>
        <div className="data_group">
          <h2 className="section_title icon_coins">Ապառիկ տվյալներ</h2>
          <LoanOffersProvider loanApplicationId={appId}>
            <LoanOfferDetails />
          </LoanOffersProvider>
        </div>
        <div className="data_group">
          <h2 className="section_title icon_percent">Գնվող ապրանքատեսականին</h2>
          <LoanApplicationItemsDetails />
        </div>
        <LoanTermsProvider loanApplicationId={appId}>
          <LoanTermsDetails />
        </LoanTermsProvider>
      </div>
    </>
  );
};

export default LoanPage;
