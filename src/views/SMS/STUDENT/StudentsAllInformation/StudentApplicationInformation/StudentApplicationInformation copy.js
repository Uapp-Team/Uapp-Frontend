// import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
// import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
// import get from "../../../../../helpers/get";
// import {
//   Card,
//   CardBody,
//   Col,
//   Form,
//   FormGroup,
//   Row,
//   TabContent,
//   TabPane,
// } from "reactstrap";
// import moment from "moment";
// import HomeApplicationInformation from "./HomeApplicationInformation";
// import InternationalApplicationInformation from "./InternationalApplicationInformation";
// import EuUkApplicationInformation from "./EuUkApplicationInformation";
// import SaveButton from "../../../../../components/buttons/SaveButton";
// import PreviousButton from "../../../../../components/buttons/PreviousButton";
// import { userTypes } from "../../../../../constants/userTypeConstant";
// import icon_info from "../../../../../assets/img/icons/icon_info.png";
// import Select from "react-select";
// import { useToasts } from "react-toast-notifications";
// import post from "../../../../../helpers/post";
// import { currentDate } from "../../../../../components/date/calenderFormate";
// import { permissionList } from "../../../../../constants/AuthorizationConstant";

// const StudentApplicationInformation = () => {
//   const history = useHistory();
//   const { applicationStudentId } = useParams();
//   const [success, setSuccess] = useState(false);
//   const [studentType, setStudentType] = useState([]);
//   const userType = localStorage.getItem("userType");
//   const { addToast } = useToasts();

//   const [hasSLC, setHasSLC] = useState(false);
//   const [howManyYears, setHowManyYears] = useState("");
//   const [howManyYearsError, setHowManyYearsError] = useState("");
//   const [homeResidencyStatus, setHomeResidencyStatus] = useState("");
//   const [homeResidencyStatusError, setHomeResidencyStatusError] = useState("");

//   const [date, setDate] = useState(currentDate);
//   const [dateError, setdateError] = useState("");
//   const [residencyForHomeRequire, setResidencyForHomeRequire] = useState(false);

//   const [applicationInformation, setApplicationInformation] = useState([]);
//   const [studentTypeValue, setStudentTypeValue] = useState(0);
//   const [studentTypeLabel, setStudentTypeLabel] = useState(
//     "Select Student Type"
//   );
//   const [progress, setProgress] = useState(false);
//   const [buttonStatus, setButtonStatus] = useState(false);
//   const [country, setCountry] = useState([]);
//   const [countryLabel, setCountryLabel] = useState("Select Country");
//   const [countryValue, setCountryValue] = useState(0);
//   const [dataExist, setDataExist] = useState(false);
//   const [previousCountry, setPreviousCountry] = useState(null);
//   const [currentCountry, setCurrentCountry] = useState(null);
//   const [loansForEu, setLoansForEu] = useState(false);
//   const [loanYearsForEU, setLoanYearsForEU] = useState("");
//   const [loanYearsForEUError, setLoanYearsForEUError] = useState("");
//   const [isSettlementStatus, setIsSettlementStatus] = useState(false);
//   const [shareCode, setShareCode] = useState("");
//   const [shareCodeError, setShareCodeError] = useState("");
//   const [isApplyingFromInside, setIsApplyingFromInside] = useState(false);
//   const [residencyStatus, setResidencyStatus] = useState("");
//   const [residencyStatusError, setResidencyStatusError] = useState("");
//   const [isAppliedForUkVisa, setIsAppliedForUkVisa] = useState(false);
//   const [visaType, setVisaType] = useState("");
//   const [visaTypeError, setVisaTypeError] = useState("");
//   const [FileList, setFileList] = useState([]);
//   const [FileList2, setFileList2] = useState([]);
//   const [statusInUK, setStatusInUK] = useState("");
//   const [statusInUKError, setStatusInUKError] = useState("");
//   const permissions = JSON.parse(localStorage.getItem("permissions"));
//   const [showResidency, setShowResidency] = useState([]);
//   const [possibleStudentType, setPossibleStudentType] = useState([]);
//   const [possibleStudentTypeById, setPossibleStudentTypeById] = useState([]);
//   console.log(possibleStudentType, "possible type");
//   const [statusInUkValue, setstatusInUkValue] = useState("");
//   const [statusInUkLabel, setStatusInUkLabel] = useState("Residency Status");

//   const handleChange = ({ fileList }) => {
//     console.log(fileList);
//     setFileList(fileList);
//   };
//   const handleChange2 = ({ fileList }) => {
//     setFileList2(fileList);
//   };

//   useEffect(() => {
//     get(`StudentType/GetByStudentId/${applicationStudentId}`).then((res) => {
//       setStudentType(res);
//     });

//     get(`UniversityCountryDD/ByStudent/${applicationStudentId}`).then((res) => {
//       setCountry(res);
//     });

//     get(`ApplicationInfo/GetByStudentId/${applicationStudentId}`).then(
//       (res) => {
//         console.log(res);
//         if (res !== null) {
//           setApplicationInformation(res);
//           setHowManyYears(res?.loanYearsForHome);
//           setHomeResidencyStatus(res?.residencyStatusForHome);
//           setDate(moment(new Date(res?.dateOfMoveToUk)).format("YYYY-MM-DD"));
//           setStudentTypeLabel(res?.studentType?.name);
//           setLoanYearsForEU(res?.loanYearsForEU);
//           setShareCode(res?.shareCode);
//           setVisaType(res?.visaType);
//           setResidencyStatus(res?.currentResidencyStatusForInternational);
//           setStudentTypeValue(res?.studentType?.id);
//           res?.currentResidencyStatusForEU &&
//             setstatusInUkValue(res?.currentResidencyStatusForEU);
//           res?.currentResidencyStatusForEU &&
//             setStatusInUkLabel(res?.currentResidencyStatusForEU);
//           setStatusInUK(res?.currentResidencyStatusForEU);
//           get(`UniversityCountryDD/Index`).then((data) => {
//             const result = data?.find(
//               (answer) => answer?.id === res?.preferredCountry
//             );
//             setCountryLabel(result?.name);
//             setCountryValue(result?.id);
//             setPreviousCountry(result?.id);
//           });

//           setDataExist(true);
//         } else {
//           setDataExist(false);
//           get(`StudentType/PossibleType/${applicationStudentId}`).then(
//             (data) => {
//               setPossibleStudentType(data);
//               console.log("possible type", data);
//               get(`StudentType/GetByStudentId/${applicationStudentId}`).then(
//                 (res) => {
//                   setPossibleStudentTypeById(res?.find((value) => value?.id));
//                   // console.log(
//                   //   res?.find((value) => value?.id),
//                   //   "application type"
//                   // );
//                   const result = res?.find((value) => value?.id === data);

//                   if (result) {
//                     setStudentTypeLabel(result?.name);
//                     setStudentTypeValue(result?.id);
//                   } else {
//                     setStudentTypeLabel("Select Student Type");
//                     setStudentTypeValue(0);
//                   }

//                   // if (possibleStudentType !== possibleStudentTypeById.id) {
//                   //   setStudentTypeLabel("Select Student Type");
//                   //   setStudentTypeValue(0);
//                   // } else {
//                   //   setStudentTypeLabel(result?.name);
//                   //   setStudentTypeValue(result?.id);
//                   // }
//                 }
//               );
//             }
//           );
//           get(`StudentType/PreferredCountry/${applicationStudentId}`).then(
//             (action) => {
//               // console.log("Console", action);
//               // setDataInfo(action);

//               get(`UniversityCountryDD/ByStudent/${applicationStudentId}`).then(
//                 (res) => {
//                   console.log("Second", res);
//                   const result = res?.find(
//                     (answer) => answer?.id === action?.universityCountryId
//                   );
//                   setCountryLabel(result?.name);
//                   setCountryValue(result?.id);
//                   setPreviousCountry(result?.id);
//                   console.log("Result", result);
//                 }
//               );
//             }
//           );
//         }
//       }
//     );
//   }, [applicationStudentId]);
//   const studentTypeName = studentType?.map((branchCountry) => ({
//     label: branchCountry.name,
//     value: branchCountry.id,
//   }));
//   const countryOptions = country?.map((con) => ({
//     label: con?.name,
//     value: con?.id,
//   }));

