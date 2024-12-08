import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import PlagiarismResultPdf from "./PlagiarismResultPdf";

const PersonalStatement = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { applicationStudentId, update } = useParams();
  const [statement, setStatement] = useState("");
  const [scanId, setScanId] = useState("");
  const [result, setResult] = useState("");
  const [id, setId] = useState(0);
  const [requireRecheck, setRequireRecheck] = useState(true);
  const [stringData, setStringData] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [stateMentError, setStateMentError] = useState("");
  const [fileName, setFileName] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [personalStatementResult, setPersonalStatementResult] = useState(null);
  const [nav, setNav] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const navigation = await get(
          `StudentNavbar/Get/${applicationStudentId}`
        );
        setNav(navigation);
        get(`PersonalStatement/GetByStudentId/${applicationStudentId}`).then(
          (res) => {
            setPersonalStatementResult(res);
            setRequireRecheck(res?.requireRecheck ? res?.requireRecheck : true);
            setStatement(res?.statement);
            setStatement(res?.statement);
            setStringData(countWords(res?.statement));
            setId(res?.studentId);
            setScanId(res?.scanId);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [success, applicationStudentId]);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (file.type !== "text/plain") {
      setStateMentError("Invalid File Type. Please Select a .txt File");
      return;
    }
    setStateMentError("");
    setFileName(file.name);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileText = e.target.result;
        setStatement(fileText);
        setStringData(countWords(fileText));
        if (e.target.value === "") {
          setStateMentError("Statement is required");
        } else {
          setStateMentError("");
        }
      };

      reader.readAsText(file);
    }
  };

  function countWords(str) {
    const arr = str?.split(" ");
    return arr?.filter((word) => word !== "")?.length;
  }

  const handleStringData = (e) => {
    setStringData(countWords(e.target.value));
    setStatement(e.target.value);
    if (e.target.value === "") {
      setStateMentError("Statement is required");
    } else {
      setStateMentError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("statement", statement);
    subData.append("scanId", scanId);

    if (!statement) {
      setStateMentError("Statement is required");
    } else if (stringData < 300) {
      setStateMentError("Minimum 300 Word required");
    } else {
      setButtonStatus(true);
      setProgress(true);
      post("PersonalStatement/Save", subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
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
      });
    }
  };

  const goPrevious = () => {
    history.push(`/addStudentEmergencyInformation/${applicationStudentId}`);
  };
  const goNext = () => {
    history.push(`/addOtherInformation/${applicationStudentId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Personal Statement"
        backTo={userType === userTypes.Student ? null : "Student"}
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"9"}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <p className="section-title">Personal Statement</p>
          <Row>
            <Col lg="6" md="6">
              {requireRecheck ? (
                <Form onSubmit={handleSubmit} className="mb-4">
                  {update || id ? (
                    <input type="hidden" name="id" id="id" value={id} />
                  ) : null}
                  <input
                    type="hidden"
                    name="studentId"
                    id="studentId"
                    value={applicationStudentId}
                  />

                  <FormGroup>
                    <Row>
                      <Col>
                        <span>Attach Document</span>
                      </Col>
                      <Col>
                        <label htmlFor="inputImage">
                          <span className="upload-button mb-1 pointer">
                            <i class="fas fa-plus"></i> Upload
                          </span>
                        </label>

                        <input
                          type="file"
                          accept=".txt"
                          className="d-none mb-1"
                          id="inputImage"
                          onChange={(e) => handleFileChange(e)}
                        />
                        <div className="mt-3">
                          {fileName ? (
                            <p>{fileName}</p>
                          ) : stateMentError ? (
                            <div className="text-danger">{stateMentError}</div>
                          ) : (
                            <p>Only .txt file are allowed</p>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span> Write here
                    </span>

                    <Input
                      type="textarea"
                      name="statement"
                      id="statement"
                      rows={12}
                      value={statement}
                      onChange={(e) => handleStringData(e)}
                      // onBlur={checkPlagiarism}
                    />

                    <div className="d-flex justify-content-between">
                      <div className="text-danger">{stateMentError}</div>
                      <div className="text-right">
                        {stringData} / min word-300
                      </div>
                    </div>
                  </FormGroup>

                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <SaveButton
                      buttonStatus={buttonStatus}
                      progress={progress}
                    />
                  ) : null}
                </Form>
              ) : (
                <div className="custom-card-border px-4 py-5 mb-4">
                  <h3>Statement</h3>
                  <p className="text-justify">{statement}</p>
                </div>
              )}
            </Col>

            <Col lg="6" md="6">
              {scanId ? (
                <>
                  {result ? (
                    <>
                      <p className="text-right">
                        <PlagiarismResultPdf
                          studentId={applicationStudentId}
                          result={result}
                          stringData={stringData}
                        />
                      </p>
                      <div className="custom-card-border p-20px mb-4 d-flex justify-content-between">
                        <div>
                          <p className="mb-0">
                            Identical Words: {result?.score?.identicalWords}
                          </p>
                          <p className="mb-0">
                            Related Words: {result?.score?.relatedMeaningWords}
                          </p>
                          <p className="mb-0">
                            Minor Words: {result?.score?.minorChangedWords}
                          </p>
                        </div>

                        <div className="text-center">
                          <h3
                            className={
                              result?.score?.aggregatedScore < 25
                                ? `text-success fw-600`
                                : result?.score?.aggregatedScore < 50
                                ? `text-warning fw-600`
                                : `text-danger fw-600`
                            }
                          >
                            {result?.score?.aggregatedScore}%
                          </h3>
                          <h6
                            className={
                              result?.score?.aggregatedScore < 25
                                ? `text-success fw-600`
                                : result?.score?.aggregatedScore < 50
                                ? `text-warning fw-600`
                                : `text-danger fw-600`
                            }
                          >
                            Plagiarism
                          </h6>
                        </div>
                      </div>
                      <div className="custom-card-border p-4 overflowY-300px">
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
                          <p className="text-center">
                            Nothing matches found on the internet
                          </p>
                        )}
                      </div>
                      <p className="text-right">
                        Powered BY{" "}
                        <a href="https://copyleaks.com/"> COPYLEAKS</a>
                      </p>
                    </>
                  ) : (
                    <div className="custom-card-border px-4 text-center py-5">
                      <h4>Plagiarism Checking in process </h4>
                      <div class="spinner-border text-success my-5"></div>
                      <h4 className="my-5">Please wait while process result</h4>
                    </div>
                  )}
                </>
              ) : id > 0 ? (
                <div className="custom-card-border px-4 text-center py-5">
                  <h4 className="my-5">Plagiarism is not checked</h4>
                </div>
              ) : (
                <div className="custom-card-border px-4 text-center py-5">
                  <h4 className="my-5">
                    Upload file and write on the text box then save it
                  </h4>
                </div>
              )}
            </Col>
          </Row>

          <FormGroup className="d-flex justify-content-between mt-4">
            <PreviousButton action={goPrevious} />
            {personalStatementResult && nav?.others && (
              <SaveButton text="Next" action={goNext} />
            )}
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default PersonalStatement;
