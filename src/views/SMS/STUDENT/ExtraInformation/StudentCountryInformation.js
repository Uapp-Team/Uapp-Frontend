import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Col,
  Button,
} from "reactstrap";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import ButtonLoader from "../../Components/ButtonLoader";
import StudentNavigation from "../StudentsAllInformation/StudentNavigationAndRegister/StudentNavigation";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const StudentCountryInformation = () => {
  const { applicationStudentId, update } = useParams();
  const history = useHistory();
  const [university, setUniversity] = useState([]);
  const [uniLabel, setUniLabel] = useState("Select Country");
  const [uniValue, setUniValue] = useState(0);
  const [uniError, setUniError] = useState("");
  const [success, setSuccess] = useState(false);
  const [studentCountryInfo, setStudentCountryInfo] = useState({});
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    get("UniversityCountryDD/Index").then((res) => {
      setUniversity(res);
    });

    get(`StudentApplicationCountry/Get?studentId=${applicationStudentId}`).then(
      (res) => {
        console.log(res);
        setStudentCountryInfo(res);
        setUniLabel(res?.countryName);
      }
    );
  }, [success]);

  const uniOptions = university?.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const selectUniversity = (label, value) => {
    setUniError("");
    setUniLabel(label);
    setUniValue(value);
  };

  const backToStudentProfile = () => {
    history.push(`/studentProfile/${applicationStudentId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (uniValue == 0) {
      setUniError("Country is required");
    } else {
      setProgress(true);
      setButtonStatus(true);
      put(
        `StudentApplicationCountry/Add?studentId=${applicationStudentId}&country=${uniValue}`
      ).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.result == true) {
          addToast("Preferred country added", {
            appearance: "success",
            autoDismiss: "true",
          });
          setSuccess(!success);
        } else {
          addToast("Something went wrong ", {
            appearance: "error",
            autoDismiss: "true",
          });
        }
      });
    }
  };

  //

  return (
    <div>
      <BreadCrumb
        title="Country Information"
        backTo="Student Profile"
        path={`/studentProfile/${applicationStudentId}`}
      />

      <Card>
        <CardBody>
          <StudentNavigation studentid={applicationStudentId} activetab={"1"} />

          <div className="hedding-titel d-flex justify-content-between mb-4 mt-5">
            <div>
              <h5>
                {" "}
                <b>What is your preferred study destination?</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>
          </div>

          {/* { */}

          <Form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="'studentId"
              id="studentId"
              value={applicationStudentId}
            />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Country <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={uniOptions}
                  value={{ label: uniLabel, value: uniValue }}
                  onChange={(opt) => selectUniversity(opt.label, opt.value)}
                />
                <span className="text-danger">{uniError}</span>
              </Col>
            </FormGroup>

            <div className="row">
              <div className=" col-md-8 d-flex justify-content-end">
                <Button color="primary" disabled={buttonStatus} type="submit">
                  {progress ? <ButtonLoader /> : "Save"}
                </Button>
              </div>
            </div>
          </Form>

          <div className="d-flex justify-content-end">
            <Button
              onClick={() => {
                history.push(
                  `/addStudentInformation/${applicationStudentId}/${1}`
                );
              }}
              color="warning"
            >
              Next <i className="fas fa-arrow-right-long ml-1"></i>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentCountryInformation;