//   const handlePrevious = () => {
//     history.push(`/addStudentContactInformation/${applicationStudentId}/${1}`);
//   };
//   // home
//   const handleManyYears = (e) => {
//     let data = e.target.value.trimStart();
//     setHowManyYears(data);
//     if (data === "") {
//       setHowManyYearsError("Years is required");
//     } else {
//       setHowManyYearsError("");
//     }
//   };
//   const handleHomeResidencyStatus = (e) => {
//     let data = e.target.value.trimStart();
//     setHomeResidencyStatus(data);
//     if (data === "") {
//       setHomeResidencyStatusError("Residency Status  is required");
//     } else {
//       setHomeResidencyStatusError("");
//     }
//   };
//   // home

//   //Eu
//   const handleDate = (e) => {
//     setDate(e.target.value);
//     if (e.target.value === "") {
//       setdateError("Date is required");
//     } else {
//       setdateError("");
//     }
//   };

//   const handleEuManyYears = (e) => {
//     let data = e.target.value.trimStart();
//     setLoanYearsForEU(data);
//     if (data === "") {
//       setLoanYearsForEUError("Years is required");
//     } else {
//       setLoanYearsForEUError("");
//     }
//   };

//   const handleshareCode = (e) => {
//     let data = e.target.value.trimStart();
//     setShareCode(data);
//     if (data === "") {
//       setShareCodeError("Share Code is required");
//     } else {
//       setShareCodeError("");
//     }
//   };

//   //Eu

//   // Inter

//   const handleresidencyStatus = (e) => {
//     let data = e.target.value.trimStart();
//     setResidencyStatus(data);
//     if (data === "") {
//       setResidencyStatusError("Residency Status required");
//     } else {
//       setResidencyStatusError("");
//     }
//   };
//   const handleresidencyStatusUK = (e) => {
//     let data = e.target.value.trimStart();
//     setStatusInUK(data);
//     if (data === "") {
//       setStatusInUKError("Residency Status required");
//     } else {
//       setStatusInUKError("");
//     }
//   };

//   const handleVisaType = (e) => {
//     let data = e.target.value.trimStart();
//     setVisaType(data);
//     if (data === "") {
//       setVisaTypeError("Visa Type is required");
//     } else {
//       setVisaTypeError("");
//     }
//   };
//   // Inter

//   const validateRegisterForm = () => {
//     var isFormValid = true;
//     if (studentTypeLabel === "Home/UK" && hasSLC === true && !howManyYears) {
//       isFormValid = false;
//       setHowManyYearsError("Years is required");
//     }

//     if (
//       studentTypeLabel === "Home/UK" &&
//       showResidency.showResidencyStatus === true &&
//       !homeResidencyStatus
//     ) {
//       isFormValid = false;
//       setHomeResidencyStatusError("Residency Status is required");
//     }

//     if (studentTypeLabel === "EU/EEA" && date === "") {
//       isFormValid = false;
//       setdateError("Date is required");
//     }
//     if (
//       studentTypeLabel === "EU/EEA" &&
//       loansForEu === true &&
//       !loanYearsForEU
//     ) {
//       isFormValid = false;
//       setLoanYearsForEUError("Years is required");
//     }
//     if (
//       studentTypeLabel === "EU/EEA" &&
//       isSettlementStatus === false &&
//       statusInUkValue === ""
//     ) {
//       isFormValid = false;
//       setStatusInUKError("Residency Status is required");
//     }
//     if (
//       studentTypeLabel === "EU/EEA" &&
//       isSettlementStatus === true &&
//       !shareCode
//     ) {
//       isFormValid = false;
//       setShareCodeError("Share Code is required");
//     }
//     if (
//       studentTypeLabel === "International" &&
//       isApplyingFromInside === true &&
//       !residencyStatus
//     ) {
//       isFormValid = false;
//       setResidencyStatusError("Residency Status required");
//     }
//     if (
//       studentTypeLabel === "International" &&
//       isAppliedForUkVisa === true &&
//       !visaType
//     ) {
//       isFormValid = false;
//       setVisaTypeError("Visa Type is required");
//     }
//     return isFormValid;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const subData = new FormData(event.target);
//     subData.append("CurrentResidencyStatusForEU", statusInUkValue);
//     subData.append(
//       "RefusalLetterForUKVisaFile",
//       FileList.length === 0 ? null : FileList[0]?.originFileObj
//     );
//     subData.append(
//       "RefusalLetterForOtherVisaFile",
//       FileList2.length === 0 ? null : FileList2[0]?.originFileObj
//     );
//     var IsFormValid = validateRegisterForm();
//     if (IsFormValid) {
//       setButtonStatus(true);
//       setProgress(true);

