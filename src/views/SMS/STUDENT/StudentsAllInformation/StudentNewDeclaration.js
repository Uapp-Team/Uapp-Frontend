import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import get from "../../../../helpers/get";
import DOMPurify from "dompurify";
import Loader from "../../Search/Loader/Loader";
import { userTypes } from "../../../../constants/userTypeConstant";

const StudentNewDeclaration = () => {
  const { applicationStudentId } = useParams();
  const referenceId = localStorage.getItem("referenceId");
  const [studentDetails, setStudentDetails] = useState({});
  const [conscentData, setConscentData] = useState({});
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = applicationStudentId ? applicationStudentId : referenceId;

  useEffect(() => {
    get(`UserTermsAndConditions/Get/${userTypes.Student}/${userId}`).then(
      (res) => {
        setLoading(false);
        setCurrentUserDetails(res);
      }
    );
  }, [userId]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    get(`Student/Get/${userId}`).then((res) => {
      setStudentDetails(res);
    });

    get(`StudentConsent/Get/${userId}`).then((res) => {
      setConscentData(res);
    });
  }, [userId]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  return (
    <div>
      {" "}
      <BreadCrumb
        title="Student Declaration"
        backTo={applicationStudentId ? "Student Terms & Conditions" : null}
        path={`/studentDeclaration/${applicationStudentId}`}
      />
      {currentUserDetails?.details !== "<p><br></p>" &&
        currentUserDetails?.details !== "<p> </p>" &&
        currentUserDetails?.details !== "<h5><br></h5>" && (
          <Card>
            <CardBody id="application">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {currentUserDetails?.details !== "<p><br></p>" &&
                    currentUserDetails?.details !== "<p> </p>" &&
                    currentUserDetails?.details !== "<h5><br></h5>" && (
                      <div>
                        {currentUserDetails?.userName && (
                          <h2 className="mb-3 ">
                            <b className="bg-u">
                              INDEX FOR UAPP{" "}
                              <span style={{ color: "#fc7300" }}>
                                {" "}
                                {currentUserDetails?.userName}
                              </span>{" "}
                              HANDBOOK
                            </b>
                          </h2>
                        )}

                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            currentUserDetails?.details
                          )}
                        ></div>
                        <div className="mt-4">
                          {conscentData?.isDeclared === true ? (
                            <>
                              {" "}
                              <p>
                                <b style={{ marginRight: "7px" }}>Email:</b>
                                <span>{studentDetails?.email}</span>
                              </p>
                              <p>
                                <b style={{ marginRight: "7px" }}>IP:</b>
                                <span>{conscentData?.consentFromIp}</span>
                              </p>
                              <p>
                                <b style={{ marginRight: "7px" }}>
                                  Consent Status:
                                </b>
                                <span>
                                  {conscentData?.isDeclared === true
                                    ? "Signed"
                                    : "Not Signed"}
                                </span>
                              </p>
                              <p>
                                <b style={{ marginRight: "7px" }}>
                                  Name/Signature:
                                </b>
                                <span className="signature-student">
                                  {studentDetails?.firstName}{" "}
                                  {studentDetails?.lastName}
                                </span>
                              </p>
                              <p>
                                <b style={{ marginRight: "7px" }}>
                                  Date & Time:
                                </b>
                                {formatDate(conscentData?.consentSignTime)}
                              </p>
                              <br /> <br />
                              <br />
                              <br />
                              <p>
                                <b style={{ marginRight: "7px" }}>
                                  SIGNED ON BEHALF OF THE FIRM:
                                </b>
                                <span className="signature-student"></span>
                              </p>
                              <p>
                                <b style={{ marginRight: "7px" }}>DATE:</b>
                                <span className="signature-student"></span>
                              </p>
                              <p>
                                <b style={{ marginRight: "7px" }}>
                                  EMAIL ADDRESS:
                                </b>
                                <span className="signature-student"></span>
                              </p>
                            </>
                          ) : null}
                        </div>
                      </div>
                    )}
                </>
              )}
            </CardBody>
          </Card>
        )}
    </div>
  );
};

export default StudentNewDeclaration;
