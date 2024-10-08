import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import get from "../../../../../../../../helpers/get";
import post from "../../../../../../../../helpers/post";
import ButtonLoader from "../../../../../../Components/ButtonLoader";
import put from "../../../../../../../../helpers/put";
import { userTypes } from "../../../../../../../../constants/userTypeConstant";
import DetailsAndTermsNavigation from "../DetailsAndTermsNavigation";
import BreadCrumb from "../../../../../../../../components/breadCrumb/BreadCrumb";

const AdmissionManagerTermsAndConditions = () => {
  const history = useHistory();
  const [activetab, setActivetab] = useState("2");
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [conscentData, setConscentData] = useState({});
  const { admissionManagerId } = useParams();

  const userTypeId = localStorage.getItem("userType");

  const [apiInfo, setAPiInfo] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get(`AdmissionManagerConsent/Get/${admissionManagerId}`).then((res) => {
      setConscentData(res);
      console.log(res);
    });

    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res?.json())
      .then((data) => {
        setAPiInfo(data);
      });
  }, [success]);

  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("admissionManagerId", admissionManagerId);
    subData.append("IpAddress", apiInfo?.IPv4);
    setProgress(true);
    post("AdmissionManagerConsent/Sign", subData).then((res) => {
      setProgress(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
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
    put(`AdmissionManagerConsent/SendEmail/${admissionManagerId}`).then(
      (res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
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
      }
    );
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  return (
    <div>
      <div>
        <BreadCrumb
          title=" Admission Manager Terms and Conditions"
          backTo="Admission Manager Profile"
          path={`/admissionManagerProfile/${admissionManagerId}`}
        />

        <Card>
          <CardBody>
            {/* nav tabs start */}

            <DetailsAndTermsNavigation
              activetab={activetab}
              admissionManagerId={admissionManagerId}
            />

            {/* nav tabs end */}

            <div className="container">
              <div>
                <div>
                  <h5 className="mb-3">
                    {" "}
                    <b className="bg-u">Terms and Conditions</b>{" "}
                  </h5>
                </div>
                <span className="conscentText-style">
                  1. To conduct yourself with integrity, professionally and
                  ethically in a manner that will reflect positively and promote
                  the image of <b>SMS Higher Education Group</b>.
                </span>
                <br />
                <span className="conscentText-style">
                  2. Must follow and check the general entry criteria for
                  admission in colleges/universities i.e. valid passport,
                  required qualification, nationality.
                </span>
                <br />
                <span className="conscentText-style">
                  3. Must ensure all the paperwork, provided by the students is
                  true and accurate according to the data protection act, the
                  agency will not be responsible for any incorrect or fraudulent
                  documents.
                </span>
                <br />
                <span className="conscentText-style">
                  4. Our service for students is 100% free, nobody is allowed to
                  charge for any of the services.
                </span>
                <br />
                <span className="conscentText-style">
                  5. We provide guidance and support to our students, no one is
                  allowed to help the students in their coursework.
                </span>
                <br />
                <span className="conscentText-style">
                  6. Everybody needs to follow the universities’ guidelines and
                  respect their decisions.
                </span>
                <br />
                <span className="conscentText-style">
                  7. Our registered student cannot be passed at to any other
                  agency or third party.
                </span>
                <br />
                <span className="conscentText-style">
                  8. Follow the university guidelines, only offer our listed
                  courses to the students.
                </span>
                <br />
                <span className="conscentText-style">
                  9. Do not make any prior commitment to the student regarding
                  interview, admission, student finance, courses.
                </span>
                <br />
                <span className="conscentText-style">
                  10. Do not compare with the policy of other agency or
                  organisation and only follow our guidelines.
                </span>
                <br />
                <span className="conscentText-style">
                  11. Do not engage in any activity likely to damage SMS Higher
                  Education Group’s or our partner’s reputations, the activity
                  must be prohibited which likely to damage the academic or
                  professional reputation of any university or other entity
                  associated with the course.
                </span>
                <br />
                <span className="conscentText-style">
                  12. Always ensure to advice is given in a professional and
                  accurate manner.
                </span>
                <br />
                <span className="conscentText-style">
                  13. Anyone not able to follow any of these conditions, their
                  contract will be immediately terminated and might miss out
                  from any outstanding commissions and bonuses.
                </span>
                <br />
                <span className="conscentText-style">
                  14. I confirm my email address is accurate and can be
                  considered as my signature.
                </span>
              </div>
            </div>

            {conscentData == null || conscentData?.isSigned == false ? (
              <div className="conscentSign-style ms-md-3 py-1 mt-2">
                <span className="inner-term-style">
                  Terms and Conditions has not been Signed yet !!!!
                </span>
              </div>
            ) : (
              <div className="conscentSign-style2 ms-md-3 py-1 mt-2 text-white">
                <span className="inner-term-style">
                  Terms and Conditions Signed Successfully.
                </span>
              </div>
            )}

            <div className=" mt-1">
              <div>
                {userTypeId == userTypes?.SystemAdmin ||
                  userTypeId == userTypes?.Admin ||
                  userTypeId == userTypes?.ProviderAdmin ||
                  userTypeId == userTypes?.ComplianceManager ? (
                  <>
                    {conscentData == null ||
                      conscentData?.consentSignStatusId == 1 ? (
                      <div className="mb-1 text-right">
                        <Button
                          color="primary"
                          onClick={sendEmail}
                          disabled={buttonStatus}
                        >
                          {progress ? <ButtonLoader /> : "Send Email"}
                        </Button>
                      </div>
                    ) : conscentData !== null &&
                      conscentData?.consentSignStatusId == 2 ? (
                      <div className="mb-1 ms-3 right">
                        <span className="text-info">
                          {" "}
                          Email is sent with credentials{" "}
                        </span>
                        <Button
                          color="primary"
                          onClick={sendEmail}
                          disabled={buttonStatus}
                        >
                          {progress ? <ButtonLoader /> : "Send Email Again"}
                        </Button>
                      </div>
                    ) : conscentData !== null &&
                      conscentData?.consentSignStatusId == 3 ? (
                      <div className="mb-1 text-left ms-md-4">
                        <span>
                          Conscent Signed on:{" "}
                          <span className="fw-style">
                            {formatDate(conscentData?.consentSignTime)}
                          </span>
                        </span>
                        <br />
                        <span>
                          Conscent Signed on From Ip:{" "}
                          <span className="fw-style">
                            {" "}
                            {conscentData?.deviceIp}
                          </span>
                        </span>
                      </div>
                    ) : null}
                  </>
                ) : userTypeId == userTypes?.AdmissionManager ? (
                  conscentData == null || conscentData?.isSigned == false ? (
                    <div className="mt-1">
                      <Button color="primary" onClick={handleTerms}>
                        {progress ? (
                          <ButtonLoader />
                        ) : (
                          "Accept Terms & Conditions"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-1 text-left ms-md-4  ">
                      <span>
                        Conscent Signed on:{" "}
                        <span className="fw-style">
                          {formatDate(conscentData?.consentSignTime)}
                        </span>
                      </span>
                      <br />
                      <span>
                        Conscent Signed From Ip:
                        <span className="fw-style">
                          {" "}
                          {conscentData?.deviceIp}
                        </span>
                      </span>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdmissionManagerTermsAndConditions;
