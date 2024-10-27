import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Form, Row } from "reactstrap";
import { rootUrl } from "../../../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../../helpers/post";
import get from "../../../../../../helpers/get";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import { useHistory } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import UploadButton from "../../../../../../components/buttons/UploadButton";
import DownloadButton from "../../../../../../components/buttons/DownloadButton";

const Scholarship = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList5, setFileList5] = useState([]);
  const [scholarshipError, setScholarshipError] = useState("");
  const { addToast } = useToasts();
  const [scholarshipFunding, setScholarshipFunding] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  //  Dynamic5  COde Start

  useEffect(() => {
    get(`Scholarship/GetByStudentId/${studentid}`).then((res) => {
      console.log(res);
      setScholarshipFunding(res);
      setCheck(res);
    });
  }, [success, studentid]);

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setScholarshipError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    // setButtonStatus(true);
    setProgress(true);

    subData.append("scholarshipFile", FileList5[0]?.originFileObj);

    post(`Scholarship/Create`, subData).then((res) => {
      // setButtonStatus(false);
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        history.push(`/addStudentEducationalInformation/${studentid}/${1}`);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const handlePrevious = () => {
    history.push(`/addStudentApplicationInformation/${studentid}/${1}`);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          type="hidden"
          name="studentId"
          id="studentId"
          value={studentid}
        />
        <Row>
          {" "}
          <Col lg="6" md="8">
            <FormGroup>
              <span>Scholarship</span>
              <Input
                className="form-mt"
                // style={{ width: "429px" }}
                type="textarea"
                placeholder="Add name, amount in the box"
                name="details"
                id="details"
                defaultValue={scholarshipFunding?.details}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                Attachment ( If already applied please attach prove, If not we
                will ask latter)
              </span>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <span>Upload Image:</span>
              </Col>
              <Col sm="4">
                <Upload
                  multiple={false}
                  fileList={FileList5}
                  onChange={handleChange5}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList5.length < 1 ? <UploadButton /> : ""}
                </Upload>

                <div className="text-danger d-block">{scholarshipError}</div>
              </Col>

              <Col sm="4">
                {scholarshipFunding?.attachement ? (
                  <a
                    href={rootUrl + scholarshipFunding?.attachement}
                    target="blank"
                  >
                    <DownloadButton />
                  </a>
                ) : null}
              </Col>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="8">
            <div>
              <input
                onChange={(e) => {
                  setCheck(e.target.checked);
                }}
                type="checkbox"
                name=""
                value=""
                checked={check}
              />{" "}
              <span>
                I confirm that all the information provided about my source fund
                is true, complete and accurate.
              </span>
            </div>
          </Col>
        </Row>
        <Row className=" mt-4">
          <Col lg="6" md="8" className="d-flex justify-content-between">
            <PreviousButton action={handlePrevious} />
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <>
                {check && (
                  <SaveButton text="Save and Next" progress={progress} />
                )}
              </>
            ) : null}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Scholarship;
