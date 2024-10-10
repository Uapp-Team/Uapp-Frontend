import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import { Link } from "react-router-dom";
import CopyButton from "./CopyButton";
import SocialShare from "./SocialShare";
import { Col, Form, FormGroup, Input } from "reactstrap";
import SaveButton from "../buttons/SaveButton";
import post from "../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../helpers/put";

const QRCodeGen = ({ text, setbase64, setModalShow }) => {
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const subData = new FormData(event.target);

    put(`Reference/invite/${Name}`).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "true",
        });
        setSuccess(!success);
        setModalShow(false);
        setName("");
      } else {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "error",
        });
      }
    });
  };

  // useEffect(() => {
  //   if (setbase64 && text) {
  //     const canvas = document.getElementById("qrcode-canvas");
  //     const base64 = canvas.toDataURL("image/png");
  //     setbase64(base64);
  //   }
  // }, [setbase64, text]);
  return (
    <div>
      {/* <div className="text-center mx-auto mb-4">
        <QRCode value={text} id="qrcode-canvas" size={210} className="ok" />
      </div> */}
      <div className="mb-4">
        <Form onSubmit={handleSubmit}>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="11">
              <span
                style={{ color: "#202827", fontSize: "15px", fontWeight: 500 }}
              >
                Enter your friend's email address
              </span>
              <Input
                type="email"
                name="name"
                id="name"
                value={Name}
                placeholder="Enter email"
                onChange={(e) => setName(e.target.value)}
              />
              <span className="text-danger">{NameError}</span>
            </Col>
          </FormGroup>

          <FormGroup className="text-center mx-auto mb-4">
            <SaveButton text="Send Invitation" />
          </FormGroup>
        </Form>
      </div>

      <div className="position-relative hr-refer mx-1">
        <hr />
        <p className="refer-hr-text">or</p>
      </div>

      <div className="text-center mx-auto mb-4">
        <p style={{ color: "#7C7C7C" }}>Share link with your friends</p>
      </div>

      <div className="d-flex justify-content-between align-items-center copy-text mx-auto w-75">
        <p className="mb-0 text-ellipsis mr-1">{text}</p>
        <CopyButton text={text} />
      </div>
      <SocialShare
        description={"this is a basic share page"}
        url={text}
      ></SocialShare>

      <div>
        <hr />
        <p className="mx-1" style={{ fontSize: "10px" }}>
          We respect your privacy and your friend's privacy. Their information
          will only be used to
          <p className="text-center mx-auto">send this invitation.</p>
        </p>
      </div>

      {/* <div className="d-flex mx-auto align-items-baseline">
        <p className="mr-2">
          Link: <a href={text}>{text}</a>
        </p>

        <CopyButton text={text} />
      </div> */}
    </div>
  );
};

export default QRCodeGen;
