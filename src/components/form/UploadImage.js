import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";
import UploadButton from "../buttons/UploadButton";
import Preview from "../ui/Preview";
import DownloadButton from "../buttons/DownloadButton";

const UploadImage = ({
  label,
  defaultValue,
  file,
  file64,
  id,
  setFile,
  error,
  setError,
}) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const base64 = reader.result;
      setFile({
        fileContent: base64,
        fileType: file.type,
        size: file.size,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
    setError && setError("");
  };
  console.log("file64", file64);
  return (
    <Form.Group className="mb-3">
      <div className="d-flex align-items-center">
        {label && <span>{label}</span>}
        <div>
          <label htmlFor={`inputImg${id}`} className="pointer">
            Upload
            {/* <button type="button" className="upload-button">
              <i class="fas fa-plus mr-2"></i> Upload
            </button> */}
          </label>
          <input
            type="file"
            accept="image/jpg, image/png"
            // accept="image/*"
            id={`inputImg${id}`}
            onChange={handleFile}
            className="d-none"
          />
        </div>

        {file64 ? (
          <img
            src={"data:image/jpeg;base64," + btoa(file64)}
            // src={file64}
            alt=""
            // className="upload-user-profile rounded-circle"
          />
        ) : defaultValue ? (
          <>
            <Preview file={defaultValue} />
            <DownloadButton file={defaultValue} />
          </>
        ) : file64 ? (
          <img
            // src={"data:image/jpeg;base64," + btoa(file64)}
            src={file64}
            alt=""
            className="upload-user-profile rounded-circle"
          />
        ) : defaultValue ? (
          <img
            src={defaultValue}
            alt=""
            className="upload-user-profile rounded-circle"
          />
        ) : (
          <UploadButton />
        )}
      </div>
      <ErrorText error={error} />
    </Form.Group>
  );
};

export default UploadImage;
