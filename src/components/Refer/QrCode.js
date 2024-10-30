import React from "react";
import QrShare from "./QrShare";

const QrCode = ({ modalClose, url, setModalShow }) => {
  return (
    <>
      <QrShare
        text="Share Form"
        url={url}
        action={modalClose}
        setModalShow={setModalShow}
      />
    </>
  );
};

export default QrCode;
