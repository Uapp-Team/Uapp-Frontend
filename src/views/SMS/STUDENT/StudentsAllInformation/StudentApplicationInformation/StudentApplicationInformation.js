import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import Loader from "../../../Search/Loader/Loader";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import EuUkApplicationInformation from "./EuUkApplicationInformation";
import HomeApplicationInformation from "./HomeApplicationInformation";
import InternationalApplicationInformation from "./InternationalApplicationInformation";
import PopOverText from "../../../../../components/PopOverText";

const StudentApplicationInformation = () => {
  const history = useHistory();
  const { applicationStudentId } = useParams();
  const [success, setSuccess] = useState(false);
  const [studentType, setStudentType] = useState([]);
  const userType = localStorage.getItem("userType");
  const { addToast } = useToasts();

  const [hasSLC, setHasSLC] = useState(null);
  const [howManyYears, setHowManyYears] = useState("");
  const [howManyYearsError, setHowManyYearsError] = useState("");
  const [homeResidencyStatus, setHomeResidencyStatus] = useState("");
  const [homeResidencyStatusError, setHomeResidencyStatusError] = useState("");

  const [date, setDate] = useState(null);
  const [dateError, setdateError] = useState("");
  const [residencyForHomeRequire, setResidencyForHomeRequire] = useState(false);

  const [applicationInformation, setApplicationInformation] = useState([]);
  const [studentTypeValue, setStudentTypeValue] = useState(0);
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    "Select Application Type"
  );
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [dataExist, setDataExist] = useState(false);
  const [previousCountry, setPreviousCountry] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [loansForEu, setLoansForEu] = useState(null);
  const [loanYearsForEU, setLoanYearsForEU] = useState("");
  const [loanYearsForEUError, setLoanYearsForEUError] = useState("");
  const [isSettlementStatus, setIsSettlementStatus] = useState(null);
  const [currentOtherStatus, setCurrentOtherStatus] = useState("");
  const [currentOtherStatusError, setCurrentOtherStatusError] = useState("");
  const [currentStatusUk, setCurrentStatusUk] = useState(null);
  const [currentStatusUkError, setCurrentStatusUkError] = useState(null);
  const [shareCode, setShareCode] = useState("");
  const [shareCodeError, setShareCodeError] = useState("");
  const [isApplyingFromInside, setIsApplyingFromInside] = useState(null);
  const [residencyStatus, setResidencyStatus] = useState("");
  const [residencyStatusError, setResidencyStatusError] = useState("");
  const [isAppliedForUkVisa, setIsAppliedForUkVisa] = useState(null);
  const [visaType, setVisaType] = useState("");
  const [visaTypeError, setVisaTypeError] = useState("");
  const [isRefusedForUKVisaError, setIsRefusedForUKVisaError] = useState("");
  const [FileList, setFileList] = useState([]);
  const [FileList2, setFileList2] = useState([]);
  const [statusInUK, setStatusInUK] = useState("");
  const [statusInUKError, setStatusInUKError] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [showResidency, setShowResidency] = useState([]);
  const [possibleStudentType, setPossibleStudentType] = useState([]);
  const [possibleStudentTypeById, setPossibleStudentTypeById] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentTypeError, setStudentTypeError] = useState("");
  const [haveStartedEducation, setHaveStartedEducation] = useState(null);
  const [haveStartedEducationError, setHaveStartedEducationError] =
    useState("");
  const [hasSCLError, setHasSLCError] = useState("");

  const [isStayedInUkInLast3Years, setIsStayedInUkInLast3Years] =
    useState(null);
  const [isStayedInUkInLast3YearsError, setIsStayedInUkInLast3YearsError] =
    useState("");
  const [havingUnderGraduateCourseForEU, setHavingUnderGraduateCourseForEU] =
    useState(null);
  const [
    havingUnderGraduateCourseForEUError,
    setHavingUnderGraduateCourseForEUError,
  ] = useState("");
  const [loansForEUError, setLoansForEUError] = useState("");
  const [isSettlementStatusError, setIsSettlementStatusError] = useState("");
  const [IsApplyingFromInsideError, setIsApplyingFromInsideError] =
    useState("");
  const [isAppliedForUkVisaError, setIsAppliedForUkVisaError] = useState("");
  const [isRefusedForOtherVisaError, setIsRefusedForOtherVisaError] =
    useState("");
  const [isRefusedForUKVisa, setIsRefusedForUKVisa] = useState(null);
  const [isRefusedForOtherVisa, setIsRefusedForOtherVisa] = useState(null);
  const [fileList1Error, setFileList1Error] = useState("");
  const [fileList2Error, setFileList2Error] = useState("");

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const studentTypeRes = await get(
          `StudentType/GetByStudentId/${applicationStudentId}`
        );
        setStudentType(studentTypeRes);

        const universityCountryRes = await get(
          `UniversityCountryDD/ByStudent/${applicationStudentId}`
        );
        setCountry(universityCountryRes);

        // Fetch application info
        const applicationInfoRes = await get(
          `ApplicationInfo/GetByStudentId/${applicationStudentId}`
        );

        if (applicationInfoRes) {
          setApplicationInformation(applicationInfoRes);
          setHowManyYears(applicationInfoRes?.loanYearsForHome);
          setHomeResidencyStatus(applicationInfoRes?.residencyStatusForHome);
          setDate(applicationInfoRes?.dateOfMoveToUk);
          setStudentTypeLabel(applicationInfoRes?.studentType?.name);

          setLoanYearsForEU(applicationInfoRes?.loanYearsForEU);
          setShareCode(applicationInfoRes?.shareCode);
          setVisaType(applicationInfoRes?.visaType);
          setResidencyStatus(
            applicationInfoRes?.currentResidencyStatusForInternational
          );
          setStudentTypeValue(applicationInfoRes?.studentType?.id);
          setStatusInUK(applicationInfoRes?.currentResidencyStatusForEU);
          setCurrentOtherStatus(applicationInfoRes?.otherCitizenshipStatus);

          const countryIndexRes = await get(`UniversityCountryDD/Index`);
          const result = countryIndexRes?.find(
            (answer) => answer?.id === applicationInfoRes?.preferredCountry
          );
          setCountryLabel(result?.name);
          setCountryValue(result?.id);
          setPreviousCountry(result?.id);
          setHasSLC(applicationInformation?.loanfromStudentLoansCompanyForHome);
          setHaveStartedEducation(
            applicationInformation?.havingUndergraduatePostgraduateCourseForHome
          );
          setDataExist(true);
        } else {
          setDataExist(false);

          // Fetch possible student types
          const possibleStudentTypeRes = await get(
            `StudentType/PossibleType/${applicationStudentId}`
          );
          setPossibleStudentType(possibleStudentTypeRes);

          const studentTypeByIdRes = await get(
            `StudentType/GetByStudentId/${applicationStudentId}`
          );
          const possibleTypeById = studentTypeByIdRes?.find(
            (value) => value?.id
          );
          setPossibleStudentTypeById(possibleTypeById);

          // const result = studentTypeByIdRes?.find(
          //   (value) => value?.id === possibleStudentTypeRes
          // );
          // if (result) {
          //   setStudentTypeLabel(result?.name);
          //   setStudentTypeValue(result?.id);
          // } else {
          //   setStudentTypeLabel("Select Student Type");
          //   setStudentTypeValue(0);
          // }

          // Fetch preferred country
          const preferredCountryRes = await get(
            `StudentType/PreferredCountry/${applicationStudentId}`
          );
          const universityCountryRes = await get(
            `UniversityCountryDD/ByStudent/${applicationStudentId}`
          );
          const resultCountry = universityCountryRes?.find(
            (answer) => answer?.id === preferredCountryRes?.universityCountryId
          );
          setCountryLabel(resultCountry?.name);
          setCountryValue(resultCountry?.id);
          setPreviousCountry(resultCountry?.id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (applicationStudentId) {
      fetchData();
    }
  }, [applicationStudentId]);

  const studentTypeName = studentType?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));
  const countryOptions = country?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const handlePrevious = () => {
    history.push(`/addStudentContactInformation/${applicationStudentId}/${1}`);
  };
  // home
  const handleManyYears = (e) => {
    let data = e.target.value.trimStart();
    setHowManyYears(data);
    if (data === "") {
      setHowManyYearsError("Years is required");
    } else {
      setHowManyYearsError("");
    }
  };
  const handleHomeResidencyStatus = (e) => {
    let data = e.target.value.trimStart();
    setHomeResidencyStatus(data);
    if (data === "") {
      setHomeResidencyStatusError("Residency Status  is required");
    } else {
      setHomeResidencyStatusError("");
    }
  };
  // home

  //Eu
  const handleDate = (e) => {
    if (e) {
      setDate(e);
    } else {
      setdateError("Date is required");
    }
  };

  const handleEuManyYears = (e) => {
    let data = e.target.value.trimStart();
    setLoanYearsForEU(data);
    if (data === "") {
      setLoanYearsForEUError("Years is required");
    } else {
      setLoanYearsForEUError("");
    }
  };

  const handleshareCode = (e) => {
    let data = e.target.value.trimStart();
    setShareCode(data);
    if (data === "") {
      setShareCodeError("Share Code is required");
    } else {
      setShareCodeError("");
    }
  };
  //Eu

  // Inter

  const handleresidencyStatus = (e) => {
    let data = e.target.value.trimStart();
    setResidencyStatus(data);
    if (data === "") {
      setResidencyStatusError("Residency Status required");
    } else {
      setResidencyStatusError("");
    }
  };

  const handleresidencyStatusUK = (e) => {
    let data = e.target.value.trimStart();
    setStatusInUK(data);
    if (data === "") {
      setStatusInUKError("Residency Status required");
    } else {
      setStatusInUKError("");
    }
  };
  const handleCurrentOtherStatusUK = (e) => {
    let data = e.target.value.trimStart();
    setCurrentOtherStatus(data);
    if (data === "") {
      setCurrentOtherStatusError("Other Status required");
    } else {
      setCurrentOtherStatusError("");
    }
  };

  const handleVisaType = (e) => {
    let data = e.target.value.trimStart();
    setVisaType(data);
    if (data === "") {
      setVisaTypeError("Visa Type is required");
    } else {
      setVisaTypeError("");
    }
  };
  // Inter
  useEffect(() => {
    if (hasSLC !== null) {
      setHasSLCError("");
    }
    if (haveStartedEducation !== null) {
      setHaveStartedEducationError("");
    }
    if (isStayedInUkInLast3Years !== null) {
      setIsStayedInUkInLast3YearsError("");
    }
    if (loansForEu !== null) {
      setLoansForEUError("");
    }
    if (isSettlementStatus !== null) {
      setIsSettlementStatusError("");
    }
    if (currentStatusUk !== null) {
      setCurrentStatusUkError("");
    }
    if (havingUnderGraduateCourseForEU !== null) {
      setHavingUnderGraduateCourseForEUError("");
    }
    if (isApplyingFromInside !== null) {
      setIsApplyingFromInsideError("");
    }

    if (isAppliedForUkVisa !== null) {
      setIsAppliedForUkVisaError("");
    }
    // if (visaType != "") {
    //   setVisaTypeError("");
    // }
    if (isRefusedForOtherVisa !== null) {
      setIsRefusedForOtherVisaError("");
    }
    if (FileList.length > 0) {
      setFileList1Error("");
    }
    if (FileList2.length === 1) {
      setFileList2Error("");
    }
    if (isRefusedForUKVisa !== null) {
      setIsRefusedForUKVisaError("");
    }
  }, [
    hasSLC,
    haveStartedEducation,
    isStayedInUkInLast3Years,
    loansForEu,
    isSettlementStatus,
    havingUnderGraduateCourseForEU,
    isApplyingFromInside,
    isAppliedForUkVisa,
    // visaType,
    isRefusedForOtherVisa,
    FileList,
    FileList2,
    isRefusedForUKVisa,
    currentStatusUk,
  ]);

  const validateRegisterForm = () => {
    let isFormValid = true;
    // Clear existing errors
    setStudentTypeError("");
    setHowManyYearsError("");
    setHomeResidencyStatusError("");
    setdateError("");
    setLoanYearsForEUError("");
    setStatusInUKError("");
    setCurrentOtherStatusError("");
    setShareCodeError("");
    setResidencyStatusError("");
    setVisaTypeError("");
    setdateError("");
    setLoansForEUError("");
    setIsSettlementStatusError("");
    setCurrentStatusUkError("");
    setIsStayedInUkInLast3YearsError("");
    setHavingUnderGraduateCourseForEUError("");
    setIsRefusedForUKVisaError("");
    console.log("first");
    // Validate Student Type
    if (studentTypeLabel === "Select Application Type") {
      isFormValid = false;
      setStudentTypeError("Student Type is required");
    }

    if (studentTypeLabel === "Home/UK" && hasSLC === null) {
      isFormValid = false;
      setHasSLCError("Student Loan Company (SLC) is required");
    }

    if (studentTypeLabel === "Home/UK" && haveStartedEducation === null) {
      isFormValid = false;
      setHaveStartedEducationError("Started education is required");
    }
    // Validate "Home/UK" type
    if (studentTypeLabel === "Home/UK" && hasSLC === true && !howManyYears) {
      isFormValid = false;
      setHowManyYearsError("Years is required");
    }

    if (
      studentTypeLabel === "Home/UK" &&
      showResidency.showResidencyStatus === true &&
      !homeResidencyStatus
    ) {
      isFormValid = false;
      setHomeResidencyStatusError("Residency Status is required");
    }

    // Validate "EU/EEA" type
    if (studentTypeLabel === "EU/EEA" && date === "") {
      isFormValid = false;
      setdateError("Date is required");
    }

    if (
      studentTypeLabel === "EU/EEA" &&
      loansForEu === true &&
      !loanYearsForEU
    ) {
      isFormValid = false;
      setLoanYearsForEUError("Years is required");
    }

    if (studentTypeLabel === "EU/EEA" && !statusInUK) {
      isFormValid = false;
      setStatusInUKError("Residency Status is required");
    }

    if (
      studentTypeLabel === "Home/UK" &&
      currentStatusUk === false &&
      !currentOtherStatus
    ) {
      isFormValid = false;
      setCurrentOtherStatusError("Other Status is required");
    }

    if (
      studentTypeLabel === "EU/EEA" &&
      isSettlementStatus === true &&
      !shareCode
    ) {
      isFormValid = false;
      setShareCodeError("Share Code is required");
    }

    // Validate "International" type
    if (
      studentTypeLabel === "International" &&
      isApplyingFromInside === true &&
      !residencyStatus
    ) {
      isFormValid = false;
      setResidencyStatusError("Residency Status required");
    }

    if (
      studentTypeLabel === "International" &&
      isAppliedForUkVisa === true &&
      !visaType
    ) {
      isFormValid = false;
      setVisaTypeError("Visa Type is require");
    }

    if (studentTypeLabel === "EU/EEA" && date === null) {
      isFormValid = false;
      setdateError("Date is required");
    }

    if (studentTypeLabel === "EU/EEA" && loansForEu === null) {
      isFormValid = false;
      setLoansForEUError("Select any of the options");
    }

    if (studentTypeLabel === "EU/EEA" && isSettlementStatus === null) {
      isFormValid = false;
      setIsSettlementStatusError("Settlement Status is required");
    }
    if (studentTypeLabel === "Home/UK" && currentStatusUk === null) {
      isFormValid = false;
      setCurrentStatusUkError("Current Status is required");
    }

    if (
      studentTypeLabel === "EU/EEA" &&
      isSettlementStatus === true &&
      isStayedInUkInLast3Years === null
    ) {
      isFormValid = false;
      setIsStayedInUkInLast3YearsError("Residency Status is required");
    }
    if (
      studentTypeLabel === "EU/EEA" &&
      isSettlementStatus === true &&
      statusInUK === ""
    ) {
      isFormValid = false;
      setStatusInUKError("Status is required");
    }
    if (
      studentTypeLabel === "EU/EEA" &&
      isSettlementStatus === false &&
      !setStatusInUK &&
      isStayedInUkInLast3Years === null
    ) {
      isFormValid = false;
      setIsStayedInUkInLast3YearsError("Please Select any option");
    }
    if (
      studentTypeLabel === "EU/EEA" &&
      havingUnderGraduateCourseForEU === null
    ) {
      isFormValid = false;
      setHavingUnderGraduateCourseForEUError("Select any options");
    }

    if (studentTypeLabel === "International" && isApplyingFromInside === null) {
      isFormValid = false;
      setIsApplyingFromInsideError("Please select any option");
    }

    if (
      studentTypeLabel === "International" &&
      isApplyingFromInside === false &&
      isAppliedForUkVisa === null
    ) {
      isFormValid = false;
      setIsAppliedForUkVisaError("Please select any option");
    }
    if (
      studentTypeLabel === "International" &&
      isApplyingFromInside === false &&
      isRefusedForOtherVisa === null
    ) {
      isFormValid = false;
      setIsRefusedForOtherVisaError("Please select any opptions");
    }

    // if (
    //   studentTypeLabel === "International" &&
    //   isAppliedForUkVisa === true &&
    //   isRefusedForUKVisa === true &&
    //   FileList.length === 0
    // ) {
    //   isFormValid = false;
    //   setFileList1Error("File are required");
    // }
    // if (
    //   studentTypeLabel === "International" &&
    //   isRefusedForOtherVisa === true &&
    //   FileList2.length === 0
    // ) {
    //   isFormValid = false;
    //   setFileList2Error("File are required");
    // }
    return isFormValid;
  };

  const handleSubmit = (event) => {
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
    if (date) {
      subData.append("dateOfMoveToUk", date);
    }
    var IsFormValid = validateRegisterForm();
    if (IsFormValid) {
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

  const [popoverOpen, setPopoverOpen] = useState("");
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

  const selectStudentType = (label, value) => {
    setStudentTypeError("");
    setHaveStartedEducationError("");
    setHasSLCError("");
    setHowManyYearsError("");
    setHomeResidencyStatusError("");
    setLoanYearsForEUError("");
    setStatusInUKError("");
    setCurrentOtherStatusError("");
    setShareCodeError("");
    setResidencyStatusError("");
    setVisaTypeError("");
    setdateError("");
    setLoansForEUError("");
    setIsSettlementStatusError("");
    setCurrentStatusUkError("");
    setIsStayedInUkInLast3YearsError("");
    setHavingUnderGraduateCourseForEUError("");
    setIsApplyingFromInsideError("");
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
  };

  return (
    <div>
      <BreadCrumb
        title="Application Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <StudentNavigation
            studentid={applicationStudentId}
            activetab={"3"}
            success={success}
            setSuccess={setSuccess}
            action={() => {}}
          />
          <Card>
            <CardBody>
              <TabContent activeTab={"3"}>
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
                            onChange={(opt) =>
                              selectCountry(opt.label, opt.value)
                            }
                          />
                        </FormGroup>
                        <FormGroup className="has-icon-left position-relative">
                          <span>
                            <span className="text-danger">*</span> Application
                            Type
                          </span>

                          <div className="d-flex">
                            <div className="w-100">
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
                            </div>
                            {/* <PopOverText
                              value={`<div>Home student is someone eligible for lower
                              tuition fees based on residency and immigration
                              status. To qualify, an individual must typically
                              have lived in the UK for at least three years
                              before the course start date and hold a relevant
                              immigration status, such as British citizenship
                              or settled status.
                              <br />
                              EU/EEA students in the UK may pay the same
                              tuition fees as home students if they have
                              pre-settled or settled status under the EU
                              Settlement Scheme. Without this status, they are
                              usually classified as international students.
                              <br />
                              International students in the UK are those who
                              apply from outside from UK or inside from UK
                              based on immigration status. They usually pay
                              higher tuition fees and cannot get government
                              student loans. To study in the UK, they also
                              need a student visa.</div>`}
                              btn={<i className="far fa-envelope"></i>}
                              popoverOpen={popoverOpen}
                              setPopoverOpen={setPopoverOpen}
                            /> */}

                            <b
                              className="p-2 border rounded ml-2 pointer relative"
                              title={`Home student is someone eligible for lower tuition fees based on residency and immigration status. To qualify, an individual must typically have lived in the UK for at least three years before the course start date and hold a relevant immigration status, such as British citizenship or settled status.
                         
EU/EEA students in the UK may pay the same tuition fees as home students if they have pre-settled or settled status under the EU Settlement Scheme. Without this status, they are usually classified as international students.
                          
International students in the UK are those who apply from outside from UK or inside from UK based on immigration status. They usually pay higher tuition fees and cannot get government student loans. To study in the UK, they also need a student visa.`}
                            >
                              ?
                            </b>
                            {/* <div className="help-data p-3 border rounded ml-2">
                                Home student is someone eligible for lower
                                tuition fees based on residency and immigration
                                status. To qualify, an individual must typically
                                have lived in the UK for at least three years
                                before the course start date and hold a relevant
                                immigration status, such as British citizenship
                                or settled status.
                                <br />
                                EU/EEA students in the UK may pay the same
                                tuition fees as home students if they have
                                pre-settled or settled status under the EU
                                Settlement Scheme. Without this status, they are
                                usually classified as international students.
                                <br />
                                International students in the UK are those who
                                apply from outside from UK or inside from UK
                                based on immigration status. They usually pay
                                higher tuition fees and cannot get government
                                student loans. To study in the UK, they also
                                need a student visa.
                              </div> */}
                          </div>

                          {studentTypeError && (
                            <span className="text-danger">
                              Application Type is Required
                            </span>
                          )}

                          {/* {studentTypeValue ? null : (
                            <>
                              {" "}
                              {possibleStudentType !==
                              possibleStudentTypeById.id ? (
                                <>
                                  {userType === userTypes?.Student ? (
                                    <div className="mt-1 d-flex justify-between cardborder">
                                      <img
                                        style={{ height: "100%" }}
                                        src={icon_info}
                                        alt=""
                                      />{" "}
                                      <div className="pl-3">
                                        <span>
                                          Note : Considering students
                                          nationality and preferred study
                                          country, the student's application
                                          type{" "}
                                          <>
                                            <b>
                                              {" "}
                                              {possibleStudentType === 1
                                                ? " Home"
                                                : possibleStudentType === 2
                                                ? " EU/EEU"
                                                : possibleStudentType === 3
                                                ? " International"
                                                : null}
                                            </b>
                                          </>
                                          . Your application type can not be{" "}
                                          <>
                                            <b>
                                              {" "}
                                              {possibleStudentType === 1
                                                ? " Home"
                                                : possibleStudentType === 2
                                                ? " EU/EEU"
                                                : possibleStudentType === 3
                                                ? " International"
                                                : null}
                                            </b>
                                          </>
                                          . According to your consultant
                                          recruitment type. For further
                                          instructions please
                                          contact administrator.
                                        </span>
                                      </div>
                                    </div>
                                  ) : userType === userTypes?.Consultant ? (
                                    <div className="mt-1 d-flex justify-between cardborder">
                                      <img
                                        style={{ height: "100%" }}
                                        src={icon_info}
                                        alt=""
                                      />{" "}
                                      <div className="pl-3">
                                        <span>
                                          Note : Considering students
                                          nationality and preferred study
                                          country, the student's application
                                          type{" "}
                                          <>
                                            <b>
                                              {" "}
                                              {possibleStudentType === 1
                                                ? " Home"
                                                : possibleStudentType === 2
                                                ? " EU/EEU"
                                                : possibleStudentType === 3
                                                ? " International"
                                                : null}
                                            </b>
                                          </>{" "}
                                          You can not recruit{" "}
                                          <>
                                            <b>
                                              {" "}
                                              {possibleStudentType === 1
                                                ? " Home"
                                                : possibleStudentType === 2
                                                ? " EU/EEU"
                                                : possibleStudentType === 3
                                                ? " International"
                                                : null}
                                            </b>
                                          </>{" "}
                                          student according to your recruitment
                                          type. For further instructions please
                                          contact administrator.
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="mt-1 d-flex justify-between cardborder">
                                      <img
                                        style={{ height: "100%" }}
                                        src={icon_info}
                                        alt=""
                                      />{" "}
                                      <div className="pl-3">
                                        <span>
                                          Note : Considering students
                                          nationality and preferred study
                                          country, the student's application
                                          type
                                          <>
                                            <b>
                                              {" "}
                                              {possibleStudentType === 1
                                                ? " Home"
                                                : possibleStudentType === 2
                                                ? " EU/EEU"
                                                : possibleStudentType === 3
                                                ? " International"
                                                : null}
                                            </b>
                                          </>{" "}
                                          . The student can not be
                                          <b>
                                            {" "}
                                            {possibleStudentType === 1
                                              ? " Home"
                                              : possibleStudentType === 2
                                              ? " EU/EEU"
                                              : possibleStudentType === 3
                                              ? " International"
                                              : null}
                                          </b>
                                          . According to consultant's
                                          recruitment type.
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </>
                          )} */}
                        </FormGroup>

                        {countryValue !== 0 ? (
                          <>
                            {/* {userType === userTypes?.Student ? (
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
                                          Based on your profile, your
                                          application type seems to be{" "}
                                          {studentTypeLabel}. You can change
                                          your application type.
                                        </span>
                                      ) : (
                                        <span>
                                          You have changed you preferred study
                                          destination. Your application type
                                          might also require to be changed.
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            ) : null} */}

                            {studentTypeLabel === "Home/UK" ? (
                              <HomeApplicationInformation
                                applicationInformation={applicationInformation}
                                countryId={countryValue}
                                studentTypeValue={studentTypeValue}
                                applicationStudentId={applicationStudentId}
                                hasSLC={hasSLC}
                                setHasSLC={setHasSLC}
                                setHaveStartedEducation={
                                  setHaveStartedEducation
                                }
                                haveStartedEducationError={
                                  haveStartedEducationError
                                }
                                setHaveStartedEducationError={
                                  setHaveStartedEducationError
                                }
                                hasSCLError={hasSCLError}
                                setHasSCLError={setHasSLCError}
                                haveStartedEducation={haveStartedEducation}
                                howManyYears={howManyYears}
                                setHowManyYears={setHowManyYears}
                                setHowManyYearsError={setHowManyYearsError}
                                howManyYearsError={howManyYearsError}
                                handleManyYears={handleManyYears}
                                handleHomeResidencyStatus={
                                  handleHomeResidencyStatus
                                }
                                homeResidencyStatus={homeResidencyStatus}
                                homeResidencyStatusError={
                                  homeResidencyStatusError
                                }
                                showResidency={showResidency}
                                setShowResidency={setShowResidency}
                                currentOtherStatus={currentOtherStatus}
                                setCurrentOtherStatus={setCurrentOtherStatus}
                                currentStatusUk={currentStatusUk}
                                setCurrentStatusUk={setCurrentStatusUk}
                                currentStatusUkError={currentStatusUkError}
                                setCurrentStatusUkError={
                                  setCurrentStatusUkError
                                }
                                handleCurrentOtherStatusUK={
                                  handleCurrentOtherStatusUK
                                }
                                currentOtherStatusError={
                                  currentOtherStatusError
                                }
                                setCurrentOtherStatusError={
                                  setCurrentOtherStatusError
                                }
                              />
                            ) : null}

                            {studentTypeLabel === "International" ? (
                              <InternationalApplicationInformation
                                applicationInformation={applicationInformation}
                                studentTypeValue={studentTypeValue}
                                countryLabel={countryLabel}
                                applicationStudentId={applicationStudentId}
                                FileList={FileList}
                                FileList2={FileList2}
                                handleChange={handleChange}
                                handleChange2={handleChange2}
                                howManyYearsError={howManyYearsError}
                                setResidencyForHomeRequire={
                                  setResidencyForHomeRequire
                                }
                                isApplyingFromInside={isApplyingFromInside}
                                setIsApplyingFromInside={
                                  setIsApplyingFromInside
                                }
                                residencyStatus={residencyStatus}
                                handleresidencyStatus={handleresidencyStatus}
                                residencyStatusError={residencyStatusError}
                                isAppliedForUkVisa={isAppliedForUkVisa}
                                setIsAppliedForUkVisa={setIsAppliedForUkVisa}
                                setVisaType={setVisaType}
                                visaType={visaType}
                                handleVisaType={handleVisaType}
                                visaTypeError={visaTypeError}
                                IsApplyingFromInsideError={
                                  IsApplyingFromInsideError
                                }
                                isRefusedForUKVisaError={
                                  isRefusedForUKVisaError
                                }
                                setIsApplyingFromInsideError={
                                  setIsApplyingFromInsideError
                                }
                                setIsAppliedForUkVisaError={
                                  setIsAppliedForUkVisaError
                                }
                                isAppliedForUkVisaError={
                                  isAppliedForUkVisaError
                                }
                                isRefusedForOtherVisaError={
                                  isRefusedForOtherVisaError
                                }
                                setIsRefusedForOtherVisaError={
                                  setIsRefusedForOtherVisaError
                                }
                                isRefusedForOtherVisa={isRefusedForOtherVisa}
                                setIsRefusedForOtherVisa={
                                  setIsRefusedForOtherVisa
                                }
                                isRefusedForUKVisa={isRefusedForUKVisa}
                                setIsRefusedForUKVisa={setIsRefusedForUKVisa}
                                fileList1Error={fileList1Error}
                                setFileList1Error={setFileList1Error}
                                fileList2Error={fileList2Error}
                                setFileList2Error={setFileList2Error}
                              />
                            ) : null}

                            {studentTypeLabel === "EU/EEA" ? (
                              <EuUkApplicationInformation
                                applicationStudentId={applicationStudentId}
                                applicationInformation={applicationInformation}
                                studentTypeValue={studentTypeValue}
                                countryLabel={countryLabel}
                                handleDate={handleDate}
                                dateError={dateError}
                                setdateError={setdateError}
                                date={date}
                                setHavingUnderGraduateCourseForEUError={
                                  setHavingUnderGraduateCourseForEUError
                                }
                                havingUnderGraduateCourseForEUError={
                                  havingUnderGraduateCourseForEUError
                                }
                                setHavingUnderGraduateCourseForEU={
                                  setHavingUnderGraduateCourseForEU
                                }
                                havingUnderGraduateCourseForEU={
                                  havingUnderGraduateCourseForEU
                                }
                                setIsStayedInUkInLast3YearsError={
                                  setIsStayedInUkInLast3YearsError
                                }
                                isStayedInUkInLast3YearsError={
                                  isStayedInUkInLast3YearsError
                                }
                                isStayedInUkInLast3Years={
                                  isStayedInUkInLast3Years
                                }
                                setIsStayedInUkInLast3Years={
                                  setIsStayedInUkInLast3Years
                                }
                                isSettlementStatusError={
                                  isSettlementStatusError
                                }
                                setIsSettlementStatusError={
                                  setIsSettlementStatusError
                                }
                                setLoansForEu={setLoansForEu}
                                loansForEu={loansForEu}
                                loansForEUError={loansForEUError}
                                setLoansForEUError={setLoansForEUError}
                                handleEuManyYears={handleEuManyYears}
                                loanYearsForEU={loanYearsForEU}
                                loanYearsForEUError={loanYearsForEUError}
                                isSettlementStatus={isSettlementStatus}
                                setIsSettlementStatus={setIsSettlementStatus}
                                shareCodeError={shareCodeError}
                                shareCode={shareCode}
                                handleshareCode={handleshareCode}
                                statusInUK={statusInUK}
                                statusInUKError={statusInUKError}
                                handleresidencyStatusUK={
                                  handleresidencyStatusUK
                                }
                              />
                            ) : null}
                          </>
                        ) : null}
                      </Col>
                    </Row>
                    <FormGroup row className=" mt-4">
                      <Col
                        lg="6"
                        md="4"
                        className="d-flex justify-content-between"
                      >
                        <PreviousButton action={handlePrevious} />
                        {permissions?.includes(permissionList?.Edit_Student) ? (
                          <SaveButton
                            text="Save and Next"
                            progress={progress}
                            buttonStatus={buttonStatus}
                          />
                        ) : null}
                      </Col>
                    </FormGroup>
                  </Form>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};
export default StudentApplicationInformation;
