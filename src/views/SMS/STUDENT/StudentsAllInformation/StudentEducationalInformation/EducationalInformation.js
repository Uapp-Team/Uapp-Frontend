/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import remove from "../../../../../helpers/remove";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import Loader from "../../../Search/Loader/Loader";
import EducationalForm from "./EducationalForm";
import ContactNumber from "../../../../../components/ui/ContactNumber";

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
  const [attendedFrom, setAttendedFrom] = useState(null);
  const [attendedFromError, setAttendedFromError] = useState("");
  const [attendedTo, setAttendedTo] = useState(null);
  const [attendedToError, setAttendedToError] = useState("");
  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");
  const [institution, setInstitution] = useState("");
  const [institutionError, setInstitutionError] = useState("");
  const [percentage, setPercentage] = useState("");
  const [percentageError, setPercentageError] = useState("");
  const minDate = "1950-01-01";
  const [instituteContactNumber, setInstituteContactNumber] = useState("");
  const [instituteAddress, setInstituteAddress] = useState("");
  const [instituteLanguage, setInstituteLanguage] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [studentType, setStudentType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [summary, setSummary] = useState(null);
  const [nav, setNav] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get("EducationLevelDD/Index").then((res) => {
      setEducationLevel(res);
    });

    get("CountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`EducationInformation/GetSummery/${applicationStudentId}`).then(
      (res) => {
        setSummary(res);
      }
    );
    get(`ApplicationInfo/GetByStudentId/${applicationStudentId}`).then(
      (res) => {
        setStudentType(res?.studentTypeId);
        if (res?.studentTypeId == 3) {
          setForms(true);
        } else {
          setForms(false);
        }
      }
    );
  }, [applicationStudentId]);

  useEffect(() => {
    setLoading(true);

    get(`StudentNavbar/Get/${applicationStudentId}`).then((res) => {
      setNav(res);
    });

    get(`EducationInformation/GetByStudentId/${applicationStudentId}`).then(
      (res) => {
        setEduDetails(res);
      }
    );

    setLoading(false);
  }, [success, applicationStudentId]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       await get("EducationLevelDD/Index").then((res) => {
  //         setEducationLevel(res);
  //       });

  //       await get("CountryDD/index").then((res) => {
  //         setCountry(res);
  //       });
  //       const navigation = await get(
  //         `StudentNavbar/Get/${applicationStudentId}`
  //       );
  //       setNav(navigation);

  //       await get(
  //         `EducationInformation/GetByStudentId/${applicationStudentId}`
  //       ).then((res) => {
  //         setEduDetails(res);
  //       });
  //       await get(
  //         `EducationInformation/GetSummery/${applicationStudentId}`
  //       ).then((res) => {
  //         setSummary(res);
  //       });
  //       await get(
  //         `ApplicationInfo/GetByStudentId/${applicationStudentId}`
  //       ).then((res) => {
  //         setStudentType(res?.studentTypeId);
  //         if (res?.studentTypeId == 3) {
  //           setForms(true);
  //         } else {
  //           setForms(false);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [success, applicationStudentId]);

  const deleteCheckFunction = () => {
    setForms(false);
    if (eduDetails?.length > 0) {
      setShowDeleteOption(true);
    }
  };
  const checkFunction = () => {
    setForms(false);
    remove(
      `EducationInformation/DeleteByStudentId/${applicationStudentId}`
    ).then((res) => {
      addToast("Educational details Updated successfully", {
        appearance: "success",
        autoDismiss: "true",
      });
      setSuccess(!success);
      setShowDeleteOption(false);
      history.push(`/addTestScore/${applicationStudentId}`);
    });
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
    let data = e.target.value.trimStart();
    setQualificationSubject(data);
    if (data === "") {
      setQualificationSubjectError("Qualification Course is required");
    } else {
      setQualificationSubjectError("");
    }
  };

  // function convertDateFormat(dateString) {
  //   // Split the input date string into day, month, and year
  //   const [day, month, year] = dateString.split("/");

  //   // Return the date in yyyy-MM-dd format
  //   return `${year}-${month}-${day}`;
  // }

  // const handleAttendedFrom = (e) => {
  //   if (!e) {
  //     setAttendedFromError("Course Beginning Date is required");
  //     setAttendedFrom(null);
  //     return;
  //   }
  //   const value = e.toDate();
  //   const formatedDate = convertDateFormat(value.toISOString().split("T")[0]);
  //   setAttendedFrom(formatedDate);
  //   if (currentDate < value.toISOString()) {
  //     setAttendedFromError("Invalid Date");
  //   } else {
  //     setAttendedFromError("");
  //   }
  // };
  const handleAttendedFrom = (e) => {
    if (e) {
      setAttendedFrom(e);
    } else {
      setAttendedFromError("Course Beginning Date is required");
    }
  };
  const handleAttendedTo = (e) => {
    if (e) {
      setAttendedTo(e);
    } else {
      setAttendedToError("Course Ending Date is required");
    }
  };
  // const handleAttendedTo = (e) => {
  //   if (!e) {
  //     setAttendedToError("Course Ending Date is required");
  //     setAttendedTo(null);
  //     return;
  //   }
  //   const value = e.toDate();
  //   const formateDate = convertDateFormat(value.toISOString().split("T")[0]);
  //   setAttendedTo(formateDate);
  //   if (currentDate < value.toISOString()) {
  //     setAttendedToError("Invalid Date");
  //   } else {
  //     setAttendedToError("");
  //   }
  // };

  const handleDuration = (e) => {
    let data = e.target.value.trimStart();
    setDuration(data);
    if (data === "") {
      setDurationError("Date is required");
    } else {
      setDurationError("");
    }
  };

  const handlePercentage = (e) => {
    const value = e.target.value;
    const isNumeric = /^\d+$/.test(value);
    setPercentage(value);
    if (value === "") {
      setPercentageError("Result in percentage is required");
    } else if (!isNumeric) {
      setPercentageError("Floating number not allow");
    } else if (value < 0 || value > 100) {
      setPercentageError("Value must be 0 to 100");
    } else {
      setPercentageError("");
    }
  };

  const handleInstitution = (e) => {
    let data = e.target.value.trimStart();
    setInstitution(data);
    if (data === "") {
      setInstitutionError("Name of institution is required");
    } else {
      setInstitutionError("");
    }
  };

  const handleInstitutionLanguage = (e) => {
    setInstituteLanguage(e.target.value);
  };

  const handleInstitutionContactNumber = (value) => {
    setInstituteContactNumber(value);
  };

  const handleInstitutionAddress = (e) => {
    setInstituteAddress(e.target.value);
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
    } else if (isAchieved && !/^\d+$/.test(percentage)) {
      isFormValid = false;
      setPercentageError("Floating number not allow");
    } else if (isAchieved && (percentage < 0 || percentage > 100)) {
      isFormValid = false;
      setPercentageError("Value must be 0 to 100");
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
    const subData = new FormData(event.target);
    console.log("first", subData);
    subData.append("attendedInstitutionFrom", attendedFrom);
    if (attendedTo != null) {
      subData.append("attendedInstitutionTo", attendedTo);
    }
    subData.append("qualificationAchieved", isAchieved);
    subData.append("instituteContactNumber", instituteContactNumber);
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
          setAttendedFrom(null);
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

          setAttendedFrom(null);
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
      setDeleteData({});
      setOneData({});
      setAttendedFrom(null);
      setAttendedTo(null);
      setCountryLabel("Select Country");
      setCountryValue(0);
      setEducationLevelLabel("Select Education Level");
      setEducationLevelValue(0);
      setQualificationSubject("");
      setDuration("");
      setInstitution("");
      setInstituteContactNumber("");
      setPercentage("");
      setInstituteLanguage("");
      setInstituteAddress("");
    });
  };

  const handleUpdate = (id) => {
    get(`EducationInformation/Get/${id}`).then((res) => {
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
      setInstituteLanguage(res?.languageOfInstitution);
      setInstituteAddress(res?.instituteAddress);

      res?.attendedInstitutionFrom
        ? setAttendedFrom(res?.attendedInstitutionFrom)
        : setAttendedFrom("");

      res?.attendedInstitutionTo
        ? setAttendedTo(res?.attendedInstitutionTo)
        : setAttendedTo("");
    });
    setShowForm(true);
    setProgramError(false);
    setCountryError(false);
    setQualificationSubjectError("");
    setPercentageError("");
    setInstitutionError("");
    setDurationError("");
  };

  if (showForm) {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const onShow = () => {
    setShowForm(true);
    setAttendedFrom(null);
    setAttendedTo(null);
    setCountryLabel("Select Country");
    setCountryValue(0);
    setEducationLevelLabel("Select Education Level");
    setEducationLevelValue(0);
    setQualificationSubject("");
    setDuration("");
    setInstitution("");
    setInstituteContactNumber("");
    setPercentage("");
    setInstituteLanguage("");
    setInstituteAddress("");
    setProgramError(false);
    setCountryError(false);
    setQualificationSubjectError("");
    setPercentageError("");
    setInstitutionError("");
    setDurationError("");
  };

  const handleYesClick = () => {
    setSelectedOption(true);
    setSummary(true);
    setShowForm(true);
  };

  const handleNoClick = () => {
    setSelectedOption(false);
    setSummary(false);
    setShowForm(false);
    deleteCheckFunction();
  };

  return (
    <div>
      <BreadCrumb
        title="Educational Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
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

                  {studentType != 3 && eduDetails.length === 0 && (
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>
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
                                name="radioYes"
                                id="radioYes"
                                onClick={handleYesClick}
                                checked={summary === true}
                              />
                              <span>
                                <label
                                  style={{ fontSize: "14px" }}
                                  for="radioYes"
                                >
                                  Yes
                                </label>
                              </span>
                            </div>
                            <div className="ml-5">
                              <Input
                                checked={summary === false}
                                type="radio"
                                name="radioNo"
                                id="radioNo"
                                onClick={handleNoClick}
                              />
                              <span>
                                <label
                                  style={{ fontSize: "14px" }}
                                  for="radioNo"
                                >
                                  No
                                </label>
                              </span>
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
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
                                    {edu?.educationLevel?.name}
                                  </span>

                                  <span>
                                    {permissions?.includes(
                                      permissionList?.Edit_Student
                                    ) ? (
                                      <a
                                        href="#"
                                        // className="pointer text-body"
                                        onClick={() => handleUpdate(edu.id)}
                                      >
                                        Edit
                                      </a>
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
                                {/* <CardSubtitle>
                                  {edu?.nameOfInstitution}
                                </CardSubtitle> */}
                                <hr />
                                <Row className="text-gray">
                                  <Col md="2">
                                    <p>
                                      <span>Course Beginning Date</span>
                                      <br />
                                      <b>
                                        {dateFormate(
                                          edu?.attendedInstitutionFrom
                                        )}
                                      </b>
                                    </p>
                                    <p>
                                      <span>Course Ending Date</span>
                                      <br />
                                      <b>
                                        {edu?.qualificationAchieved === true
                                          ? dateFormate(
                                              edu?.attendedInstitutionTo
                                            )
                                          : "Continue..."}
                                      </b>
                                    </p>
                                  </Col>
                                  <Col md="2">
                                    <p>
                                      <span>Institution Name</span>
                                      <br />
                                      <b>{edu?.nameOfInstitution}</b>
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
                                      <b>
                                        {edu?.qualificationAchieved === true
                                          ? edu?.finalGrade
                                          : "N/A"}
                                      </b>
                                    </p>
                                  </Col>
                                  <Col md="3">
                                    <p>
                                      <span>Country of Education</span>
                                      <br />
                                      <b> {edu?.countryOfEducation?.name}</b>
                                    </p>
                                    <p>
                                      <span>Medium of Instruction (MOI)</span>
                                      <br />
                                      <b>{edu?.languageOfInstitution}</b>
                                    </p>
                                  </Col>
                                  <Col md="3">
                                    <p>
                                      <span>Institution Contact Number</span>
                                      <br />
                                      <b>
                                        <ContactNumber
                                          data={edu?.instituteContactNumber}
                                        />
                                      </b>
                                    </p>

                                    <p>
                                      <span>Institution Address</span>
                                      <br />
                                      <b>{edu?.instituteAddress}</b>
                                    </p>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </div>
                        ))}

                        <ConfirmModal
                          text="Do You Want To Delete Educational Information?"
                          isOpen={deleteModal}
                          toggle={() => setDeleteModal(!deleteModal)}
                          buttonStatus={buttonStatus}
                          progress={progress}
                          cancel={() => setDeleteModal(false)}
                          confirm={handleDeletePermission}
                        />
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
                          handleQualificationSubject={
                            handleQualificationSubject
                          }
                          qualificationSubjectError={qualificationSubjectError}
                          setAttendedToError={setAttendedToError}
                          setAttendedFromError={setAttendedFromError}
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
                          showForm={showForm}
                          instituteLanguage={instituteLanguage}
                          handleInstitutionLanguage={handleInstitutionLanguage}
                          setInstituteAddress={setInstituteAddress}
                          instituteAddress={instituteAddress}
                          handleInstitutionContactNumber={
                            handleInstitutionContactNumber
                          }
                          handleInstitutionAddress={handleInstitutionAddress}
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
                          handleQualificationSubject={
                            handleQualificationSubject
                          }
                          qualificationSubjectError={qualificationSubjectError}
                          handleAttendedFrom={handleAttendedFrom}
                          attendedFromError={attendedFromError}
                          handleDuration={handleDuration}
                          durationError={durationError}
                          handleInstitution={handleInstitution}
                          institutionError={institutionError}
                          handleAttendedTo={handleAttendedTo}
                          setAttendedToError={setAttendedToError}
                          setAttendedFromError={setAttendedFromError}
                          attendedToError={attendedToError}
                          handlePercentage={handlePercentage}
                          percentageError={percentageError}
                          minDate={minDate}
                          qualificationSubject={qualificationSubject}
                          percentage={percentage}
                          duration={duration}
                          institution={institution}
                          instituteContactNumber={instituteContactNumber}
                          showForm={showForm}
                          instituteLanguage={instituteLanguage}
                          handleInstitutionLanguage={handleInstitutionLanguage}
                          setInstituteAddress={setInstituteAddress}
                          instituteAddress={instituteAddress}
                          handleInstitutionContactNumber={
                            handleInstitutionContactNumber
                          }
                          handleInstitutionAddress={handleInstitutionAddress}
                        />
                      )}

                      {eduDetails?.length > 0 && !showForm ? (
                        <>
                          {permissions?.includes(
                            permissionList?.Edit_Student
                          ) ? (
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
                      {permissions?.includes(permissionList?.Edit_Student) &&
                      summary === false ? (
                        <SaveButton
                          text="Save and Next"
                          action={checkFunction}
                        />
                      ) : null}
                    </>
                  ) : null}

                  {eduDetails?.length > 0 ? (
                    <Row className="mt-4">
                      <Col className="d-flex justify-content-between">
                        <PreviousButton action={goPrevious} />
                        {nav?.testScore && (
                          <SaveButton text="Next" action={goForward} />
                        )}
                      </Col>
                    </Row>
                  ) : null}
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default EducationalInformation;
