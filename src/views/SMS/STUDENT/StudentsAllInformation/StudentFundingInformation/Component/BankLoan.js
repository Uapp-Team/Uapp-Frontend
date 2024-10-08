import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Col, FormGroup, Form, Row } from "reactstrap";
import { rootUrl } from "../../../../../../constants/constants";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../../helpers/get";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import uploadBtn from "../../../../../../assets/img/upload.png";
import downloadBtn from "../../../../../../assets/img/download.png";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import { useHistory } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const BankLoan = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList4, setFileList4] = useState([]);
  const [bLoanError, setBLoanError] = useState("");
  const { addToast } = useToasts();
  const [bankFunding, setBankFunding] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  //  Dynamic4  COde Start

  useEffect(() => {
    get(`BankLoan/GetByStudentId/${studentid}`).then((res) => {
      console.log(res);
      setBankFunding(res);
      setCheck(res);
    });
  }, [success, studentid]);

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setBLoanError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("bankLoanFile", FileList4[0]?.originFileObj);

    // setButtonStatus(true);
    setProgress(true);
    post(`BankLoan/Create`, subData).then((res) => {
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
          name="studentId"
          id="studentId"
          value={studentid}
          type="hidden"
        />

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
                  fileList={FileList4}
                  onChange={handleChange4}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList4.length < 1 ? (
                    <img className="mb-1" src={uploadBtn} alt="" />
                  ) : (
                    ""
                  )}
                </Upload>

                <div className="text-danger d-block">{bLoanError}</div>
              </Col>

              <Col sm="4">
                {bankFunding?.attachement ? (
                  <a href={rootUrl + bankFunding?.attachement} target="blank">
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

export default BankLoan;
