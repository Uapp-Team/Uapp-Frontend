/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import { rootUrl } from "../../constants/constants";
import { Modal } from "reactstrap";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const PreviewUniDocu = ({ file }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [popoverData, setPopoverData] = useState(false);

  const openPopover = (url) => {
    setIsPopoverVisible(true);
    setPopoverData(url);
  };

  const closePopover = () => {
    setIsPopoverVisible(false);
    setPopoverData("");
  };

  return (
    <div>
      {file.split(".")[1] === "jpeg" ||
      file.split(".")[1] === "jpg" ||
      file.split(".")[1] === "png" ||
      file.split(".")[1] === "webp" ||
      file.split(".")[1] === "gif" ? (
        <>
          <EyeOutlined
            className="fs-24px pointer"
            onClick={() => openPopover(rootUrl + file)}
          ></EyeOutlined>
          {/* <i
            onClick={() => openPopover(rootUrl + file)}
            class="fas fa-eye text-info fs-24px pointer"
          ></i> */}
          <Modal
            isOpen={isPopoverVisible}
            toggle={closePopover}
            size="lg"
            // className="uapp-modal"
          >
            <img src={popoverData} alt="" className="position-relative" />
            <i
              onClick={closePopover}
              class="fas fa-times-circle fa-lg position-absolute close-pic-modal"
            ></i>
          </Modal>
        </>
      ) : file.split(".")[1] === "pdf" ? (
        <>
          <EyeOutlined
            className="fs-24px pointer"
            onClick={() => openPopover(rootUrl + file)}
          ></EyeOutlined>
          {/* <i
            onClick={() => openPopover(rootUrl + file)}
            class="fas fa-eye text-info fs-24px pointer"
          ></i> */}
          <Modal isOpen={isPopoverVisible} toggle={closePopover} size="lg">
            <iframe src={rootUrl + file} className="preview-pdf" />
            <i
              onClick={closePopover}
              class="fas fa-times-circle fa-lg position-absolute close-pic-modal"
            ></i>
          </Modal>
        </>
      ) : (
        <a href={rootUrl + file} style={{ color: "#484c4f" }}>
          <EyeOutlined className="fs-24px pointer"></EyeOutlined>
          {/* <i class="fas fa-eye text-info fs-24px invisible"></i> */}
        </a>
      )}
    </div>
  );
};

export default PreviewUniDocu;
