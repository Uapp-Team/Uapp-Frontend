/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";
import Preview from "../ui/Preview";
import DownloadButton from "../buttons/DownloadButton";
import { Modal } from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";

const UploadFile = ({
  label,
  file,
  id,
  setFile,
  defaultValue,
  setRemove,
  error,
  setError,
}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [base64, setBash64] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFile && setFile(e.target.files[0]);
    setFileType(file?.type);

    if (file?.type && !file?.type.includes("image")) {
      const url = URL.createObjectURL(file);
      setBash64(url);
    } else if (file?.type && file?.type.includes("image")) {
      const reader = new FileReader();

      reader.onload = function () {
        const convertBase64 = reader.result;
        setBash64(convertBase64);
      };
      reader.readAsDataURL(file);
    } else setBash64(null);

    setError && setError("");
  };

  return (
    <>
      <Form.Group className="mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex justify-content-start align-items-center">
            {label && <span className="mr-4">{label}</span>}
            <label htmlFor={`inputImg${id}`} className="pointer mb-0">
              <span type="button" className="upload-button">
                <i class="fas fa-plus mr-2"></i> Upload
              </span>
            </label>
            <input
              type="file"
              id={`inputImg${id}`}
              onChange={handleFile}
              className="d-none"
            />
          </div>

          {file ? (
            <>
              {fileType === "application/pdf" ||
              file?.type?.includes("image") ? (
                <i
                  onClick={() => setIsPopoverVisible(true)}
                  class="fas fa-eye text-info fs-24px pointer"
                ></i>
              ) : (
                <a href={base64}>
                  <i class="fas fa-eye text-info fs-24px"></i>
                </a>
              )}
              {setFile && (
                <div
                  className="pointer text-gray"
                  onClick={() => setFile(null)}
                >
                  <AiOutlineDelete size={20} />
                </div>
              )}
              <div></div>
            </>
          ) : defaultValue ? (
            <>
              <Preview file={defaultValue} />
              {setRemove && (
                <div
                  className="pointer text-gray"
                  onClick={() => setRemove("")}
                >
                  <AiOutlineDelete size={20} />
                </div>
              )}
              <DownloadButton file={defaultValue} />
            </>
          ) : null}
        </div>
        <ErrorText error={error} />
      </Form.Group>

      <Modal
        isOpen={isPopoverVisible}
        toggle={() => setIsPopoverVisible(false)}
        size="lg"
      >
        {fileType === "application/pdf" ? (
          <div>
            <iframe src={base64} className="preview-pdf" />
          </div>
        ) : (
          <img src={base64} alt="" className="position-relative" />
        )}
        <i
          onClick={() => setIsPopoverVisible(false)}
          class="fas fa-times-circle fa-lg position-absolute close-pic-modal"
        ></i>
      </Modal>
    </>
  );
};

export default UploadFile;
