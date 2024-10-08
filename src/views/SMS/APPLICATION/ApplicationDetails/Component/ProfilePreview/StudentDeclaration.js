import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";
import { useToasts } from "react-toast-notifications";
// import get from "../../../../../helpers/get";
// import post from "../../../../../helpers/post";
// import put from "../../../../../helpers/put";
// import { userTypes } from "../../../../../constants/userTypeConstant";
// import ButtonLoader from "../../../Components/ButtonLoader";
import icon_warning from "../../../../../../assets/img/icons/icon_warning.png";
import icon_success from "../../../../../../assets/img/icons/icons_success.png";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import put from "../../../../../../helpers/put";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import ButtonLoader from "../../../../Components/ButtonLoader";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const StudentDeclaration = ({ sId }) => {
  const [conscentData, setConscentData] = useState({});
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [apiInfo, setAPiInfo] = useState("");
  const userTypeId = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`StudentConsent/Get/${sId}`).then((res) => {
      setConscentData(res);
    });

    fetch(`http://ip.jsontest.com/`)
      .then((res) => res?.json())
      .then((data) => {
        setAPiInfo(data?.ip);
      });
  }, [success, sId]);

  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("StudentId", sId);
    subData.append("IpAddress", apiInfo);
    setProgress(true);
    post("StudentConsent/Sign", subData).then((res) => {
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const sendEmail = () => {
    setButtonStatus(true);
    setProgress(true);
    put(`StudentConsent/SendEmail/${sId}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast("Email Sending is in Process", {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  return (
    <div>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Consent</b>
          </td>
        </thead>
      </Table>

      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="text-center d-sm-w75">
            <h3>TERMS & CONDITIONS</h3>
            <p>
              Please read students terms & Conditions here{" "}
              <a href="https://smsheg.co.uk/privacypolicy.">
                https://smsheg.co.uk/privacypolicy.
              </a>
              <br />
              You will not be able to apply without accepting the terms &
              conditions
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5 mb-1">
          <div className="d-sm-w75">
            {conscentData == null || conscentData?.isDeclared === false ? (
              <div className="text-center">
                <p className="text-warning">
                  Terms and conditions is not signed yet
                </p>
              </div>
            ) : (
              <div
                className="d-flex justify-content-between"
                style={{ color: "#252525", opacity: ".7" }}
              >
                <div>
                  <span>
                    Signed on: {formatDate(conscentData?.consentSignTime)}
                  </span>
                </div>
                <div>
                  <span>From IP:{conscentData?.consentFromIp}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center mb-5">
          <div
            className="text-center d-sm-w75 bg-terms p-5"
            style={{ borderRadius: "12px" }}
          >
            {userTypeId === userTypes?.SystemAdmin.toString() ||
            userTypeId === userTypes?.Admin.toString() ||
            userTypeId === userTypes?.ComplianceManager.toString() ||
            userTypeId === userTypes?.Consultant.toString() ? (
              <>
                {conscentData == null ||
                conscentData?.consentSignStatusId === 1 ? (
                  <div className="mb-1 text-center">
                    <div className="d-flex justify-content-center">
                      <img src={icon_warning} height="35" alt="" />
                    </div>
                    <h5 className="my-2">
                      Terms and Conditions has not signed yet
                    </h5>
                    <p>Send email to student</p>
                    <Button
                      color="primary"
                      onClick={sendEmail}
                      disabled={buttonStatus}
                    >
                      {progress ? <ButtonLoader /> : "Send Email"}
                    </Button>
                  </div>
                ) : conscentData !== null &&
                  conscentData?.consentSignStatusId === 2 ? (
                  <div className="mb-1 text-center">
                    <div className="d-flex justify-content-center">
                      <img src={icon_warning} height="35" alt="" />
                    </div>
                    <h5 className="my-2">
                      Terms and Conditions has not signed yet
                    </h5>
                    <p> Email is sent with credentials </p>
                    <Button
                      color="primary"
                      onClick={sendEmail}
                      disabled={buttonStatus}
                    >
                      {progress ? <ButtonLoader /> : "Send Email Again"}
                    </Button>
                  </div>
                ) : conscentData !== null &&
                  conscentData?.consentSignStatusId === 3 ? (
                  <div className="mb-1 text-center">
                    <div className="d-flex justify-content-center">
                      <img src={icon_success} height="35" alt="" />
                    </div>
                    <h5 className="my-2">
                      Terms and Conditions Signed Successfully
                    </h5>
                    <button className="btn btn-warning">
                      <span className="fas fa-download"> </span>{" "}
                      <span> Download pdf</span>
                    </button>
                  </div>
                ) : null}
              </>
            ) : userTypeId === userTypes?.Student.toString() ? (
              conscentData === null || conscentData?.isDeclared === false ? (
                <div className="mb-1 text-center">
                  <div className="d-flex justify-content-center">
                    <img src={icon_warning} height="35" alt="" />
                  </div>
                  <h5 className="my-2">
                    Terms and Conditions has not signed yet
                  </h5>
                  <p>
                    Before accepting, please read the terms and conditions
                    first.
                  </p>
                  <Button color="primary" onClick={handleTerms}>
                    {progress ? <ButtonLoader /> : "Accept Terms & Conditions"}
                  </Button>
                </div>
              ) : (
                <div className="mb-1 text-center">
                  <div className="d-flex justify-content-center">
                    <img src={icon_success} height="35" alt="" />
                  </div>
                  <h5 className="my-1">
                    Terms and Conditions Signed Successfully
                  </h5>
                  <button className="btn btn-warning">
                    <span className="fas fa-download"> </span>{" "}
                    <span> Download pdf</span>
                  </button>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <Link to="/search" className="btn btn-blue ml-3">
                      <span> Add Application</span>
                    </Link>
                  ) : null}
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDeclaration;
