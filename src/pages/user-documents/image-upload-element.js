import { useEffect } from "react";
import { useState } from "react";
import { useProfileAttachments } from "../../stores/attachments"
import "./user-documents.scss";

const ImageUpload = ({ id, caption, hint, form, currentFileName }) => {
  const { register, errors } = form;
  const [fileName, setFileName] = useState(currentFileName);
  const [isUploading, setIsUploading] = useState(false);

  const attachments = useProfileAttachments();

  useEffect(() => {
    setFileName(currentFileName);
  }, [currentFileName]);

  const onAttachmentSelected = (file) => {
    var formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    fetch(`/api/uploads/${id}`, {
      method: "POST",
      body: formData,
    }).then(response => {attachments.addAttachment({id, fileName:file.name})})
      .catch(error => console.error(error))
      .finally(() => { setIsUploading(false) });
  }
  
  const isRequired = !!fileName;

  return (
    <>
      <div className={`field_block ${errors[id] ? "has-error" : ""}`}>
        <label className="file_type" htmlFor={id}>{caption}</label>
        <br />
        <label className="attach_block">
          <input
            onChange={(e) => onAttachmentSelected(e.target.files[0])}
            disabled={isUploading}
            type="file"
            name={id}
            ref={register({ required: !isRequired })}
            id={id}
            accept="image/*"
            capture="camera"
          />
          <span className="attach_btn icon_upload">
            <span className="file_name">
              {fileName || "Ներբեռնել"}
            </span>
          </span>
          {isUploading
            ? <div className="loader-overlay">
              <div className="spinner"></div>
            </div>
            : null}
        </label>
        <span className="attach_hint">{hint}</span>
        {errors[id] && (
          <div className="error_message">Պարտադիր դաշտ</div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