//       post(`ApplicationInfo/Submit`, subData).then((res) => {
//         setButtonStatus(false);
//         setProgress(false);
//         if (res?.status === 200 && res?.data?.isSuccess === true) {
//           setSuccess(!success);
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           setFileList([]);
//           setFileList2([]);
//           history.push(`/sourceofFund/${applicationStudentId}/${1}`);
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     }
//   };

//   const selectCountry = (label, value) => {
//     setCountryLabel(label);
//     setCountryValue(value);
//     setCurrentCountry(value);
//     get(
//       `StudentType/SavePreferredCountry?countryId=${value}&studentId=${applicationStudentId}`
//     ).then((res) => {
//       if (res) {
//         addToast("Preferred country saved successfully", {
//           appearance: "success",
//           autoDismiss: true,
//         });
//       } else {
//         addToast("Something went wrong", {
//           appearance: "error",
//           autoDismiss: true,
//         });
//       }
//     });
//   };

//   const selectStudentType = (label, value) => {
//     setStudentTypeLabel(label);
//     setStudentTypeValue(value);
//   };

//   return (
//     <div>
//       <BreadCrumb
//         title="Application Information"
//         backTo={userType === userTypes?.Student ? null : "Student"}
//         path={`/studentList`}
//       />

//       <StudentNavigation
//         studentid={applicationStudentId}
//         activetab={"3"}
//         success={success}
//         setSuccess={setSuccess}
//         action={() => {}}
//       />
//       <Card>
//         <CardBody>
//           <TabContent activeTab={"3"}>
//             <TabPane tabId="3">
//               <div>
//                 <p className="section-title">Application Information</p>
//               </div>
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col lg="6" md="8">
//                     <FormGroup className="has-icon-left position-relative">
//                       <span>
//                         {userType === userTypes?.Student
//                           ? "What is your preferred study destination?"
//                           : "Student's preferred study destination"}{" "}
//                       </span>

//                       <Select
//                         className="form-mt"
//                         options={countryOptions}
//                         value={{ label: countryLabel, value: countryValue }}
//                         onChange={(opt) => selectCountry(opt.label, opt.value)}
//                       />
//                     </FormGroup>
//                     <FormGroup className="has-icon-left position-relative">
//                       <span>
//                         <span className="text-danger">*</span> Application Type
//                       </span>

//                       <Select
//                         options={studentTypeName}
//                         value={{
//                           label: studentTypeLabel,
//                           value: studentTypeValue,
//                         }}
//                         onChange={(opt) =>
//                           selectStudentType(opt.label, opt.value)
//                         }
//                         name="studentTypeId"
//                         id="studentTypeId"
//                       />

