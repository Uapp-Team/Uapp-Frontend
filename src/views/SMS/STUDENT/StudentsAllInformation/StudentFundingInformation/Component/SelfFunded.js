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
const SelfFunded = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList1, setFileList1] = useState(null);
  const [fileError, setFileError] = useState("");
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();
  const [selfFunding, setSelfFunding] = useState({});
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  //  Dynamic1  COde Start

  useEffect(() => {
    get(`SelfFunded/GetByStudentId/${studentid}`).then((res) => {
      console.log(res);
      setSelfFunding(res);

      setCheck(res);
    });
  }, [success, studentid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("SelfFundedFile", FileList1);

    if (selfFunding?.id) {
      setProgress(true);
      await put("SelfFunded/Update", subData).then((res) => {
        setProgress(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
      setSelfFunding({});
      setSuccess(!success);
      history.push(`/addStudentEducationalInformation/${studentid}/${1}`);
      get(`SelfFunded/GetByStudentId/${studentid}`).then((res) => {
        setSelfFunding(res);
      });
    } else {
      setProgress(true);
      await post(`SelfFunded/Create`, subData).then((res) => {
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
          type="hidden"
          name="studentId"
          id="studentId"
          value={studentid}
        />
        {selfFunding?.id ? (
          <input type="hidden" name="id" id="id" value={selfFunding?.id} />
        ) : null}
        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                Attachment (Bank statement, Job Reference with Salary Amount or
                Business Certificate)
              </span>
            </FormGroup>

            <UploadFile
              label="Upload Document"
              file={FileList1}
              id="avaterFile"
              setFile={setFileList1}
              defaultValue={selfFunding?.attachement}
              error={fileError}
              setrror={setFileError}
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

export default SelfFunded;
