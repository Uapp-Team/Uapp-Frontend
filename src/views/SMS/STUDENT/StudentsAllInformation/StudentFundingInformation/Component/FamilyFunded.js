import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Col, FormGroup, Form, Row } from "reactstrap";

import { rootUrl } from "../../../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../../helpers/post";
import get from "../../../../../../helpers/get";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import uploadBtn from "../../../../../../assets/img/upload.png";
import downloadBtn from "../../../../../../assets/img/download.png";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import { useHistory } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const FamilyFunded = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList2, setFileList2] = useState([]);
  const [familyError, setFamilyError] = useState("");
  const { addToast } = useToasts();
  const [familyFunding, setFamilyFunding] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  //  Dynamic2  COde Start

  useEffect(() => {
    get(`FamilyFunded/GetByStudentId/${studentid}`).then((res) => {
      console.log(res);
      setFamilyFunding(res);
      setCheck(res);
    });
  }, [success, studentid]);

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
    setFamilyError("");
  };

  // Dynamic2  code end

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("familyFundedFile", FileList2[0]?.originFileObj);
    // setButtonStatus(true);
    setProgress(true);
    post(`FamilyFunded/Create`, subData).then((res) => {
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
        <input
          type="hidden"
          name="studentId"
          id="studentId"
          value={studentid}
        />

        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                Attachment (Relationship with sponsor, attach prove of fund )
              </span>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <span>Upload Image:</span>
              </Col>
              <Col sm="4">
                <Upload
                  multiple={false}
                  fileList={FileList2}
                  onChange={handleChange2}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList2.length < 1 ? (
                    <img className="mb-1" src={uploadBtn} alt="" />
                  ) : (
                    ""
                  )}
                </Upload>

                <div className="text-danger d-block">{familyError}</div>
              </Col>

              <Col sm="4">
                {familyFunding?.attachement ? (
                  <a href={rootUrl + familyFunding?.attachement} target="blank">
                    <img className="mb-1" src={downloadBtn} alt="" />
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

export default FamilyFunded;
