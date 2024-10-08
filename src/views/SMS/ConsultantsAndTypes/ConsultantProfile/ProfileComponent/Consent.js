import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import get from "../../../../../helpers/get";
import downloadPdf from "../../../../../assets/img/downloadPdf.png";

const Consent = ({ id }) => {
  const [consultantData, setConsultantData] = useState({});
  // const [success, setSuccess] = useState(false);
  // const userTypeId = localStorage.getItem("userType");
  // const history = useHistory();

  useEffect(() => {
    get(`ConsultantProfile/GetConsent/${id}`).then((res) => {
      setConsultantData(res);
    });
  }, [id]);

  return (
    <div>
      <Card className="p-4">
        <h5 className="mb-4">Consent</h5>

        {consultantData === null || consultantData?.isSigned === false ? (
          <p> Terms and Conditions is not signed yet</p>
        ) : (
          <>
            <span className="text-gray-70">
              Terms and Conditions Signed on: {consultantData?.consentSignTime}
            </span>

            <img
              src={downloadPdf}
              alt=""
              style={{ width: "156px" }}
              className="my-3"
            />

            <span className="text-gray-70">
            Terms and Conditions Signed From Ip: {consultantData?.deviceIp}
            </span>
          </>
        )}
      </Card>
    </div>
  );
};

export default Consent;
