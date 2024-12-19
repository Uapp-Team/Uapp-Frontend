import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Row } from "reactstrap";

import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import put from "../../../../../../helpers/put";
import UploadFile from "../../../../../../components/form/UploadFile";

const FamilyFunded = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList2, setFileList2] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const { addToast } = useToasts();
  const [familyFunding, setFamilyFunding] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [fileError, setFileError] = useState("");

  //  Dynamic2  COde Start

  useEffect(() => {
    get(`FamilyFunded/GetByStudentId/${studentid}`).then((res) => {
      setFamilyFunding(res);
      setAttachment(res?.attachement);
      setCheck(res);
    });
  }, [success, studentid]);

  // Dynamic2  code end

  const handleSubmit = async (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("familyFundedFile", FileList2);
    subData.append("attachement", attachment);

    // setButtonStatus(true);
    if (familyFunding?.id) {
      setProgress(true);
      await put(`FamilyFunded/Update`, subData).then((res) => {
        setProgress(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
      setFamilyFunding({});
      setSuccess(!success);
      history.push(`/addStudentEducationalInformation/${studentid}/${1}`);
      get(`FamilyFunded/GetByStudentId/${studentid}`).then((res) => {
        setFamilyFunding(res);
      });
    } else {
      setProgress(true);
      await post(`FamilyFunded/Create`, subData).then((res) => {
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
          type="hidden"
          name="studentId"
          id="studentId"
          value={studentid}
        />
        {familyFunding?.id ? (
          <input type="hidden" name="id" id="id" value={familyFunding?.id} />
        ) : null}
        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                Attachment (Relationship with sponsor, attach prove of fund )
              </span>
            </FormGroup>
            <UploadFile
              label="Upload Document"
              file={FileList2}
              id="avaterFile"
              setFile={setFileList2}
              defaultValue={attachment}
              setRemove={setAttachment}
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

export default FamilyFunded;
