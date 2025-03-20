import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import { userTypes } from "../../../../../constants/userTypeConstant";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import post from "../../../../../helpers/post";
import { Upload } from "antd";
import SaveButton from "../../../../../components/buttons/SaveButton";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import { rootUrl } from "../../../../../constants/constants";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import UploadButton from "../../../../../components/buttons/UploadButton";
import DownloadButton from "../../../../../components/buttons/DownloadButton";

const ApplicationInformation = () => {
  const history = useHistory();
  const { applicationStudentId } = useParams();
  const userType = localStorage.getItem("userType");
  const [applicationInformation, setApplicationInformation] = useState({});
  console.log(applicationInformation);
  const activetab = "3";
  const [studentType, setStudentType] = useState([]);
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    "Select Student Type"
  );
  const [studentTypeValue, setStudentTypeValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [dataExist, setDataExist] = useState(false);
  const [previousCountry, setPreviousCountry] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [homeOne, setHomeOne] = useState("false");
  const [homeTwo, setHomeTwo] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [euOne, setEuOne] = useState("false");
  const [euTwo, setEuTwo] = useState("false");
  const [euThree, setEuThree] = useState("");
  const [euFour, setEuFour] = useState("false");
  const [residencyStatus, setResidencyStatus] = useState("");
  const [residencyStatusError, setResidencyStatusError] = useState("");
  const [residencyStatusUk, setResidencyStatusUk] = useState("");
  const [residencyStatusErrorUk, setResidencyStatusErrorUk] = useState("");
  const [intOne, setIntOne] = useState("false");
  const [intTwo, setIntTwo] = useState("false");
  const [intThree, setIntThree] = useState("");
  const [intFour, setIntFour] = useState("false");
  console.log("intOne", intOne);
  const [showResidancy, setShowResidancy] = useState();
  const [FileList, setFileList] = useState([]);
  const [FileList2, setFileList2] = useState([]);
  const [howManyYears, setHowManyYears] = useState("");
  const [howManyYearsError, setHowManyYearsError] = useState("");
  const [howManyYearsEu, setHowManyYearsEu] = useState("");
  const [howManyYearsErrorEu, setHowManyYearsErrorEu] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    setIntOne(
      `${
        applicationInformation?.isApplyingFromInside === null
          ? false
          : applicationInformation?.isApplyingFromInside
      }`
    );
    console.log("dsfsdv", intOne);
    setIntTwo(
      `${
        applicationInformation?.isAppliedForUkVisa === null
          ? false
          : applicationInformation?.isAppliedForUkVisa
      }`
    );
    setIntThree(`${applicationInformation?.isRefusedForUKVisa}`);
    setIntFour(
      `${
        applicationInformation?.isRefusedForOtherVisa === null
          ? false
          : applicationInformation?.isRefusedForOtherVisa
      }`
    );
    setResidencyStatus(
      applicationInformation?.currentResidencyStatusForInternational
    );
  }, [applicationInformation]);

  console.log(applicationInformation);
  console.log("intOne", intOne);

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setFileList(fileList);
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
  };

  const Int3Function = (event) => {
    setIntThree(event.target.value);
  };

  useEffect(() => {
    setHowManyYearsEu(`${applicationInformation?.loanYearsForEU}`);
    setDate(`${applicationInformation?.dateOfMoveToUk}`);
    setResidencyStatusUk(
      `${applicationInformation?.currentResidencyStatusForEU}`
    );

    setEuOne(
      `${
        applicationInformation?.loanfromStudentLoansCompanyForEU === null
          ? false
          : applicationInformation?.loanfromStudentLoansCompanyForEU
      }`
    );
    setEuTwo(
      `${
        applicationInformation?.isHavePre_Settlementstatus === null
          ? false
          : applicationInformation?.isHavePre_Settlementstatus
      }`
    );
    setEuThree(`${applicationInformation?.isStayedInsideInUkinLast3Years}`);
    setEuFour(
      `${
        applicationInformation?.havingUndergraduatePostgraduateCourseForEU ===
        null
          ? false
          : applicationInformation?.havingUndergraduatePostgraduateCourseForEU
      }`
    );
  }, [applicationInformation]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const eu1Function = (event) => {
    setEuOne(event.target.value);
  };

  const eu2Function = (event) => {
    setEuTwo(event.target.value);
  };

  const eu3Function = (event) => {
    setEuThree(event.target.value);
  };

  const eu4Function = (event) => {
    setEuFour(event.target.value);
  };

  useEffect(() => {
    get(`StudentType/GetByStudentId/${applicationStudentId}`).then((res) => {
      setStudentType(res);
    });

    get(`UniversityCountryDD/Index`).then((res) => {
      setCountry(res);
    });

    get(`ApplicationInfo/GetByStudentId/${applicationStudentId}`).then(
      (res) => {
        console.log(res);
        if (res !== null) {
          setFileList([`${rootUrl}` + res?.refusalLetterForUKVisa?.fileUrl]);
          setFileList2([
            `${rootUrl}` + res?.refusalLetterForOtherVisa?.fileUrl,
          ]);
          // setIntOne(res?.intOne);
          setApplicationInformation(res);
          setStudentTypeLabel(res?.studentType?.name);
          setStudentTypeValue(res?.studentType?.id);
          get(`UniversityCountryDD/Index`).then((data) => {
            const result = data?.find(
              (answer) => answer?.id === res?.preferredCountry
            );
            setCountryLabel(result?.name);
            setCountryValue(result?.id);
            setPreviousCountry(result?.id);
          });

          setDataExist(true);
        } else {
          setDataExist(false);
          get(`StudentType/PossibleType/${applicationStudentId}`).then(
            (data) => {
              console.log("data", data);
              get(`StudentType/GetByStudentId/${applicationStudentId}`).then(
                (res) => {
                  const result = res?.find((value) => value?.id === data);
                  setStudentTypeLabel(result?.name);
                  setStudentTypeValue(result?.id);
                }
              );
            }
          );
          get(`StudentType/PreferredCountry/${applicationStudentId}`).then(
            (action) => {
              // console.log("Console", action);
              // setDataInfo(action);

              get(`UniversityCountryDD/Index`).then((res) => {
                console.log("Second", res);
                const result = res?.find(
                  (answer) => answer?.id === action?.universityCountryId
                );
                setCountryLabel(result?.name);
                setCountryValue(result?.id);
                setPreviousCountry(result?.id);
                console.log("Result", result);
              });
            }
          );
        }
      }
    );
  }, [applicationStudentId]);
  useEffect(() => {
    get(`ApplicationInfo/Check/${applicationStudentId}/${countryValue}`).then(
      (res) => {
        console.log(res);
        setShowResidancy(res);
      }
    );
  }, [applicationStudentId, countryValue, studentTypeValue]);

  useEffect(() => {
    setHomeOne(
      `${
        applicationInformation?.loanfromStudentLoansCompanyForHome === null
          ? false
          : applicationInformation?.loanfromStudentLoansCompanyForHome
      }`
    );
    setHowManyYears(applicationInformation?.loanYearsForHome);
    setHomeTwo(
      `${
        applicationInformation?.havingUndergraduatePostgraduateCourseForHome ===
        null
          ? false
          : applicationInformation?.havingUndergraduatePostgraduateCourseForHome
      }`
    );
  }, [applicationInformation]);

  const home1Function = (event) => {
    setHomeOne(event.target.value);
  };

  const home2Function = (event) => {
    setHomeTwo(event.target.value);
  };

  const handlePrevious = () => {
    history.push(`/addStudentContactInformation/${applicationStudentId}/${1}`);
  };

  const countryOptions = country?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const selectCountry = (label, value) => {
    setCountryLabel(label);
    setCountryValue(value);
    setCurrentCountry(value);
    get(
      `StudentType/SavePreferredCountry?countryId=${value}&studentId=${applicationStudentId}`
    ).then((res) => {
      if (res) {
        addToast("Preferred country saved successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast("Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const studentTypeName = studentType?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Student type
  const selectStudentType = (label, value) => {
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
  };

  const handleResidencyStatus = (e) => {
    setResidencyStatus(e.target.value);
    if (e.target.value === "") {
      setResidencyStatusError("Residency status is required");
    } else {
      setResidencyStatusError("");
    }
  };
  const handleResidencyStatusUk = (e) => {
    setResidencyStatusUk(e.target.value);
    if (e.target.value === "") {
      setResidencyStatusErrorUk("Residency status is required");
    } else {
      setResidencyStatusErrorUk("");
    }
  };
  const handleHowManyYears = (e) => {
    setHowManyYears(e.target.value);
    if (e.target.value === "") {
      setHowManyYearsError("Years is required");
    } else {
      setHowManyYearsError("");
    }
  };
  const handleHowManyYearsEu = (e) => {
    setHowManyYearsEu(e.target.value);
    if (e.target.value === "") {
      setHowManyYearsErrorEu("Years is required");
    } else {
      setHowManyYearsErrorEu("");
    }
  };
  const handleDateError = (e) => {
    setDate(e.target.value);
    if (e.target.value === "") {
      setDateError("Date is required");
    } else {
      setDateError("");
    }
  };

  const handleSubmit = (event) => {
    console.log("event -57", event.target);
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append(
      "RefusalLetterForUKVisaFile",
      FileList.length === 0 ? null : FileList[0]?.originFileObj
    );
    subData.append(
      "RefusalLetterForOtherVisaFile",
      FileList2.length === 0 ? null : FileList2[0]?.originFileObj
    );
    subData.append("IsApplyingFromInside", intOne === "true" ? true : false);
    if (studentTypeLabel === "Home/UK" && homeOne === "true" && !howManyYears) {
      setHowManyYearsError("Years is required");
    } else if (studentTypeLabel === "EU/EEA" && !date) {
      setDateError("Date is required");
    } else if (
      studentTypeLabel === "EU/EEA" &&
      euOne === "true" &&
      !howManyYearsEu
    ) {
      setHowManyYearsErrorEu("Years is required");
    } else if (
      studentTypeLabel === "EU/EEA" &&
      euTwo === "false" &&
      !residencyStatusUk
    ) {
      setResidencyStatusErrorUk("Residency status is required");
    } else if (
      studentTypeLabel === "International" &&
      intOne === "true" &&
      !residencyStatus
    ) {
      setResidencyStatusError("Residency status is required");
    } else {
      setButtonStatus(true);
      setProgress(true);

      post(`ApplicationInfo/Submit`, subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSuccess(!success);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList([]);
          setFileList2([]);

          history.push(`/sourceofFund/${applicationStudentId}/${1}`);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Application Information"
        backTo="Student"
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"3"}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <div>
                <p className="section-title">Application Information</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="6" md="8">
                    <FormGroup className="has-icon-left position-relative">
                      <span>
                        {userType === userTypes?.Student
                          ? "What is your preferred study destination?"
                          : "Student's preferred study destination"}{" "}
                      </span>

                      <Select
                        className="form-mt"
                        options={countryOptions}
                        value={{ label: countryLabel, value: countryValue }}
                        onChange={(opt) => selectCountry(opt.label, opt.value)}
                      />
                    </FormGroup>
                    <FormGroup className="has-icon-left position-relative">
                      <span>
                        <span className="text-danger">*</span> Application Type
                      </span>

                      <Select
                        options={studentTypeName}
                        value={{
                          label: studentTypeLabel,
                          value: studentTypeValue,
                        }}
                        onChange={(opt) =>
                          selectStudentType(opt.label, opt.value)
                        }
                        name="studentTypeId"
                        id="studentTypeId"
                      />
                    </FormGroup>

                    {countryValue !== 0 ? (
                      <>
                        {userType === userTypes?.Student ? (
                          <>
                            {dataExist === false ? (
                              <div className="mt-1 mb-4 d-flex justify-between align-items-center cardborder">
                                <img
                                  style={{ height: "100%" }}
                                  src={icon_info}
                                  alt=""
                                />{" "}
                                <div className="pl-3">
                                  {currentCountry === previousCountry ||
                                  currentCountry === null ? (
                                    <span>
                                      Based on your profile, your application
                                      type seems to be {studentTypeLabel}. You
                                      can change your application type.
                                    </span>
                                  ) : (
                                    <span>
                                      You have changed you preferred study
                                      destination. Your application type might
                                      also require to be changed.
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : null}
                          </>
                        ) : null}

                        {studentTypeLabel === "Home/UK" ? (
                          <div>
                            <input
                              type="hidden"
                              name="studentId"
                              id="studentId"
                              value={applicationStudentId}
                            />

                            <input
                              type="hidden"
                              name="id"
                              id="id"
                              value={
                                applicationInformation?.id === null ||
                                applicationInformation?.id === undefined
                                  ? 0
                                  : applicationInformation?.id
                              }
                            />

                            <input
                              type="hidden"
                              name="studentTypeId"
                              id="studentTypeId"
                              value={studentTypeValue}
                            />

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                <span className="text-danger">*</span> Have You
                                Ever Had Any Other Loans From The Student Loans
                                Company (SLC)?
                              </span>
                              <br />
                              <FormGroup check inline className="form-mt">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setHomeOne("true")}
                                  checked={homeOne === "true" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="loanfromStudentLoansCompanyForHome"
                                >
                                  Yes
                                </Label>
                              </FormGroup>

                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setHomeOne("false")}
                                  checked={homeOne === "false" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="loanfromStudentLoansCompanyForHome"
                                >
                                  No
                                </Label>
                              </FormGroup>
                            </FormGroup>

                            {homeOne === "true" ? (
                              <FormGroup className="has-icon-left position-relative">
                                <span>
                                  <span className="text-danger">*</span> How
                                  Many Years?
                                </span>
                                <Input
                                  className="form-mt"
                                  type="text"
                                  name="LoanYearsForHome"
                                  id="LoanYearsForHome"
                                  onChange={(e) => {
                                    handleHowManyYears(e);
                                  }}
                                  placeholder="Enter Years"
                                  defaultValue={
                                    applicationInformation?.loanYearsForHome
                                  }
                                />
                                <span className="text-danger">
                                  {howManyYearsError}
                                </span>
                              </FormGroup>
                            ) : null}

                            {showResidancy.showResidencyStatus === true && (
                              <>
                                <div className="mt-1 mb-4 d-flex justify-between cardborder">
                                  <img
                                    style={{ height: "100%" }}
                                    src={icon_info}
                                    alt=""
                                  />{" "}
                                  <div className="pl-3">
                                    <span>{showResidancy.message}</span>
                                  </div>
                                </div>

                                <FormGroup>
                                  <span>
                                    {" "}
                                    <span className="text-danger">*</span> What
                                    is Your Current Residency Status?
                                  </span>

                                  <Input
                                    type="text"
                                    name="ResidencyStatusForHome"
                                    id="ResidencyStatusForHome"
                                    defaultValue={
                                      applicationInformation?.residencyStatusForHome
                                    }
                                    placeholder="Enter Residency Status For Home"
                                    required
                                  />
                                </FormGroup>
                              </>
                            )}
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                <span className="text-danger">*</span> Have You
                                Started an Undergraduate or Postgraduate Course
                                of Higher Education in Any Country Since Leaving
                                School?
                              </span>
                              <br />

                              <FormGroup check inline className="form-mt">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setHomeTwo("true")}
                                  checked={homeTwo === "true" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="HavingUndergraduatePostgraduateCourseForHome"
                                >
                                  Yes
                                </Label>
                              </FormGroup>

                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setHomeTwo("false")}
                                  checked={homeTwo === "false" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="HavingUndergraduatePostgraduateCourseForHome"
                                >
                                  No
                                </Label>
                              </FormGroup>
                            </FormGroup>
                          </div>
                        ) : null}

                        {studentTypeLabel === "International" ? (
                          <div>
                            {" "}
                            <input
                              type="hidden"
                              name="studentId"
                              id="studentId"
                              value={applicationStudentId}
                            />
                            <input
                              type="hidden"
                              name="id"
                              id="id"
                              value={
                                applicationInformation?.id === null ||
                                applicationInformation?.id === undefined
                                  ? 0
                                  : applicationInformation?.id
                              }
                            />
                            <input
                              type="hidden"
                              name="studentTypeId"
                              id="studentTypeId"
                              value={studentTypeValue}
                            />
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                Are You Applying From Inside {countryLabel}?{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                              <br />

                              <FormGroup check inline className="form-mt">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setIntOne("true")}
                                  checked={intOne === "true" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="IsApplyingFromInside"
                                >
                                  Yes
                                </Label>
                              </FormGroup>

                              <FormGroup check inline>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setIntOne("false")}
                                  checked={intOne === "false" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="isApplyingFromInside"
                                >
                                  No
                                </Label>
                              </FormGroup>
                            </FormGroup>
                            {intOne === "true" ? (
                              <FormGroup className="has-icon-left position-relative">
                                <span>
                                  <span className="text-danger">*</span> What is
                                  Your Current Residency Status?
                                </span>

                                <Input
                                  className="form-mt"
                                  type="text"
                                  name="CurrentResidencyStatusForInternational"
                                  id="CurrentResidencyStatusForInternational"
                                  onChange={(e) => {
                                    handleResidencyStatus(e);
                                  }}
                                  placeholder="Enter Current Residency Status"
                                  defaultValue={residencyStatus}
                                />
                                <span className="text-danger">
                                  {residencyStatusError}
                                </span>
                              </FormGroup>
                            ) : intOne === "false" ? (
                              <>
                                <FormGroup className="has-icon-left position-relative">
                                  <span>
                                    Have You Ever Applied for {countryLabel}{" "}
                                    Visa? <span className="text-danger">*</span>{" "}
                                  </span>
                                  <br />

                                  <FormGroup check inline className="form-mt">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      // onChange={Int2Function}
                                      onClick={() => setIntTwo("true")}
                                      checked={intTwo === "true" && true}
                                    />
                                    <Label
                                      className="form-check-label"
                                      check
                                      htmlFor="IsAppliedForUkVisa"
                                    >
                                      Yes
                                    </Label>
                                  </FormGroup>

                                  <FormGroup check inline>
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      // onChange={Int2Function}
                                      onClick={() => setIntTwo("false")}
                                      checked={intTwo === "false" && true}
                                    />
                                    <Label
                                      className="form-check-label"
                                      check
                                      htmlFor="IsAppliedForUkVisa"
                                    >
                                      No
                                    </Label>
                                  </FormGroup>
                                </FormGroup>

                                {intTwo === "true" ? (
                                  <>
                                    <FormGroup className="has-icon-left position-relative">
                                      <span>
                                        What Type of Visa You Have Applied for?
                                      </span>{" "}
                                      <span className="text-danger">*</span>
                                      <Input
                                        required
                                        placeholder="Enter Visa Type"
                                        type="text"
                                        name="VisaType"
                                        id="VisaType"
                                        defaultValue={
                                          applicationInformation?.visaType
                                        }
                                      />
                                    </FormGroup>

                                    <FormGroup className="has-icon-left position-relative">
                                      <span>
                                        Have You Ever Been Refused for{" "}
                                        {countryLabel} Visa?{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </span>

                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="radio"
                                          id="IsRefusedForUKVisa"
                                          onChange={Int3Function}
                                          name="IsRefusedForUKVisa"
                                          value="true"
                                          checked={intThree === "true"}
                                        />
                                        <Label
                                          className="form-check-label"
                                          check
                                          htmlFor="IsRefusedForUKVisa"
                                        >
                                          Yes
                                        </Label>
                                      </FormGroup>

                                      <FormGroup check inline>
                                        <Input
                                          className="form-check-input"
                                          type="radio"
                                          id="IsRefusedForUKVisa"
                                          onChange={Int3Function}
                                          name="IsRefusedForUKVisa"
                                          value="false"
                                          checked={intThree === "false"}
                                        />
                                        <Label
                                          className="form-check-label"
                                          check
                                          htmlFor="IsRefusedForUKVisa"
                                        >
                                          No
                                        </Label>
                                      </FormGroup>
                                    </FormGroup>

                                    {intThree === "true" ? (
                                      <FormGroup className="has-icon-left position-relative">
                                        <Row>
                                          <Col md="6">
                                            <span>
                                              Attach the refusal letter
                                            </span>{" "}
                                          </Col>
                                        </Row>

                                        <>
                                          <Row>
                                            <Col md="4">
                                              <Upload
                                                multiple={false}
                                                fileList={FileList}
                                                onChange={handleChange}
                                                beforeUpload={(file) => {
                                                  return false;
                                                }}
                                                style={{ height: "32px" }}
                                              >
                                                {FileList.length < 1 ? (
                                                  <UploadButton />
                                                ) : (
                                                  ""
                                                )}
                                              </Upload>
                                            </Col>
                                            <Col md="4">
                                              {applicationInformation
                                                ?.refusalLetterForUKVisa
                                                ?.fileUrl ? (
                                                <a
                                                  href={
                                                    rootUrl +
                                                    applicationInformation
                                                      ?.refusalLetterForUKVisa
                                                      ?.fileUrl
                                                  }
                                                  target="blank"
                                                >
                                                  <DownloadButton />
                                                </a>
                                              ) : null}
                                            </Col>
                                          </Row>
                                        </>
                                      </FormGroup>
                                    ) : null}
                                  </>
                                ) : null}

                                <FormGroup className="has-icon-left position-relative">
                                  <span className="aaa">
                                    Have You Ever Been Refused Visa to Any Other
                                    Country?{" "}
                                    <span className="text-danger">*</span>{" "}
                                  </span>
                                  <br />

                                  <FormGroup check inline className="form-mt">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      onClick={() => setIntFour("true")}
                                      checked={intFour === "true" && true}
                                    />
                                    <Label
                                      className="form-check-label"
                                      check
                                      htmlFor="IsRefusedForOtherVisa"
                                    >
                                      Yes
                                    </Label>
                                  </FormGroup>

                                  <FormGroup check inline>
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      onClick={() => setIntFour("false")}
                                      checked={
                                        intFour === "false" ? true : false
                                      }
                                    />
                                    <Label
                                      className="form-check-label"
                                      check
                                      htmlFor="IsRefusedForOtherVisa"
                                    >
                                      No
                                    </Label>
                                  </FormGroup>
                                </FormGroup>

                                {intFour === "true" ? (
                                  <FormGroup className="has-icon-left position-relative">
                                    <Row>
                                      <Col md="6">
                                        <span>Attach the refusal letter</span>{" "}
                                      </Col>
                                    </Row>

                                    {/* {
                              (applicationInformation?.refusalLetterForUKVisa?.fileUrl !== null) ?
                              <Image
                              src={`${rootUrl}`+applicationInformation?.refusalLetterForOtherVisa?.fileUrl}
                              width={100}
                              height={100}
                              /> 
              
                              :
                              null
                            } */}

                                    <>
                                      <Row>
                                        <Col md="4">
                                          <Upload
                                            multiple={false}
                                            fileList={FileList2}
                                            onChange={handleChange2}
                                            beforeUpload={(file) => {
                                              return false;
                                            }}
                                            style={{ height: "32px" }}
                                          >
                                            {FileList2.length < 1 ? (
                                              <UploadButton />
                                            ) : (
                                              ""
                                            )}
                                          </Upload>
                                        </Col>
                                        <Col md="4">
                                          {applicationInformation
                                            ?.refusalLetterForOtherVisa
                                            ?.fileUrl ? (
                                            <a
                                              href={
                                                rootUrl +
                                                applicationInformation
                                                  ?.refusalLetterForOtherVisa
                                                  ?.fileUrl
                                              }
                                              target="blank"
                                            >
                                              <DownloadButton />
                                            </a>
                                          ) : null}
                                        </Col>
                                      </Row>
                                      {/* <Modal
                                        visible={previewVisible2}
                                        title={previewTitle2}
                                        footer={null}
                                        onCancel={handleCancel2}
                                      >
                                        <img
                                          alt="example"
                                          style={{ width: "100%" }}
                                          src={previewImage2}
                                        />
                                      </Modal> */}
                                    </>
                                  </FormGroup>
                                ) : null}
                              </>
                            ) : null}
                          </div>
                        ) : null}

                        {studentTypeLabel === "EU/EEA" ? (
                          <div>
                            <input
                              type="hidden"
                              name="studentId"
                              id="studentId"
                              value={applicationStudentId}
                            />

                            <input
                              type="hidden"
                              name="id"
                              id="id"
                              value={
                                applicationInformation?.id === null ||
                                applicationInformation?.id === undefined
                                  ? 0
                                  : applicationInformation?.id
                              }
                            />

                            <input
                              type="hidden"
                              name="studentTypeId"
                              id="studentTypeId"
                              value={studentTypeValue}
                            />
                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                <span className="text-danger">*</span> When Did
                                You Move to The {countryLabel}?
                              </span>

                              <Input
                                className="form-mt"
                                type="date"
                                name="DateOfMoveToUk"
                                id="DateOfMoveToUk"
                                onChange={(e) => {
                                  handleDateError(e);
                                }}
                                defaultValue={handleDate(
                                  applicationInformation?.dateOfMoveToUk
                                )}
                              />
                              <span className="text-danger">{dateError}</span>
                            </FormGroup>

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                <span className="text-danger">*</span> Have You
                                Ever Had Any Other Loans From The Student Loans
                                Company (SLC)?
                              </span>
                              <br />

                              <FormGroup check inline className="form-mt">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setEuOne("true")}
                                  checked={euOne === "true" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="loanfromStudentLoansCompanyForEU"
                                >
                                  Yes
                                </Label>
                              </FormGroup>

                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setEuOne("false")}
                                  checked={euOne === "false" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="loanfromStudentLoansCompanyForEU"
                                >
                                  No
                                </Label>
                              </FormGroup>
                            </FormGroup>

                            {euOne === "true" ? (
                              <FormGroup className="has-icon-left position-relative">
                                <span>
                                  <span className="text-danger">*</span> How
                                  Many Years?
                                </span>

                                <Input
                                  className="form-mt"
                                  type="text"
                                  name="loanYearsForEU"
                                  id="loanYearsForEU"
                                  placeholder="Enter Years"
                                  onChange={(e) => {
                                    handleHowManyYearsEu(e);
                                  }}
                                  defaultValue={
                                    applicationInformation?.loanYearsForEU
                                  }
                                />
                                <span className="text-danger">
                                  {howManyYearsErrorEu}
                                </span>
                              </FormGroup>
                            ) : null}

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                <span className="text-danger">*</span> Do You
                                Have Settled or Pre-settled Status Under The EU
                                Settlement Scheme?
                              </span>
                              <br />

                              <FormGroup check inline className="form-mt">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setEuTwo("true")}
                                  checked={euTwo === "true" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="IsHavePre_Settlementstatus"
                                >
                                  Yes
                                </Label>
                              </FormGroup>

                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setEuTwo("false")}
                                  checked={euTwo === "false" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="IsHavePre_Settlementstatus"
                                >
                                  No
                                </Label>
                              </FormGroup>
                            </FormGroup>

                            {euTwo === "true" ? (
                              <>
                                <FormGroup className="has-icon-left position-relative">
                                  <span>
                                    <span className="text-danger">*</span>{" "}
                                    Please Provide The Valid Share Code
                                  </span>

                                  <Input
                                    className="form-mt"
                                    required
                                    type="text"
                                    name="shareCode"
                                    id="shareCode"
                                    placeholder="Enter Share Code"
                                    defaultValue={
                                      applicationInformation?.shareCode
                                    }
                                  />
                                </FormGroup>

                                <FormGroup className="has-icon-left position-relative">
                                  <span>
                                    <span className="text-danger mr-1">*</span>
                                    Have You Been Resident in The UK And Islands
                                    For The Last Three Years?
                                  </span>
                                  <br />

                                  <FormGroup check inline className="form-mt">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      id="isStayedInsideInUkinLast3Years"
                                      onChange={eu3Function}
                                      name="isStayedInsideInUkinLast3Years"
                                      value="true"
                                      checked={euThree === "true"}
                                    />
                                    <Label
                                      className="form-check-label"
                                      check
                                      htmlFor="IsStayedInsideInUkinLast3Years"
                                    >
                                      Yes
                                    </Label>
                                  </FormGroup>

                                  <FormGroup check inline>
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      id="isStayedInsideInUkinLast3Years"
                                      onChange={eu3Function}
                                      name="isStayedInsideInUkinLast3Years"
                                      value="false"
                                      checked={euThree === "false"}
                                    />
                                    <Label
                                      className="form-check-label"
                                      check
                                      htmlFor="IsStayedInsideInUkinLast3Years"
                                    >
                                      No
                                    </Label>
                                  </FormGroup>
                                </FormGroup>
                              </>
                            ) : euTwo === "false" ? (
                              <FormGroup className="has-icon-left position-relative">
                                <span>
                                  <span className="text-danger">*</span> What is
                                  Your Current Residency Status in The UK?
                                </span>

                                <Input
                                  className="form-mt"
                                  type="text"
                                  name="CurrentResidencyStatusForEU"
                                  id="CurrentResidencyStatusForEU"
                                  placeholder="Enter Residency Status"
                                  onChange={(e) => {
                                    handleResidencyStatusUk(e);
                                  }}
                                  defaultValue={
                                    applicationInformation?.currentResidencyStatusForEU
                                  }
                                />
                                <span className="text-danger">
                                  {residencyStatusErrorUk}
                                </span>
                              </FormGroup>
                            ) : null}

                            <FormGroup className="has-icon-left position-relative">
                              <span>
                                <span className="text-danger">*</span> Have You
                                Started An Undergraduate or Postgraduate Course
                                of Higher Education in Any Country Since Leaving
                                School?
                              </span>
                              <br />
                              <FormGroup check inline className="form-mt">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setEuFour("true")}
                                  checked={euFour === "true" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="HavingUndergraduatePostgraduateCourseForEU"
                                >
                                  Yes
                                </Label>
                              </FormGroup>

                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  onClick={() => setEuFour("false")}
                                  checked={euFour === "false" && true}
                                />
                                <Label
                                  className="form-check-label"
                                  check
                                  htmlFor="HavingUndergraduatePostgraduateCourseForEU"
                                >
                                  No
                                </Label>
                              </FormGroup>
                            </FormGroup>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </Col>
                </Row>
                <FormGroup row className="text-right mt-4">
                  <Col lg="6" md="4">
                    <PreviousButton action={handlePrevious} />
                    <SaveButton
                      text="Save and Next"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ApplicationInformation;
