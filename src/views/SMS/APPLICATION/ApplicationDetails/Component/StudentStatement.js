import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../constants/userTypeConstant";
import { useToasts } from "react-toast-notifications";
import put from "../../../../../helpers/put";
import { Link } from "react-router-dom/cjs/react-router-dom";
import UploadButton from "../../../../../components/buttons/UploadButton";
// import StatementStatus from "./Status/StatementStatus";
// import { permissionList } from "../../../../../constants/AuthorizationConstant";

const StudentStatement = ({ stdId, applicationInfo, success, setSuccess }) => {
  // const { id, stdId } = useParams();
  const { addToast } = useToasts();
  // const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [statement, setStatement] = useState("");
  const [getId, setGetId] = useState(0);
  const [scanId, setScanId] = useState("");
  const [result, setResult] = useState("");
  const [stringData, setStringData] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress1, setProgress1] = useState(false);

  function countWords(str) {
    const arr = str?.split(" ");
    return arr?.filter((word) => word !== "")?.length;
  }

  useEffect(() => {
    get(`PersonalStatement/GetByStudentId/${stdId}`).then((res) => {
      setGetId(res?.id);
      setStatement(res?.statement);
      setStringData(countWords(res?.statement));
      setScanId(res?.scanId);
    });
  }, [stdId]);

  useEffect(() => {
    const handleRes = () => {
      post(`${scanId}/checkResult`).then((res) => {
        if (!res?.data?.completedCallback) {
          setTimeout(handleRes, 10000);
        } else setResult(res?.data?.completedCallback?.results);
      });
    };
    if (scanId) {
      handleRes();
    }
  }, [scanId]);

  const checkPlagiarism = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append("value", getId);

    setButtonStatus(true);
    setProgress(true);
    post(`CheckPlagarism/Submit`, subData).then((res) => {
      setScanId(res?.data?.scanId);
      setResult("");
      setButtonStatus(false);
      setProgress(false);
    });
  };

  const handleSend = (e) => {
    e.preventDefault();

    setButtonStatus1(true);
    setProgress1(true);
    put(`PersonalStatement/Recheck/${getId}`).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      setButtonStatus1(false);
      setProgress1(false);
    });
  };
  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <>
          {statement && scanId ? (
            <>
              {result ? (
                <>
                  <Row>
                    <Col>
                      <div className="custom-card-border p-20px mb-4 h-300px py-5">
                        <div className="text-center">
                          <h1
                            className={
                              result?.score?.aggregatedScore < 25
                                ? `text-success fw-600`
                                : result?.score?.aggregatedScore < 50
                                ? `text-warning fw-600`
                                : `text-danger fw-600`
                            }
                          >
                            {result?.score?.aggregatedScore}%
                          </h1>
                          <h3
                            className={
                              result?.score?.aggregatedScore < 25
                                ? `text-success fw-600`
                                : result?.score?.aggregatedScore < 50
                                ? `text-warning fw-600`
                                : `text-danger fw-600`
                            }
                          >
                            Plagiarism
                          </h3>
                        </div>
                        <div className="mt-5">
                          <h4>
                            Identical Words: {result?.score?.identicalWords}
                          </h4>
                          <h4>
                            Related Words: {result?.score?.relatedMeaningWords}
                          </h4>
                          <h4>
                            Minor Words: {result?.score?.minorChangedWords}
                          </h4>
                        </div>
                      </div>
                    </Col>
                    <Col className="mb-0">
                      <div className="custom-card-border p-4 overflowY-300px h-300px">
                        <h4>Internet Results</h4>
                        {result?.internet.length > 0 ? (
                          result?.internet?.map((item, i) => (
                            <div
                              key={i}
                              className="custom-card-border p-3 mb-3"
                            >
                              <h6>
                                <a href={item.url} target="blank">
                                  {item.title}
                                </a>
                              </h6>
                              <p className="mb-0">
                                Similar Words: {item?.similarWords}
                              </p>
                              <p className="mb-0" p>
                                Identical Words: {item?.identicalWords}
                              </p>
                              <p className="mb-0" p>
                                Plagiarism:{" "}
                                {(
                                  (item?.identicalWords / stringData) *
                                  100
                                ).toFixed(2)}
                                %
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-center my-5 py-5">
                            Nothing matches found on the internet
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <p className="text-right">
                    Powered BY <a href="https://copyleaks.com/"> COPYLEAKS</a>
                  </p>
                </>
              ) : (
                <div className="custom-card-border px-4 text-center py-5 mb-4">
                  <h4>Plagiarism Checking in process </h4>
                  <div class="spinner-border text-success my-5"></div>
                  <h4>Please wait while process result</h4>
                </div>
              )}
            </>
          ) : statement && !scanId ? (
            <div className="custom-card-border px-4 text-center py-5 mb-4">
              <h4>Plagiarism is not checked</h4>
              {(userType === userTypes?.SystemAdmin ||
                userType === userTypes?.Admin ||
                userType === userTypes?.AdmissionManager ||
                userType === userTypes?.AdmissionOfficer) && (
                <Form onSubmit={checkPlagiarism}>
                  <input type="hidden" name="id" id="id" value={getId} />

                  <input
                    type="hidden"
                    name="studentId"
                    id="studentId"
                    value={stdId}
                  />

                  <SaveButton
                    text="Check Plagiarism"
                    buttonStatus={buttonStatus}
                    progress={progress}
                    // action={(e) => checkPlagiarism(e)}
                  />
                </Form>
              )}
            </div>
          ) : null}
        </>

        {(userType === userTypes?.SystemAdmin ||
          userType === userTypes?.AdmissionManager) && (
          <>
            {result?.score?.aggregatedScore > 25 && (
              <div className="custom-card-border px-4 text-center py-5 mb-4">
                <h5>Ask student to provide personal statement again</h5>
                <Form onSubmit={handleSend}>
                  <input type="hidden" name="id" id="id" value={getId} />

                  <input
                    type="hidden"
                    name="studentId"
                    id="studentId"
                    value={stdId}
                  />

                  <div className="text-right">
                    <SaveButton
                      text="Send"
                      buttonStatus={buttonStatus1}
                      progress={progress1}
                    />
                  </div>
                </Form>
              </div>
            )}
          </>
        )}

        {statement ? (
          <>
            <div className="d-flex justify-content-between">
              <h3>Statement</h3>
              <h6>
                <b>Word Count: {stringData}</b>
              </h6>
            </div>
            <p className="text-justify">{statement}</p>
          </>
        ) : (
          <>
            {userType === userTypes?.Student ? (
              <div className="text-center my-5 py-5">
                <p> No statement added</p>
                <Link
                  className="text-id hover"
                  to={`/addPersonalStatement/${stdId}`}
                >
                  <UploadButton />
                </Link>
              </div>
            ) : (
              <p className="text-center my-5 py-5">
                No statement added by student
              </p>
            )}
          </>
        )}
      </div>

      {/* {applicationInfo?.applicationSubStatusId !== 38 && (
        <>
          {permissions?.includes(
            permissionList.Update_Application_Assesment
          ) ? (
            <StatementStatus
              id={applicationInfo?.id}
              success={success}
              setSuccess={setSuccess}
            />
          ) : null}
        </>
      )} */}
    </>
  );
};

export default StudentStatement;
