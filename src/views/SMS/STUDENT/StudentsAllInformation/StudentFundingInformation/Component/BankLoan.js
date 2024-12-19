import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Col, Form, FormGroup, Row } from "reactstrap";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import put from "../../../../../../helpers/put";
import UploadFile from "../../../../../../components/form/UploadFile";

const BankLoan = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList1, setFileList1] = useState(null);
  const { addToast } = useToasts();
  const [bankFunding, setBankFunding] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [selfError, setSelfError] = useState("");

  //  Dynamic4  COde Start

  useEffect(() => {
    get(`BankLoan/GetByStudentId/${studentid}`).then((res) => {
      setBankFunding(res);
      setCheck(res);
    });
  }, [success, studentid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("bankLoanFile", FileList1);

    if (bankFunding?.id) {
      setProgress(true);
      await put(`BankLoan/Update`, subData).then((res) => {
        setProgress(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
      setBankFunding({});
      setSuccess(!success);
      history.push(`/addStudentEducationalInformation/${studentid}/${1}`);
      get(`BankLoan/GetByStudentId/${studentid}`).then((res) => {
        setBankFunding(res);
      });
    } else {
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
    }
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
        {bankFunding?.id ? (
          <input type="hidden" name="id" id="id" value={bankFunding?.id} />
        ) : null}
        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                Attachment ( If already applied please attach prove, If not we
                will ask latter)
              </span>
            </FormGroup>
            <UploadFile
              label="Upload Document"
              file={FileList1}
              id="avaterFile"
              setFile={setFileList1}
              defaultValue={bankFunding?.attachement}
              error={selfError}
              setrror={setSelfError}
            />
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
                I hereby affirm that all the information provided regarding my
                source of funds is true, complete, and accurate.
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
