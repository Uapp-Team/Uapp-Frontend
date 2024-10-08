import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card } from "reactstrap";
import get from "../../../../../helpers/get";
import downloadPdf from "../../../../../assets/img/downloadPdf.png";
import { userTypes } from "../../../../../constants/userTypeConstant";
import vector from "../../../../../assets/img/Vector.png";

const Consent = ({ id }) => {
  const [consentdata, setConsentdata] = useState({});
  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();

  useEffect(() => {
    get(`StudentConsent/Get/${id}`).then((res) => {
      setConsentdata(res);
      console.log("res consent", res);
    });
  }, [id]);
  const handleConsent = () => {
    history.push(`/studentDeclaration/${localStorage.getItem("referenceId")}`);
  };
  return (
    <div>
      <Card className="p-4">
        <h5 className="mb-4">Consent</h5>

        {consentdata === null || consentdata?.isDeclared === false ? (
          <>
            <p> Consent is not signed yet</p>
            {
              userTypeId === userTypes?.Student.toString() ? (
                <>
                  <div className="d-flex flex-wrap justify-content-center">
                    <div style={{ cursor: "pointer" }}>
                      <div className="std-consent-and-profile">
                        <img
                          src={vector}
                          className="img-fluid dashbard-img-style1"
                          alt=""
                        />
                        <span onClick={handleConsent}>Sign Consent</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : null
            }
          </>

        ) : (
          <>
            <span className="text-gray-70">
              Consent Signed on: {consentdata?.consentSignTime}
            </span>

            <img
              src={downloadPdf}
              alt=""
              style={{ width: "156px" }}
              className="my-3"
            />

            <span className="text-gray-70">
              Conscent Signed From Ip: {consentdata?.deviceIp}
            </span>
          </>
        )}
      </Card>
    </div>
  );
};

export default Consent;
