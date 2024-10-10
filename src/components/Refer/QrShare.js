import React, { useState } from "react";
import QRCodeGen from "./QRCodeGen";
import referFriend from "../../assets/img/refer-friend.svg";

const QrShare = ({ text, url, action, setModalShow }) => {
  const [base64, setbase64] = useState("");

  const download = () => {
    var link = document.createElement("a");
    link.href = base64;
    link.download = "qrcode.png";
    link.click();
  };
  return (
    <>
      <div className="text-center mx-auto mb-4">
        <img src={referFriend} alt="" />
      </div>

      <QRCodeGen text={url} setbase64={setbase64} setModalShow={setModalShow} />
    </>
  );
};

export default QrShare;
