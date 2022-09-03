import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ImageUpload from "./image-upload-element";
import { useDataForm } from "../../stores/form-context";
import { useProfileAttachments } from "../../stores/attachments"
import "./user-documents.scss";
import { useEffect } from "react";

const ssnScanId = "ssn";
const idDocScanId = "id-doc";

const UserDocuments = () => {
  const form = useForm();
  const { handleSubmit } = form;

  const attachments = useProfileAttachments();
  const dataForm = useDataForm();

  const onSubmit = (data) => {
    dataForm.onBeforeSave();
    var formData = new FormData();
    formData.append("id_document", data[idDocScanId][0]);
    formData.append("socialCard", data[ssnScanId][0]);
    console.log(formData);
    dataForm.onAfterSave();
  };

  useEffect(() => {
    dataForm.handleOnSave(() => {
      return handleSubmit(onSubmit)();
    });
  }, []);

  let d1 = attachments?.attachments?.find(item => item?.id === idDocScanId);
  let d2 = attachments?.attachments?.find(item => item?.id === ssnScanId);

  return (
    <>
      <form>
        <h2 className="section_title">Անձնական փաստաթղթեր</h2>
        <ImageUpload id={idDocScanId} caption="Անձագիր" hint="Տրամադրել անձնագրի կամ ID քարտի լուսանկարը" form={form} currentFileName={d1?.fileName} />
        <ImageUpload id={ssnScanId} caption="Սոցիալական քարտ" hint="Տրամադրել սոցիալական քարտի լուսանկարը" form={form} currentFileName={d2?.fileName} />
      </form>
    </>
  );
};

export default UserDocuments;