//                       {studentTypeValue ? null : (
//                         <>
//                           {" "}
//                           {possibleStudentType !==
//                           possibleStudentTypeById.id ? (
//                             <>
//                               {userType === userTypes?.Student ? (
//                                 <div className="mt-1 d-flex justify-between cardborder">
//                                   <img
//                                     style={{ height: "100%" }}
//                                     src={icon_info}
//                                     alt=""
//                                   />{" "}
//                                   <div className="pl-3">
//                                     <span>
//                                       Note : Considering students nationality
//                                       and preferred study country, the student's
//                                       application type{" "}
//                                       <>
//                                         <b>
//                                           {" "}
//                                           {possibleStudentType === 1
//                                             ? " Home"
//                                             : possibleStudentType === 2
//                                             ? " EU/EEU"
//                                             : possibleStudentType === 3
//                                             ? " International"
//                                             : null}
//                                         </b>
//                                       </>
//                                       . Your application type can not be{" "}
//                                       <>
//                                         <b>
//                                           {" "}
//                                           {possibleStudentType === 1
//                                             ? " Home"
//                                             : possibleStudentType === 2
//                                             ? " EU/EEU"
//                                             : possibleStudentType === 3
//                                             ? " International"
//                                             : null}
//                                         </b>
//                                       </>
//                                       . According to your consultant
//                                       recruitment type. For further instructions
//                                       please contact administrator.
//                                     </span>
//                                   </div>
//                                 </div>
//                               ) : userType === userTypes?.Consultant ? (
//                                 <div className="mt-1 d-flex justify-between cardborder">
//                                   <img
//                                     style={{ height: "100%" }}
//                                     src={icon_info}
//                                     alt=""
//                                   />{" "}
//                                   <div className="pl-3">
//                                     <span>
//                                       Note : Considering students nationality
//                                       and preferred study country, the student's
//                                       application type{" "}
//                                       <>
//                                         <b>
//                                           {" "}
//                                           {possibleStudentType === 1
//                                             ? " Home"
//                                             : possibleStudentType === 2
//                                             ? " EU/EEU"
//                                             : possibleStudentType === 3
//                                             ? " International"
//                                             : null}
//                                         </b>
//                                       </>{" "}
//                                       You can not recruit{" "}
//                                       <>
//                                         <b>
//                                           {" "}
//                                           {possibleStudentType === 1
//                                             ? " Home"
//                                             : possibleStudentType === 2
//                                             ? " EU/EEU"
//                                             : possibleStudentType === 3
//                                             ? " International"
//                                             : null}
//                                         </b>
//                                       </>{" "}
//                                       student according to your recruitment
//                                       type. For further instructions please
//                                       contact administrator.
//                                     </span>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div className="mt-1 d-flex justify-between cardborder">
//                                   <img
//                                     style={{ height: "100%" }}
//                                     src={icon_info}
//                                     alt=""
//                                   />{" "}
//                                   <div className="pl-3">
//                                     <span>
//                                       Note : Considering students nationality
//                                       and preferred study country, the student's
//                                       application type
//                                       <>
//                                         <b>
//                                           {" "}
//                                           {possibleStudentType === 1
//                                             ? " Home"
//                                             : possibleStudentType === 2
//                                             ? " EU/EEU"
//                                             : possibleStudentType === 3
//                                             ? " International"
//                                             : null}
//                                         </b>
//                                       </>{" "}
//                                       . The student can not be
//                                       <b>
//                                         {" "}
//                                         {possibleStudentType === 1
//                                           ? " Home"
//                                           : possibleStudentType === 2
//                                           ? " EU/EEU"
//                                           : possibleStudentType === 3
//                                           ? " International"
//                                           : null}
//                                       </b>
//                                       . According to consultant's recruitment
//                                       type.
//                                     </span>
//                                   </div>
//                                 </div>
//                               )}
//                             </>
//                           ) : null}
//                         </>
//                       )}
//                     </FormGroup>

//                     {countryValue !== 0 ? (
//                       <>
//                         {userType === userTypes?.Student ? (
//                           <>
//                             {dataExist === false ? (
//                               <div className="mt-1 mb-4 d-flex justify-between align-items-center cardborder">
//                                 <img
//                                   style={{ height: "100%" }}
//                                   src={icon_info}
//                                   alt=""
//                                 />{" "}
//                                 <div className="pl-3">
//                                   {currentCountry === previousCountry ||
//                                   currentCountry === null ? (
//                                     <span>
//                                       Based on your profile, your application
//                                       type seems to be {studentTypeLabel}. You
//                                       can change your application type.
//                                     </span>
//                                   ) : (
//                                     <span>
//                                       You have changed you preferred study
//                                       destination. Your application type might
//                                       also require to be changed.
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             ) : null}
//                           </>
//                         ) : null}

