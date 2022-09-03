import { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const cityList = [{ "id": "01001013", "parentId": "01", "name": "Աջափնյակ" },
{ "id": "01001023", "parentId": "01", "name": "Ավան" },
{ "id": "01001033", "parentId": "01", "name": "Արաբկիր" },
{ "id": "01001043", "parentId": "01", "name": "Դավթաշեն" },
{ "id": "01001053", "parentId": "01", "name": "Էրեբունի" },
{ "id": "01001063", "parentId": "01", "name": "Կենտրոն" },
{ "id": "01001073", "parentId": "01", "name": "Մալաթիա-Սեբաստիա" },
{ "id": "01001083", "parentId": "01", "name": "Նոր Նորք" },
{ "id": "01001093", "parentId": "01", "name": "Նորք-Մարաշ" },
{ "id": "01001103", "parentId": "01", "name": "Նուբարաշեն" },
{ "id": "01001113", "parentId": "01", "name": "Շենգավիթ" },
{ "id": "01001123", "parentId": "01", "name": "Քանաքեռ-Զեյթուն" },
{ "id": "02001000", "parentId": "02", "name": "Աշտարակ" },
{ "id": "02002000", "parentId": "02", "name": "Ապարան" },
{ "id": "02003000", "parentId": "02", "name": "Թալին" },
{ "id": "02006000", "parentId": "02", "name": "Ալագյազ" },
{ "id": "02013000", "parentId": "02", "name": "Մեծաձոր" },
{ "id": "02016000", "parentId": "02", "name": "Արագածավան" },
{ "id": "02026000", "parentId": "02", "name": "Արևուտ" },
{ "id": "02053000", "parentId": "02", "name": "Ծաղկահովիտ" },
{ "id": "02081000", "parentId": "02", "name": "Շամիրամ" },
{ "id": "03001000", "parentId": "03", "name": "Արտաշատ" },
{ "id": "03002000", "parentId": "03", "name": "Արարատ" },
{ "id": "03003000", "parentId": "03", "name": "Մասիս" },
{ "id": "03004000", "parentId": "03", "name": "Վեդի" },
{ "id": "03092000", "parentId": "03", "name": "Վերին Դվին" },
{ "id": "04001000", "parentId": "04", "name": "Արմավիր" },
{ "id": "04002000", "parentId": "04", "name": "Վաղարշապատ" },
{ "id": "04003000", "parentId": "04", "name": "Մեծամոր" },
{ "id": "04029000", "parentId": "04", "name": "Բաղրամյան" },
{ "id": "04033000", "parentId": "04", "name": "Արաքս" },
{ "id": "04087000", "parentId": "04", "name": "Խոյ" },
{ "id": "04094000", "parentId": "04", "name": "Փարաքար" },
{ "id": "04097000", "parentId": "04", "name": "Ֆերիկ" },
{ "id": "05001000", "parentId": "05", "name": "Գավառ" },
{ "id": "05002000", "parentId": "05", "name": "Ճամբարակ" },
{ "id": "05003000", "parentId": "05", "name": "Մարտունի" },
{ "id": "05004000", "parentId": "05", "name": "Սևան" },
{ "id": "05005000", "parentId": "05", "name": "Վարդենիս" },
{ "id": "05074000", "parentId": "05", "name": "Շողակաթ" },
{ "id": "06001000", "parentId": "06", "name": "Վանաձոր" },
{ "id": "06002000", "parentId": "06", "name": "Ալավերդի" },
{ "id": "06003000", "parentId": "06", "name": "Ախթալա" },
{ "id": "06004000", "parentId": "06", "name": "Թումանյան" },
{ "id": "06006000", "parentId": "06", "name": "Սպիտակ" },
{ "id": "06007000", "parentId": "06", "name": "Ստեփանավան" },
{ "id": "06008000", "parentId": "06", "name": "Տաշիր" },
{ "id": "06029000", "parentId": "06", "name": "Գյուլագարակ" },
{ "id": "06043000", "parentId": "06", "name": "Լերմոնտովո" },
{ "id": "06044000", "parentId": "06", "name": "Լոռի Բերդ" },
{ "id": "06074000", "parentId": "06", "name": "Մեծավան" },
{ "id": "06088000", "parentId": "06", "name": "Շնող" },
{ "id": "06100000", "parentId": "06", "name": "Սարչապետ" },
{ "id": "06107000", "parentId": "06", "name": "Փամբակ" },
{ "id": "06112000", "parentId": "06", "name": "Օձուն" },
{ "id": "06113000", "parentId": "06", "name": "Ֆիոլետովո" },
{ "id": "07001000", "parentId": "07", "name": "Հրազդան" },
{ "id": "07002000", "parentId": "07", "name": "Աբովյան" },
{ "id": "07003000", "parentId": "07", "name": "Բյուրեղավան" },
{ "id": "07004000", "parentId": "07", "name": "Նաիրի" },
{ "id": "07005000", "parentId": "07", "name": "Ծաղկաձոր" },
{ "id": "07006000", "parentId": "07", "name": "Նոր Հաճընուղղ." },
{ "id": "07007000", "parentId": "07", "name": "Չարենցավան" },
{ "id": "07009000", "parentId": "07", "name": "Ակունք" },
{ "id": "07016000", "parentId": "07", "name": "Արզնի" },
{ "id": "07021000", "parentId": "07", "name": "Գառնի" },
{ "id": "07057000", "parentId": "07", "name": "Ջրվեժ" },
{ "id": "08001000", "parentId": "08", "name": "Գյումրի" },
{ "id": "08002000", "parentId": "08", "name": "Արթիկ" },
{ "id": "08003000", "parentId": "08", "name": "Անի" },
{ "id": "08007000", "parentId": "08", "name": "Ախուրյան" },
{ "id": "08010000", "parentId": "08", "name": "Ամասիա" },
{ "id": "08015000", "parentId": "08", "name": "Աշոցք" },
{ "id": "09001000", "parentId": "09", "name": "Կապան" },
{ "id": "09003000", "parentId": "09", "name": "Գորիս" },
{ "id": "09005000", "parentId": "09", "name": "Մեղրի" },
{ "id": "09006000", "parentId": "09", "name": "Սիսիան" },
{ "id": "09007000", "parentId": "09", "name": "Քաջարան" },
{ "id": "09028000", "parentId": "09", "name": "Գորայք" },
{ "id": "09097000", "parentId": "09", "name": "Տաթև" },
{ "id": "09101000", "parentId": "09", "name": "Տեղ" },
{ "id": "10001000", "parentId": "10", "name": "Եղեգնաձոր" },
{ "id": "10002000", "parentId": "10", "name": "Ջերմուկ" },
{ "id": "10003000", "parentId": "10", "name": "Վայք" },
{ "id": "10008000", "parentId": "10", "name": "Արենի" },
{ "id": "10035000", "parentId": "10", "name": "Եղեգիս" },
{ "id": "11001000", "parentId": "11", "name": "Իջևան" },
{ "id": "11002000", "parentId": "11", "name": "Բերդ" },
{ "id": "11003000", "parentId": "11", "name": "Դիլիջան" },
{ "id": "11004000", "parentId": "11", "name": "Նոյեմբերյան" }];

const AddressForm = ({ title, name, form }) => {
  const { register, errors, control } = form;

  const states = [{ "id": "01000000", "name": "Երևան" },
    { "id": "02000000", "name": "Արագածոտն" },
    { "id": "03000000", "name": "Արարատ" },
    { "id": "04000000", "name": "Արմավիր" },
    { "id": "05000000", "name": "Գեղարքունիք" },
    { "id": "06000000", "name": "Լոռի" },
    { "id": "07000000", "name": "Կոտայք" },
    { "id": "08000000", "name": "Շիրակ" },
    { "id": "09000000", "name": "Սյունիք" },
    { "id": "10000000", "name": "Վայոց ձոր" },
    { "id": "11000000", "name": "Տավուշ" }];
  

  const [selectedState, setSelectedState] = useState(undefined);
  const [selectedCity, setSelectedCity] = useState(undefined);

  const [cities, setCities] = useState();


  const stateChange = (option) => {
    setSelectedState(option);
    setCities(cityList.filter(item => option.id.startsWith(item.parentId)));
    setSelectedCity({id:'', name:''});
  };

  return (
    <div className="fields_section">
      <h3 className="section_subtitle">{title}</h3>
      <div className={`field_block ${errors[`${name}_country`] ? "has-error" : ""}`}>
        <label className="field_name" htmlFor="country">
          Երկիր
        </label>
        <input
          disabled
          type="text"
          name={`${name}_country`}
          ref={register({ required: true })}
          id="country"
        />
        {errors[`${name}_country`] && <div className="error_message">Պարտադիր դաշտ</div>}
      </div>
      <div className="fields_group">
        <div className={`field_block ${errors[`${name}_state`] ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="region">
            Քաղաք
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            name={`${name}_state`}
            render={(props) => (
              <Select
                getOptionLabel={(option) => option["name"]}
                getOptionValue={(option) => option["id"]}
                onChange={(option) => {
                  stateChange(option);
                  props.onChange(option.name);
                }}
                classNamePrefix="select"
                options={states}
                value={selectedState}
                id="region"
                placeholder="Ընտրել"
              />
            )}
          />
          {errors[`${name}_state`] && <div className="error_message">Պարտադիր դաշտ</div>}
        </div>
        <div className={`field_block ${errors[`${name}_city`] ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="city">
            Համայնք
          </label>
          <Controller
            rules={{ required: true }}
            control={control}
            name={`${name}_city`}
            render={(props) => (
              <Select
                getOptionLabel={(option) => option["name"]}
                getOptionValue={(option) => option["id"]}
                onChange={(option) => {
                  setSelectedCity(option);
                  props.onChange(option.name);
                }}
                classNamePrefix="select"
                value={selectedCity}
                options={cities}
                placeholder="Ընտրել"
              />
            )}
          />
          {errors[`${name}_city`] && <div className="error_message">Պարտադիր դաշտ</div>}
        </div>
      </div>
      <div className={`field_block ${errors[`${name}_street`] ? "has-error" : ""}`}>
        <label className="field_name" htmlFor="street">
          Փողոց
        </label>
        <input
          type="text"
          name={`${name}_street`}
          ref={register({ required: true, pattern: /[ա-ֆ-Ա-Ֆ]/ })}
          id="street"
        />

        {errors[`${name}_street`] &&
          (errors[`${name}_street`].type === "pattern" ? (
            <div className="error_message">խնդրում ենք լրացնել հայատառ</div>
          ) : (
            <div className="error_message">Պարտադիր դաշտ</div>
          ))}
      </div>
      <div className="fields_group">
        <div className={`field_block ${errors[`${name}_house`] ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="house">
            Շենք
          </label>
          <input
            type="text"
            name={`${name}_house`}
            ref={register({ required: true })}
            id="house"
          />
          {errors[`${name}_house`] && <div className="error_message">Պարտադիր դաշտ</div>}
        </div>
        <div className={`field_block ${errors[`${name}_appartment`] ? "has-error" : ""}`}>
          <label className="field_name" htmlFor="appartment">
            Բնակարան/Տուն
          </label>
          <input
            type="text"
            name={`${name}_appartment`}
            ref={register({ required: false })}
            id="appartment"
          />
          {errors[`${name}_appartment`] && (
            <div className="error_message">Պարտադիր դաշտ</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
