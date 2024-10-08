import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
import get from "../../../../../helpers/get";
import { useHistory, useParams } from "react-router-dom";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import remove from "../../../../../helpers/remove";
import put from "../../../../../helpers/put";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

import moment from "moment";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import EducationalForm from "./EducationalForm";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { currentDate } from "../../../../../components/date/calenderFormate";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";

const EducationalInformation = () => {
  const { applicationStudentId } = useParams();
  const activetab = "5";
  const history = useHistory();
  const [educationLevel, setEducationLevel] = useState([]);
  const [educationLevelLabel, setEducationLevelLabel] = useState(
    "Select Education Level"
  );
  const [educationLevelValue, setEducationLevelValue] = useState(0);
  const [progress, setProgress] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [forms, setForms] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [eduDetails, setEduDetails] = useState([]);
  const [oneData, setOneData] = useState([]);
  const [isAchieved, setAchieved] = useState(false);
  const { addToast } = useToasts();

  const [programError, setProgramError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [qualificationSubject, setQualificationSubject] = useState("");
  const [qualificationSubjectError, setQualificationSubjectError] =
    useState("");
  const [attendedFrom, setAttendedFrom] = useState(currentDate);
  const [attendedFromError, setAttendedFromError] = useState("");
  const [attendedTo, setAttendedTo] = useState(currentDate);
  const [attendedToError, setAttendedToError] = useState("");
  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");
  const [institution, setInstitution] = useState("");
  const [institutionError, setInstitutionError] = useState("");
  const [percentage, setPercentage] = useState("");
  const [percentageError, setPercentageError] = useState("");
  const minDate = "1950-01-01";
  const [instituteContactNumber, setInstituteContactNumber] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  console.log(attendedFrom);

  useEffect(() => {
    get("EducationLevelDD/Index").then((res) => {
      setEducationLevel(res);
    });

    get("CountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`EducationInformation/GetByStudentId/${applicationStudentId}`).then(
      (res) => {
        setEduDetails(res);
        if (res?.length > 0) {
          setForms(true);
        } else {
          setForms(false);
        }
      }
    );
  }, [success, applicationStudentId]);

  // date handling

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };
  const deleteCheckFunction = () => {
    setForms(false);
    if (eduDetails?.length > 0) {
      setShowDeleteOption(true);
    }
  };
  const checkFunction = () => {
    setForms(false);
    if (eduDetails?.length > 0) {
      setForms(false);
      get(
        `EducationInformation/DeleteByStudentId/${applicationStudentId}`
      ).then((res) => {
        addToast("Educational details deleted successfully", {
          appearance: "error",
          autoDismiss: "true",
        });
        setSuccess(!success);
        setShowDeleteOption(false);
        history.push(`/addTestScore/${applicationStudentId}`);
      });
    }
  };

  const educationLevelName = educationLevel?.map((edu) => ({
    label: edu.name,
    value: edu.id,
  }));

  const handleCancelShowForm = () => {
    setShowForm(false);
  };
  const handleCancelForm = () => {
    setForms(false);
  };

  // select  Student type
  const selectEducationLevel = (label, value) => {
    setProgramError(false);
    setEducationLevelLabel(label);
    setEducationLevelValue(value);
  };

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const goPrevious = () => {
    history.push(`/sourceofFund/${applicationStudentId}/${1}`);
  };
  const goForward = () => {
    history.push(`/addTestScore/${applicationStudentId}`);
  };

  const handleQualificationSubject = (e) => {
    setQualificationSubject(e.target.value);
    if (e.target.value === "") {
      setQualificationSubjectError("Qualification Course is required");
    } else {
      setQualificationSubjectError("");
    }
  };
  const handleAttendedFrom = (e) => {
    setAttendedFrom(e.target.value);
    if (e.target.value === "") {
      setAttendedFromError("Date is required");
    } else {
      setAttendedFromError("");
    }
  };
  const handleAttendedTo = (e) => {
    setAttendedTo(e.target.value);
    if (e.target.value === "") {
      setAttendedToError("Date is required");
    } else {
      setAttendedToError("");
    }
  };

  const handleDuration = (e) => {
    setDuration(e.target.value);
    if (e.target.value === "") {
      setDurationError("Date is required");
    } else {
      setDurationError("");
    }
  };

  const handlePercentage = (e) => {
    setPercentage(e.target.value);
    if (e.target.value === "") {
      setPercentageError("Result in percentage is required");
    } else {
      setPercentageError("");
    }
  };

  const handleInstitution = (e) => {
    setInstitution(e.target.value);
    if (e.target.value === "") {
      setInstitutionError("Name of institution is required");
    } else {
      setInstitutionError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (educationLevelValue === 0) {
      isFormValid = false;
      setProgramError(true);
    }
    if (countryValue === 0) {
      isFormValid = false;
      setCountryError(true);
    }
    if (!qualificationSubject) {
      isFormValid = false;
      setQualificationSubjectError("Qualification Course is required");
    }
    if (!attendedFrom) {
      isFormValid = false;
      setAttendedFromError("Date is required");
    }
    if (isAchieved && !attendedTo) {
      isFormValid = false;
      setAttendedToError("Date is required");
    }
    if (isAchieved && !percentage) {
      isFormValid = false;
      setPercentageError("Result in percentage is required");
    }
    if (!duration) {
      isFormValid = false;
      setDurationError("Duration is required");
    }
    if (!institution) {
      isFormValid = false;
      setInstitutionError("Name of institution is required");
    }
    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("mannavai");
    const subData = new FormData(event.target);
    subData.append("qualificationAchieved", isAchieved);
    // subData.append("instituteContactNumber", instituteContactNumber);

    if (validateRegisterForm()) {
      if (oneData?.id) {
        setButtonStatus(true);
        setProgress(true);
        put(`EducationInformation/Update`, subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setOneData({});
          setCountryLabel("Select Country");
          setCountryValue(0);
          setEducationLevelLabel("Select Education Level");
          setEducationLevelValue(0);
          setQualificationSubject("");
          setDuration("");
          setInstitution("");
          setAttendedFrom(currentDate);
          setShowForm(false);
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post("EducationInformation/Create", subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setOneData({});
          setEducationLevelLabel("Select Education Level");
          setEducationLevelValue(0);

          setQualificationSubject("");
          setDuration("");
          setInstitution("");

          setAttendedFrom(currentDate);
          setSuccess(!success);
          setCountryLabel("Select Country");
          setCountryValue(0);
          setShowForm(false);
          setForms(true);
        });
      }
    }
  };

  const toggleDanger = (p) => {
    setDeleteData(p);
    setDeleteModal(true);
  };

  const handleDeletePermission = () => {
    setProgress(true);
    remove(`EducationInformation/Delete/${deleteData?.id}`).then((res) => {
      setProgress(false);

      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const handleUpdate = (id) => {
    get(`EducationInformation/Get/${id}`).then((res) => {
      console.log(res);
      setOneData(res);
      setEducationLevelLabel(res?.educationLevel?.name);
      setEducationLevelValue(res?.educationLevel?.id);
      setCountryLabel(res?.countryOfEducation?.name);
      setCountryValue(res?.countryOfEducation?.id);
      setAchieved(res?.qualificationAchieved);
      setQualificationSubject(res?.qualificationSubject);
      setDuration(res?.duration);
      setInstitution(res?.nameOfInstitution);
      setPercentage(res?.finalGrade);
      setInstitution(res?.nameOfInstitution);
      setInstituteContactNumber(res?.instituteContactNumber);

      res?.attendedInstitutionFrom
        ? setAttendedFrom(
            moment(new Date(res?.attendedInstitutionFrom)).format("YYYY-MM-DD")
          )
        : setAttendedFrom(currentDate);

      res?.attendedInstitutionTo
        ? setAttendedTo(
            moment(new Date(res?.attendedInstitutionTo)).format("YYYY-MM-DD")
          )
        : setAttendedTo(currentDate);

      // setAttendedFrom(
      //   moment(new Date(res?.attendedInstitutionFrom)).format("YYYY-MM-DD")
      // );

      const a = res?.attendedInstitutionTo;
      var utcDate = new Date(a);
      var localeDte2 = utcDate.toLocaleString("en-CA");
      const b = localeDte2.split("T");
      const c = b[0].split(",");
      setAttendedTo(c[0]);
    });
    setShowForm(true);
  };

  if (showForm) {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const onShow = () => {
    setShowForm(true);
    setAttendedFrom(currentDate);
    setAttendedTo(currentDate);
    setEducationLevelLabel("Select Education Level");
    setEducationLevelValue(0);
  };

  return (
    <div>
      <BreadCrumb
        title="Educational Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"5"}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="5">
              <p className="section-title">Education Informations</p>

              <Row>
                <Col md="4">
                  <FormGroup>
                    <span>
                      {" "}
                      <span className="text-danger"> *</span>
                      Have You Ever Studied?{" "}
                    </span>

                    <div
                      className="d-flex flex-wrap form-mt"
                      style={{ marginLeft: "17px" }}
                    >
                      <div>
                        <Input
                          type="radio"
                          onClick={() => {
                            setForms(true);
                          }}
                          checked={forms === true}
                        />
                        <span>Yes</span>
                      </div>
                      <div className="ml-5">
                        <Input
                          checked={forms === false}
                          type="radio"
                          onClick={deleteCheckFunction}
                        />
                        <span>No</span>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              {showDeleteOption === true ? (
                <>
                  <FormGroup row>
                    <Col>
                      <CancelButton
                        cancel={() => {
                          setForms(true);
                          setShowDeleteOption(false);
                        }}
                      />
                      <SaveButton
                        progress={progress}
                        buttonStatus={buttonStatus}
                        action={checkFunction}
                      />
                    </Col>
                  </FormGroup>
                </>
              ) : null}
              {showDeleteOption === true ? null : (
                <>
                  <div className="row mx-0">
                    {eduDetails?.map((edu, i) => (
                      <div
                        className="col-12 border p-2 rounded mb-3"
                        key={edu.id}
                        style={{ textAlign: "left" }}
                      >
                        <Card>
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span className="card-heading">
                                {edu?.nameOfInstitution}
                              </span>

                              <span>
                                {permissions?.includes(
                                  permissionList?.Edit_Student
                                ) ? (
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleUpdate(edu.id)}
                                  >
                                    Edit
                                  </span>
                                ) : null}
                                {" | "}
                                {permissions?.includes(
                                  permissionList?.Edit_Student
                                ) ? (
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => toggleDanger(edu)}
                                  >
                                    Delete
                                  </span>
                                ) : null}
                              </span>
                            </div>
                            <hr />
                            <Row className="text-gray">
                              <Col md="2">
                                <p>
                                  <span>Attended From</span>
                                  <br />
                                  <b>
                                    {handleDate(edu?.attendedInstitutionFrom)}
                                  </b>
                                </p>
                                <p>
                                  <span>Attended To</span>
                                  <br />
                                  <b>
                                    {edu?.qualificationAchieved === true &&
                                      handleDate(edu?.attendedInstitutionTo)}
                                  </b>
                                </p>
                              </Col>
                              <Col md="2">
                                <p>
                                  <span>Education Level</span>
                                  <br />
                                  <b>{edu?.educationLevel?.name}</b>
                                </p>
                                <p>
                                  <span>Qualification Course</span>
                                  <br />
                                  <b> {edu?.qualificationSubject}</b>
                                </p>
                              </Col>
                              <Col md="2">
                                <p>
                                  <span>Duration</span>
                                  <br />
                                  <b>{edu?.duration}</b>
                                </p>
                                <p>
                                  <span>Result In Percentage</span>
                                  <br />
                                  <b>{edu?.finalGrade}</b>
                                </p>
                              </Col>
                              <Col md="3">
                                <p>
                                  <span>Country of Education</span>
                                  <br />
                                  <b> {edu?.countryOfEducation?.name}</b>
                                </p>
                                <p>
                                  <span>Language of Institution</span>
                                  <br />
                                  <b>{edu?.languageOfInstitution}</b>
                                </p>
                              </Col>
                              <Col md="3">
                                <p>
                                  <span>Institute Contact Number</span>
                                  <br />
                                  <b>{edu?.instituteContactNumber}</b>
                                </p>
                                <p>
                                  <span>Institute Address</span>
                                  <br />
                                  <b>{edu?.instituteAddress}</b>
                                </p>
                              </Col>
                            </Row>
                          </CardBody>

                          <ConfirmModal
                            text="Do You Want To Delete Educational Information?"
                            isOpen={deleteModal}
                            toggle={() => setDeleteModal(!deleteModal)}
                            buttonStatus={buttonStatus}
                            progress={progress}
                            cancel={() => setDeleteModal(false)}
                            confirm={handleDeletePermission}
                          ></ConfirmModal>
                        </Card>
                      </div>
                    ))}
                  </div>

                  {showForm && (
                    <EducationalForm
                      oneData={oneData}
                      attendedFrom={attendedFrom}
                      attendedTo={attendedTo}
                      handleSubmit={handleSubmit}
                      applicationStudentId={applicationStudentId}
                      educationLevelName={educationLevelName}
                      educationLevelLabel={educationLevelLabel}
                      educationLevelValue={educationLevelValue}
                      selectEducationLevel={selectEducationLevel}
                      programError={programError}
                      countryName={countryName}
                      countryLabel={countryLabel}
                      countryValue={countryValue}
                      selectCountry={selectCountry}
                      countryError={countryError}
                      handleCancelForm={handleCancelShowForm}
                      progress={progress}
                      buttonStatus={buttonStatus}
                      isAchieved={isAchieved}
                      setAchieved={setAchieved}
                      handleQualificationSubject={handleQualificationSubject}
                      qualificationSubjectError={qualificationSubjectError}
                      handleAttendedFrom={handleAttendedFrom}
                      attendedFromError={attendedFromError}
                      handleDuration={handleDuration}
                      durationError={durationError}
                      handleInstitution={handleInstitution}
                      institutionError={institutionError}
                      handleAttendedTo={handleAttendedTo}
                      attendedToError={attendedToError}
                      handlePercentage={handlePercentage}
                      percentageError={percentageError}
                      minDate={minDate}
                      qualificationSubject={qualificationSubject}
                      percentage={percentage}
                      duration={duration}
                      institution={institution}
                      instituteContactNumber={instituteContactNumber}
                    />
                  )}

                  {forms && eduDetails?.length < 1 && (
                    <EducationalForm
                      handleSubmit={handleSubmit}
                      attendedFrom={attendedFrom}
                      attendedTo={attendedTo}
                      applicationStudentId={applicationStudentId}
                      educationLevelName={educationLevelName}
                      educationLevelLabel={educationLevelLabel}
                      educationLevelValue={educationLevelValue}
                      selectEducationLevel={selectEducationLevel}
                      programError={programError}
                      countryName={countryName}
                      countryLabel={countryLabel}
                      countryValue={countryValue}
                      selectCountry={selectCountry}
                      countryError={countryError}
                      handleCancelForm={handleCancelForm}
                      progress={progress}
                      buttonStatus={buttonStatus}
                      isAchieved={isAchieved}
                      setAchieved={setAchieved}
                      handleQualificationSubject={handleQualificationSubject}
                      qualificationSubjectError={qualificationSubjectError}
                      handleAttendedFrom={handleAttendedFrom}
                      attendedFromError={attendedFromError}
                      handleDuration={handleDuration}
                      durationError={durationError}
                      handleInstitution={handleInstitution}
                      institutionError={institutionError}
                      handleAttendedTo={handleAttendedTo}
                      attendedToError={attendedToError}
                      handlePercentage={handlePercentage}
                      percentageError={percentageError}
                      minDate={minDate}
                      qualificationSubject={qualificationSubject}
                      percentage={percentage}
                      duration={duration}
                      institution={institution}
                      instituteContactNumber={instituteContactNumber}
                    />
                  )}

                  {eduDetails?.length > 0 && !showForm ? (
                    <>
                      {permissions?.includes(permissionList?.Edit_Student) ? (
                        <button
                          className="add-button"
                          onClick={onShow}
                          permission={6}
                        >
                          Add Another
                        </button>
                      ) : null}
                    </>
                  ) : null}
                </>
              )}

              {showDeleteOption === false &&
              forms === false &&
              showForm === false &&
              eduDetails?.length === 0 ? (
                <>
                  <PreviousButton action={goPrevious} />
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <SaveButton text="Save and Next" action={goForward} />
                  ) : null}
                </>
              ) : null}

              {eduDetails.length > 0 ? (
                <Row className="mt-4">
                  <Col className="d-flex justify-content-between">
                    <PreviousButton action={goPrevious} />
                    <SaveButton text="Next" action={goForward} />
                  </Col>
                </Row>
              ) : null}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default EducationalInformation;