//                         {studentTypeLabel === "Home/UK" ? (
//                           <HomeApplicationInformation
//                             applicationInformation={applicationInformation}
//                             countryId={countryValue}
//                             studentTypeValue={studentTypeValue}
//                             applicationStudentId={applicationStudentId}
//                             hasSLC={hasSLC}
//                             setHasSLC={setHasSLC}
//                             howManyYears={howManyYears}
//                             setHowManyYears={setHowManyYears}
//                             setHowManyYearsError={setHowManyYearsError}
//                             howManyYearsError={howManyYearsError}
//                             handleManyYears={handleManyYears}
//                             handleHomeResidencyStatus={
//                               handleHomeResidencyStatus
//                             }
//                             homeResidencyStatus={homeResidencyStatus}
//                             homeResidencyStatusError={homeResidencyStatusError}
//                             showResidency={showResidency}
//                             setShowResidency={setShowResidency}
//                           />
//                         ) : null}

//                         {studentTypeLabel === "International" ? (
//                           <InternationalApplicationInformation
//                             applicationInformation={applicationInformation}
//                             studentTypeValue={studentTypeValue}
//                             countryLabel={countryLabel}
//                             applicationStudentId={applicationStudentId}
//                             FileList={FileList}
//                             FileList2={FileList2}
//                             handleChange={handleChange}
//                             handleChange2={handleChange2}
//                             howManyYearsError={howManyYearsError}
//                             setResidencyForHomeRequire={
//                               setResidencyForHomeRequire
//                             }
//                             isApplyingFromInside={isApplyingFromInside}
//                             setIsApplyingFromInside={setIsApplyingFromInside}
//                             residencyStatus={residencyStatus}
//                             handleresidencyStatus={handleresidencyStatus}
//                             residencyStatusError={residencyStatusError}
//                             isAppliedForUkVisa={isAppliedForUkVisa}
//                             setIsAppliedForUkVisa={setIsAppliedForUkVisa}
//                             setVisaType={setVisaType}
//                             visaType={visaType}
//                             handleVisaType={handleVisaType}
//                             visaTypeError={visaTypeError}
//                           />
//                         ) : null}

//                         {studentTypeLabel === "EU/EEA" ? (
//                           <EuUkApplicationInformation
//                             applicationStudentId={applicationStudentId}
//                             applicationInformation={applicationInformation}
//                             studentTypeValue={studentTypeValue}
//                             countryLabel={countryLabel}
//                             handleDate={handleDate}
//                             dateError={dateError}
//                             date={date}
//                             setLoansForEu={setLoansForEu}
//                             loansForEu={loansForEu}
//                             handleEuManyYears={handleEuManyYears}
//                             loanYearsForEU={loanYearsForEU}
//                             loanYearsForEUError={loanYearsForEUError}
//                             isSettlementStatus={isSettlementStatus}
//                             setIsSettlementStatus={setIsSettlementStatus}
//                             shareCodeError={shareCodeError}
//                             shareCode={shareCode}
//                             handleshareCode={handleshareCode}
//                             statusInUK={statusInUK}
//                             statusInUKError={statusInUKError}
//                             handleresidencyStatusUK={handleresidencyStatusUK}
//                             statusInUkValue={statusInUkValue}
//                             setstatusInUkValue={setstatusInUkValue}
//                             setStatusInUkLabel={setStatusInUkLabel}
//                             statusInUkLabel={statusInUkLabel}
//                             setStatusInUKError={setStatusInUKError}
//                           />
//                         ) : null}
//                       </>
//                     ) : null}
//                   </Col>
//                 </Row>
//                 <FormGroup row className=" mt-4">
//                   <Col lg="6" md="4" className="d-flex justify-content-between">
//                     <PreviousButton action={handlePrevious} />
//                     {permissions?.includes(permissionList?.Edit_Student) ? (
//                       <SaveButton
//                         text="Save and Next"
//                         progress={progress}
//                         buttonStatus={buttonStatus}
//                       />
//                     ) : null}
//                   </Col>
//                 </FormGroup>
//               </Form>
//             </TabPane>
//           </TabContent>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };
// export default StudentApplicationInformation;
