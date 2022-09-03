import hy from "date-fns/locale/hy";
import { registerLocale } from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";

import { useEffect } from "react";
import { useProfile } from "../../stores/profile";
import { useDataForm } from "../../stores/form-context";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

registerLocale("hy", hy);
const onlyArmenianLetters =  /^$|[աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցուփքևօֆԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՈՒՓՔՕՖ\.․\_ ]+$/;

const BuyerPersonalDetails = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    patronymic: "",
  };

  const { register, setValue, handleSubmit, errors } = useForm({
    defaultValues,
  });

  const profile = useProfile();
  const dataForm = useDataForm();

  const onSubmit = (data) => {
    dataForm.onBeforeSave();
    const { firstName, lastName, patronymic, socialCard } = data;
    profile.setData({ ...profile.data, name: firstName, lastname: lastName, patronymic, socialSecurityNumber: socialCard });
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
      setValue("firstName", profile.data?.name);
      setValue("lastName", profile.data?.lastname);
      setValue("patronymic", profile.data?.patronymic);
      setValue("socialCard", profile.data?.socialSecurityNumber);
    }
  }, [profile]);

  return (
    <>
      <form>
        <h2 className="section_title">Անձնական տվյալներ</h2>
        <div className={`field_block ${errors.socialCard ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="socialCard">
            Սոց. քարտի համար
          </label>
          <input
            name="socialCard"
            id="socialCard"
            maxLength="10"
            ref={register({
              required: true,
              validate: {
                number: (value) => {
                  var reg = new RegExp(/^\d+$/);
                  return reg.test(value);
                },
              },
            })}
          />
          {errors.socialCard &&
            (errors.socialCard.type === "number" ? (
              <div className="error_message">Սոց. քարտի կառուցվածքի սխալ</div>
            ) : (
              <div className="error_message">Պարտադիր դաշտ</div>
            ))}
        </div>
        <div className={`field_block ${errors.firstName ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="firstName">
            Անուն (հայատառ)
          </label>
          <input
            name="firstName"
            ref={register({
              required: true,
              validate: {
                pattern: (value) => {
                  return  value.split('').every(letter => onlyArmenianLetters.test(letter));
                },
              },
            })}
            id="firstName"
            placeholder="Սևակ"
          />
          {errors.firstName &&
            (errors.firstName.type === "pattern" ? (
              <div className="error_message">խնդրում ենք լրացնել հայատառ</div>
            ) : (
              <div className="error_message">Պարտադիր դաշտ</div>
            ))}
        </div>
        <div className={`field_block ${errors.lastName ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="lastName">
            Ազգանուն (հայատառ)
          </label>
          <input
            name="lastName"
            ref={register({
              required: true,
              validate: {
                pattern: (value) => {
                  return  value.split('').every(letter => onlyArmenianLetters.test(letter));
                },
              },
            })}
            id="lastName"
            placeholder="Սևակյան"
          />
          {errors.lastName &&
            (errors.lastName.type === "pattern" ? (
              <div className="error_message">խնդրում ենք լրացնել հայատառ</div>
            ) : (
              <div className="error_message">Պարտադիր դաշտ</div>
            ))}
        </div>
        <div className={`field_block ${errors.patronymic ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="patronymic">
            Հայրանուն (հայատառ)
          </label>
          <input
            name="patronymic"
            ref={register({
              required: true,
              validate: {
                pattern: (value) => {
                  return  value.split('').every(letter => onlyArmenianLetters.test(letter));
                },
              },
            })}
            id="patronymic"
            placeholder="Սևակի"
          />
          {errors.patronymic &&
            (errors.patronymic.type === "pattern" ? (
              <div className="error_message">խնդրում ենք լրացնել հայատառ</div>
            ) : (
              <div className="error_message">Պարտադիր դաշտ</div>
            ))}
        </div>

        <div
          className={`field_block checkbox_field ${
            errors.nork ? "has-error" : ""
          }`}
        >
          <label>
            <input
              ref={register({ required: true })}
              name="nork"
              value={1}
              type="checkbox"
            />
            <span className="check_btn icon_checked small_text">
              Համաձայն եմ, որ «Ամերիաբանկ» ՓԲԸ-ն առանց ինձ տեղեկացնելու
              հարցումներ կատարի և ստանա տեղեկություններ «Նորք» սոցիալական
              ծառայությունների տեխնոլոգիական և իրազեկման կենտրոն հիմնադրամից իմ
              ներկա և անցյալ աշխատանքային գործունեության, ինչպես նաև այլ
              տվյալների մասին։:
            </span>
          </label>
          {errors.nork && (
            <div className="error_message">
              Դուք պետք է համաձայնեք տվյալ պայմանի հետ
            </div>
          )}
        </div>

        <div
          className={`field_block checkbox_field ${
            errors.akra ? "has-error" : ""
          }`}
        >
          <label>
            <input
              ref={register({ required: true })}
              name="akra"
              value={1}
              type="checkbox"
            />
            <span className="check_btn icon_checked small_text">
              Համաձայն եմ, որ «Ամերիաբանկ» ՓԲԸ-ն իր նախաձեռնությամբ իմ
              վարկավորման հնարավորությունները դիտարկելու և/կամ վարկավորման
              առաջարկ ներկայացնելու դեպքերում առանց ինձ տեղեկացնելու հարցումներ
              կատարի և ստանա տեղեկություններ «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ-ից իմ
              ներկա և անցյալ դրամական պարտավորությունների, ինչպես նաև այլ
              տվյալների մասին։
            </span>
          </label>
          {errors.akra && (
            <div className="error_message">
              Դուք պետք է համաձայնեք տվյալ պայմանի հետ
            </div>
          )}
        </div>

        <div
          className={`field_block checkbox_field ${
            errors.agree ? "has-error" : ""
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
              Դուք պետք է համաձայնեք վարկային պայմանների հետ
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default BuyerPersonalDetails;
