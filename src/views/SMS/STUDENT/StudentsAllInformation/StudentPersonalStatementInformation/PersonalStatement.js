import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Col, Input, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import downloadBtn from "../../../../../assets/img/download.png";
import uploadBtn from "../../../../../assets/img/upload.png";
import { rootUrl } from "../../../../../constants/constants";
import { Upload } from "antd";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";

const PersonalStatement = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [statement, setStatement] = useState("");
  const [id, setId] = useState(0);
  const [stringData, setStringData] = useState(0);
  const { applicationStudentId, update } = useParams();
  const [FileList, setFileList] = useState([]);
  const [idFileError, setFileError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attachmenturl, setAttachmenturl] = useState("");
  const [stateMentError, setStateMentError] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get(`PersonalStatement/GetByStudentId/${applicationStudentId}`).then(
      (res) => {
        setStatement(res?.statement);
        setAttachmenturl(res?.statementAttachment);
        setStringData(countWords(res?.statement));
        setId(res?.studentId);
      }
    );
  }, [success, applicationStudentId]);

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

  const checkPlagiarism = (e) => {
    console.log(e.target.value);
  };

  const handleFile = ({ fileList }) => {
    setFileList(fileList);
    setFileError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append(
      "StatementAttachmentFile",
      FileList.length === 0 ? null : FileList[0]?.originFileObj
    );

    let value = 0;

    for (value of subData) {
      console.log("valuesss", value);
    }

    if (!statement) {
      setStateMentError("Statement is required");
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
          history.push(`/addOtherInformation/${applicationStudentId}`);
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
          <Form onSubmit={handleSubmit}>
            <p className="section-title">Personal Statement</p>

            {update || id ? (
              <input type="hidden" name="id" id="id" value={id} />
            ) : null}
            <input
              type="hidden"
              name="studentId"
              id="studentId"
              value={applicationStudentId}
            />
            <Row>
              <Col lg="6" md="8">
                <FormGroup>
                  <Row>
                    <Col>
                      <span>Attach Document</span>
                    </Col>
                    <Col>
                      <Upload
                        multiple={false}
                        fileList={FileList}
                        onChange={handleFile}
                        beforeUpload={(file) => {
                          return false;
                        }}
                        style={{ height: "32px" }}
                      >
                        {FileList.length < 1 ? (
                          <img className="mb-1" src={uploadBtn} alt="" />
                        ) : (
                          ""
                        )}
                      </Upload>
                      {idFileError && (
                        <span className="text-danger">File is required </span>
                      )}
                    </Col>
                    <Col>
                      {attachmenturl ? (
                        <a href={rootUrl + attachmenturl} target="blank">
                          <img className="mb-1" src={downloadBtn} alt="" />
                        </a>
                      ) : null}
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
                    rows={5}
                    defaultValue={statement}
                    onChange={handleStringData}
                    onBlur={checkPlagiarism}
                  />

                  <div className="d-flex justify-content-between">
                    <div className="text-danger">{stateMentError}</div>
                    <div className="text-right">
                      {stringData} / min word-300
                    </div>
                  </div>
                </FormGroup>

                <FormGroup className="d-flex justify-content-between mt-4">
                  <PreviousButton action={goPrevious} />
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <SaveButton
                      text="Save and Next"
                      progress={progress}
                      buttonStatus={stringData < 300 || buttonStatus}
                    />
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default PersonalStatement;
