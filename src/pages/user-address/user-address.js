import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AddressForm from "./address-form";

import Paging from "../../components/paging";
import "./user-address.scss";
import { useProfile } from "../../stores/profile";
import { redirect } from "../../helpers/utils";
import { useDataForm } from "../../stores/form-context";

const RegistrationAddressName = "registration";
const ResidenceAddressName = "residence"

const UserAddress = () => {
  const defaultValues = {
    state: "",
    city: "",
    [`${RegistrationAddressName}_country`]: 'Հայաստան',
    [`${ResidenceAddressName}_country`]: 'Հայաստան'
  };

  const form = useForm({
    defaultValues,
  });
  const { setValue, handleSubmit } = form;
  const [isDefault, setDefault] = useState(1);

  const profile = useProfile();
  const dataForm = useDataForm();

  const submitAddress = (data) => {
    dataForm.onBeforeSave();
    const { residence_country, residence_state, residence_city, residence_street, residence_house, residence_appartment,
      registration_country, registration_state, registration_city, registration_street, registration_house, registration_appartment } = data;
    const newProfile = {
      ...profile.data,
      registrationAddress: { countryCode: 'AM', subdivisionCode: registration_state, regionCode: registration_city, street: registration_street, building: registration_house, unit: registration_appartment },
      residenceAddress: isDefault ? undefined : { countryCode: 'AM', subdivisionCode: residence_state, regionCode: residence_city, street: residence_street, building: residence_house, unit: residence_appartment }
    };
    profile.setData(newProfile);
    dataForm.onAfterSave();
  };

  const populateAddressForm = (name, data) => {
    setValue(`${name}_country`, 'Հայաստան'); 
    setValue(`${name}_state`, data.subdivisionCode);
    setValue(`${name}_city`, data.regionCode);
    setValue(`${name}_street`, data.street);
    setValue(`${name}_house`, data.building);
    setValue(`${name}_appartment`, data.unit);
  }

  useEffect(() => {
    dataForm.handleOnSave(() => {
      return handleSubmit(submitAddress)();
    });
  }, []);

  useEffect(() => {
    if (!profile.isLoading
      && profile.data) {
      if (profile.data?.registrationAddress) {
        populateAddressForm(RegistrationAddressName, profile.data?.registrationAddress);
      }
      if (profile.data?.residenceAddress) {
        setDefault(0);
      }
      else {
        setDefault(1);
      }
    }
  }, [profile]);

  useEffect(() => {
    if (!isDefault
      && profile?.data?.residenceAddress) {
      populateAddressForm(ResidenceAddressName, profile.data?.residenceAddress);
    }
  }, [isDefault]);

  return (
    <>
      <form>
        <h2 className="section_title">Բնակության հասցե</h2>
        <AddressForm title="" name={RegistrationAddressName} form={form} />
      </form>
    </>
  );
};

export default UserAddress;
