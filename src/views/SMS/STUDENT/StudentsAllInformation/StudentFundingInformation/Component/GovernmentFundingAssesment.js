import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Col, FormGroup, Input, Form, Row } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import { useHistory } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const GovernmentFundingAssesment = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [govtFunding, setGovtFunding] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`GovernmentLoanFund/GetByStudentId/${studentid}`).then((res) => {
      setGovtFunding(res);
      setDetails(res?.details);
      setCheck(res);
    });
  }, [success, studentid]);

  const handleDetails = (e) => {
    setDetails(e.target.value);
    if (e.target.value === "") {
      setDetailsError("Please write Government Loan/Fund");
    } else {
      setDetailsError("");
    }
  };

  const handleSubmitOfGoverment = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    if (!details) {
      setDetailsError("Please write Government Loan/Fund");
    } else {
      // setButtonStatus(true);
      setProgress(true);

      post(`GovernmentLoanFund/Create`, subData).then((res) => {
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
    <>
      <Form onSubmit={handleSubmitOfGoverment} className="">
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
              <span className="text-danger">*</span>{" "}
              <span>Government Loan/Fund</span>
              <Input
                className="form-mt"
                // style={{ width: "429px" }}
                type="textarea"
                placeholder="Add loan amount in the box"
                name="details"
                id="details"
                onChange={(e) => {
                  handleDetails(e);
                }}
                defaultValue={govtFunding?.details}
              />
              <span className="text-danger">{detailsError}</span>
            </FormGroup>
            <FormGroup>
              <div className="pt-1">
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
                  I confirm that all the information provided about my source
                  fund is true, complete and accurate.
                </span>
              </div>
            </FormGroup>
            <FormGroup className="mt-4  d-flex justify-content-between">
              <PreviousButton action={handlePrevious} />
              {permissions?.includes(permissionList?.Edit_Student) ? (
                <>
                  {check && (
                    <SaveButton text="Save and Next" progress={progress} />
                  )}
                </>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default GovernmentFundingAssesment;
