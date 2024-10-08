// import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormText,
//   Col,
//   Row,
//   InputGroup,
//   Table,
//   TabContent,
//   TabPane,
//   Nav,
//   NavItem,
//   NavLink,
// } from "reactstrap";
// import get from "../../../../../helpers/get";
// import post from "../../../../../helpers/post";
// import put from "../../../../../helpers/put";
// import ButtonForFunction from "../../../Components/ButtonForFunction";
// import ButtonLoader from "../../../Components/ButtonLoader";
// import { permissionList } from "../../../../../constants/AuthorizationConstant";
// import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

// const CopyUniversitySubjectTestScore = () => {
//   const history = useHistory();
//   const { id, subjId, newSubId } = useParams();

//   const [activetab, setActivetab] = useState("4");
//   const [ielts, setIelts] = useState(false);
//   const [required, setRequired] = useState(false);

//   const [ieltsReq, setIeltsReq] = useState(false);
//   const [ieltsReq1, setIeltsReq1] = useState(false);
//   const [ieltsReq2, setIeltsReq2] = useState(false);
//   const [ieltsReq3, setIeltsReq3] = useState(false);
//   const [ieltsReq4, setIeltsReq4] = useState(false);

//   const [greRequired, setGreRequired] = useState(false);
//   const [greRequired1, setGreRequired1] = useState(false);
//   const [greRequired2, setGreRequired2] = useState(false);
//   const [greRequired3, setGreRequired3] = useState(false);
//   const [greRequired4, setGreRequired4] = useState(false);

//   const [gmatRequired, setGmatRequired] = useState(false);
//   const [gmatRequired1, setGmatRequired1] = useState(false);
//   const [gmatRequired2, setGmatRequired2] = useState(false);
//   const [gmatRequired3, setGmatRequired3] = useState(false);
//   const [gmatRequired4, setGmatRequired4] = useState(false);

//   const [buttonStatus, setButtonStatus] = useState(false);
//   const [progress, setProgress] = useState(false);

//   const [progress1, setProgress1] = useState(false);
//   const [progress2, setProgress2] = useState(false);
//   const [progress3, setProgress3] = useState(false);
//   const [progress4, setProgress4] = useState(false);
//   const [progress5, setProgress5] = useState(false);

//   const [score, setScore] = useState(null);

//   const [ieltsScore, setIeltsScore] = useState(null);
//   const [ieltsScore1, setIeltsScore1] = useState(null);
//   const [ieltsScore2, setIeltsScore2] = useState(null);
//   const [ieltsScore3, setIeltsScore3] = useState(null);
//   const [ieltsScore4, setIeltsScore4] = useState(null);

//   const [greScore, setGreScore] = useState(null);

//   const [greScore1, setGreScore1] = useState(null);
//   const [greScore2, setGreScore2] = useState(null);
//   const [greScore3, setGreScore3] = useState(null);
//   const [greScore4, setGreScore4] = useState(null);

//   const [gmatScore, setGmatScore] = useState(null);
//   const [gmatScore1, setGmatScore1] = useState(null);
//   const [gmatScore2, setGmatScore2] = useState(null);
//   const [gmatScore3, setGmatScore3] = useState(null);
//   const [gmatScore4, setGmatScore4] = useState(null);

//   const { addToast } = useToasts();
//   const [data, setData] = useState({});
//   const [foundationData, setFoundationData] = useState({});
//   const [underGradData, setUnderGradData] = useState({});
//   const [postGradData, setPostGradData] = useState({});
//   const [researchData, setResearchData] = useState({});
//   const [otherData, setOtherData] = useState({});

//   const permissions = JSON.parse(localStorage.getItem("permissions"));

//   useEffect(() => {
//     // get(`TestScoreRequirement/Index/${newSubId}`).then((res) => {
//     //   console.log("test data", res);
//     //   setData(res);
//     //   setRequired(res?.isTestScoreRequired);
//     //   setIelts(res?.isIeltsMandatory);
//     //   setScore(res?.score);
//     // });

//     get(`FoundationTestScore/GetBySubject/${newSubId}`).then((res) => {
//       setFoundationData(res);
//       setGreRequired(res?.isGreMandatory);
//       // setData(res);
//       setGmatRequired(res?.isGmatMandatory);
//       // setGreRequired(res?.isGreMandatory);
//       setIeltsReq(res?.isIeltsMandatory);
//       setIeltsScore(res?.ieltstScore);
//       setGreScore(res?.greScore);
//       setGmatScore(res?.gmatScore);
//     });

//     get(`UnderGraduateTestScore/GetBySubject/${newSubId}`).then((res) => {
//       setUnderGradData(res);
//       setGreRequired1(res?.isGreMandatory);
//       // setData(res);
//       setGmatRequired1(res?.isGmatMandatory);
//       // setGreRequired(res?.isGreMandatory);
//       setIeltsReq1(res?.isIeltsMandatory);
//       setIeltsScore1(res?.ieltstScore);
//       setGreScore1(res?.greScore);
//       setGmatScore1(res?.gmatScore);
//     });

//     get(`PostGraduateTestScore/GetBySubject/${newSubId}`).then((res) => {
//       setPostGradData(res);
//       setGreRequired2(res?.isGreMandatory);
//       // setData(res);
//       setGmatRequired2(res?.isGmatMandatory);
//       // setGreRequired(res?.isGreMandatory);
//       setIeltsReq2(res?.isIeltsMandatory);
//       setIeltsScore2(res?.ieltstScore);
//       setGreScore2(res?.greScore);
//       setGmatScore2(res?.gmatScore);
//     });

//     get(`ResearchTestScore/GetBySubject/${newSubId}`).then((res) => {
//       setResearchData(res);
//       setGreRequired3(res?.isGreMandatory);
//       // setData(res);
//       setGmatRequired3(res?.isGmatMandatory);
//       // setGreRequired(res?.isGreMandatory);
//       setIeltsReq3(res?.isIeltsMandatory);
//       setIeltsScore3(res?.ieltstScore);
//       setGreScore3(res?.greScore);
//       setGmatScore3(res?.gmatScore);
//     });

//     get(`DefaultTestScore/GetBySubject/${newSubId}`).then((res) => {
//       setOtherData(res);
//       setGreRequired4(res?.isGreMandatory);
//       // setData(res);
//       setGmatRequired4(res?.isGmatMandatory);
//       // setGreRequired(res?.isGreMandatory);
//       setIeltsReq4(res?.isIeltsMandatory);
//       setIeltsScore4(res?.ieltstScore);
//       setGreScore4(res?.greScore);
//       setGmatScore4(res?.gmatScore);
//     });
//   }, []);

//   const goBack = () => {
//     history.push(
//       `/copyAndAddUniversitySubjectDeliveryPattern/${id}/${subjId}/${newSubId}`
//     );
//   };

//   const goFront = () => {
//     history.push(
//       `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//     );
//   };

//   const toggle = (tab) => {
//     setActivetab(tab);
//     if (tab == "1") {
//       history.push(`/copyAndAddUniversitySubject/${id}/${subjId}/${newSubId}`);
//     }
//     if (tab == "2") {
//       history.push(
//         `/copyAndAddUniversitySubjectFee/${id}/${subjId}/${newSubId}`
//       );
//     }
//     if (tab == "3") {
//       history.push(
//         `/copyAndAddUniversitySubjectDeliveryPattern/${id}/${subjId}/${newSubId}`
//       );
//     }
//     if (tab == "4") {
//       history.push(
//         `/copyAndAddUniversitySubjectTestScore/${id}/${subjId}/${newSubId}`
//       );
//     }
//     if (tab == "5") {
//       history.push(
//         `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//       );
//     }
//     if (tab == "6") {
//       history.push(
//         `/copyAndAddUniversitySubjectDocumentRequirement/${id}/${subjId}/${newSubId}`
//       );
//     }
//     if (tab == "7") {
//       history.push(
//         `/copyAddUniversitySubjectAssignToCampus/${id}/${subjId}/${newSubId}`
//       );
//     }
//     if (tab == "8") {
//       history.push(
//         `/copyAndAddUniversitySubjectIntake/${id}/${subjId}/${newSubId}`
//       );
//     }
//   };

//   const handleIelts = (e) => {
//     setIelts(e.target.checked);
//   };

//   const handleRequired = (e) => {
//     setRequired(e.target.checked);
//   };

//   const handleScore = (e) => {
//     setScore(e.target.value);
//   };

//   const handleIeltsScore = (e) => {
//     setIeltsScore(e.target.value);
//   };
//   const handleIeltsScore1 = (e) => {
//     setIeltsScore1(e.target.value);
//   };
//   const handleIeltsScore2 = (e) => {
//     setIeltsScore2(e.target.value);
//   };
//   const handleIeltsScore3 = (e) => {
//     setIeltsScore3(e.target.value);
//   };
//   const handleIeltsScore4 = (e) => {
//     setIeltsScore4(e.target.value);
//   };

//   const handleGreScore = (e) => {
//     setGreScore(e.target.value);
//   };
//   const handleGreScore1 = (e) => {
//     setGreScore1(e.target.value);
//   };
//   const handleGreScore2 = (e) => {
//     setGreScore2(e.target.value);
//   };
//   const handleGreScore3 = (e) => {
//     setGreScore3(e.target.value);
//   };
//   const handleGreScore4 = (e) => {
//     setGreScore4(e.target.value);
//   };

//   const handleGmatScore = (e) => {
//     setGmatScore(e.target.value);
//   };
//   const handleGmatScore1 = (e) => {
//     setGmatScore1(e.target.value);
//   };
//   const handleGmatScore2 = (e) => {
//     setGmatScore2(e.target.value);
//   };
//   const handleGmatScore3 = (e) => {
//     setGmatScore3(e.target.value);
//   };
//   const handleGmatScore4 = (e) => {
//     setGmatScore4(e.target.value);
//   };

//   const handleIeltsReq = (e) => {
//     setIeltsReq(e.target.checked);
//   };
//   const handleIeltsReq1 = (e) => {
//     setIeltsReq1(e.target.checked);
//   };
//   const handleIeltsReq2 = (e) => {
//     setIeltsReq2(e.target.checked);
//   };
//   const handleIeltsReq3 = (e) => {
//     setIeltsReq3(e.target.checked);
//   };
//   const handleIeltsReq4 = (e) => {
//     setIeltsReq4(e.target.checked);
//   };

//   const handleGreRequired = (e) => {
//     setGreRequired(e.target.checked);
//   };
//   const handleGreRequired1 = (e) => {
//     setGreRequired1(e.target.checked);
//   };
//   const handleGreRequired2 = (e) => {
//     setGreRequired2(e.target.checked);
//   };
//   const handleGreRequired3 = (e) => {
//     setGreRequired3(e.target.checked);
//   };
//   const handleGreRequired4 = (e) => {
//     setGreRequired4(e.target.checked);
//   };

//   const handleGmatRequired = (e) => {
//     setGmatRequired(e.target.checked);
//   };
//   const handleGmatRequired1 = (e) => {
//     setGmatRequired1(e.target.checked);
//   };
//   const handleGmatRequired2 = (e) => {
//     setGmatRequired2(e.target.checked);
//   };
//   const handleGmatRequired3 = (e) => {
//     setGmatRequired3(e.target.checked);
//   };
//   const handleGmatRequired4 = (e) => {
//     setGmatRequired4(e.target.checked);
//   };

//   const submitTestScore = (event) => {
//     event.preventDefault();

//     const subData = new FormData(event.target);

//     subData.append("isTestScoreRequired", required);
//     subData.append("isIeltsMandatory", data == null ? false : ielts);

//     if (data?.id) {
//       setProgress(true);
//       put(`TestScoreRequirement/Update`, subData).then((res) => {
//         setProgress(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversityApplicationDocument/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     } else {
//       setProgress(true);
//       post(`TestScoreRequirement/Create`, subData).then((res) => {
//         setProgress(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     }
//   };

//   const submitFoundationScore = (event) => {
//     event.preventDefault();

//     const subData = new FormData(event.target);

//     subData.append("isGreMandatory", greRequired ? true : false);
//     subData.append("isGmatMandatory", gmatRequired ? true : false);
//     subData.append("isIeltsMandatory", ieltsReq ? true : false);
//     // subData.append("gmatScore", gmatScore);
//     // subData.append("greScore", greScore);

//     if (foundationData?.id) {
//       setProgress1(true);
//       put(`FoundationTestScore/Update`, subData).then((res) => {
//         setProgress1(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversityApplicationDocument/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     } else {
//       setProgress1(true);
//       post(`FoundationTestScore/Create`, subData).then((res) => {
//         setProgress1(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//           setProgress1(false);
//         }
//       });
//     }
//   };

//   const submitUndergradScore = (event) => {
//     event.preventDefault();

//     const subData = new FormData(event.target);

//     subData.append("isGreMandatory", greRequired1 ? true : false);
//     subData.append("isGmatMandatory", gmatRequired1 ? true : false);
//     subData.append("isIeltsMandatory", ieltsReq1 ? true : false);
//     // subData.append("gmatScore", gmatScore);
//     // subData.append("greScore", greScore);

//     if (underGradData?.id) {
//       setProgress2(true);
//       put(`UnderGraduateTestScore/Update`, subData).then((res) => {
//         setProgress2(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversityApplicationDocument/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     } else {
//       setProgress2(true);
//       post(`UnderGraduateTestScore/Create`, subData).then((res) => {
//         setProgress2(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//           setProgress2(false);
//         }
//       });
//     }
//   };

//   const submitPostgradScore = (event) => {
//     event.preventDefault();

//     const subData = new FormData(event.target);

//     subData.append("isGreMandatory", greRequired2 ? true : false);
//     subData.append("isGmatMandatory", gmatRequired2 ? true : false);
//     subData.append("isIeltsMandatory", ieltsReq2 ? true : false);
//     // subData.append("gmatScore", gmatScore);
//     // subData.append("greScore", greScore);

//     if (postGradData?.id) {
//       setProgress3(true);
//       put(`PostGraduateTestScore/Update`, subData).then((res) => {
//         setProgress3(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversityApplicationDocument/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     } else {
//       setProgress3(true);
//       post(`PostGraduateTestScore/Create`, subData).then((res) => {
//         setProgress3(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//           setProgress3(false);
//         }
//       });
//     }
//   };

//   const submitResearchScore = (event) => {
//     event.preventDefault();

//     const subData = new FormData(event.target);

//     subData.append("isGreMandatory", greRequired3 ? true : false);
//     subData.append("isGmatMandatory", gmatRequired3 ? true : false);
//     subData.append("isIeltsMandatory", ieltsReq3 ? true : false);
//     // subData.append("gmatScore", gmatScore);
//     // subData.append("greScore", greScore);

//     if (researchData?.id) {
//       setProgress4(true);
//       put(`ResearchTestScore/Update`, subData).then((res) => {
//         setProgress4(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversityApplicationDocument/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     } else {
//       setProgress4(true);
//       post(`ResearchTestScore/Create`, subData).then((res) => {
//         setProgress4(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//           setProgress4(false);
//         }
//       });
//     }
//   };

//   const submitOtherScore = (event) => {
//     event.preventDefault();

//     const subData = new FormData(event.target);

//     subData.append("isGreMandatory", greRequired4 ? true : false);
//     subData.append("isGmatMandatory", gmatRequired4 ? true : false);
//     subData.append("isIeltsMandatory", ieltsReq4 ? true : false);
//     // subData.append("gmatScore", gmatScore);
//     // subData.append("greScore", greScore);

//     if (otherData?.id) {
//       setProgress5(true);
//       put(`DefaultTestScore/Update`, subData).then((res) => {
//         setProgress5(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversityApplicationDocument/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//         }
//       });
//     } else {
//       setProgress5(true);
//       post(`DefaultTestScore/Create`, subData).then((res) => {
//         setProgress5(false);
//         if (res?.status == 200 && res?.data?.isSuccess == true) {
//           addToast(res?.data?.message, {
//             appearance: "success",
//             autoDismiss: true,
//           });
//           // history.push(
//           //   `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
//           // );
//         } else {
//           addToast(res?.data?.message, {
//             appearance: "error",
//             autoDismiss: true,
//           });
//           setProgress5(false);
//         }
//       });
//     }
//   };

//   return (
//     <div>
//       <BreadCrumb
//         title="subject Test Score"
//         backTo="University Course"
//         path={`/universitySubjectList/${id}`}
//       />

//       <Card>
//         <CardBody>
//           <Nav tabs>
//             <NavItem>
//               <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
//                 Course Information
//               </NavLink>
//             </NavItem>

//             <NavItem>
//               <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
//                 Course Fee Information
//               </NavLink>
//             </NavItem>

//             <NavItem>
//               <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
//                 Delivery Pattern
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
//                 Test Score
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
//                 Requirement
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
//                 Document Requirement
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
//                 Campus
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
//                 Intake
//               </NavLink>
//             </NavItem>
//           </Nav>
//           <TabContent activeTab={activetab}>
//             <TabPane tabId="4">
//               {/* <Form onSubmit={submitTestScore} className="mt-5">
//                 <div className="hedding-titel d-flex justify-content-between mb-4">
//                   <div>
//                     <h5>
//                       {" "}
//                       <b>Test Score Infomration</b>{" "}
//                     </h5>

//                     <div className="bg-h"></div>
//                   </div>
//                 </div>

//                 <input
//                   type="hidden"
//                   name="subjectId"
//                   id="subjectId"
//                   value={newSubId}
//                 />

//                 {data?.id ? (
//                   <input type="hidden" name="id" id="id" value={data?.id} />
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is Test Score Required</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleRequired}
//                       checked={required}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {required ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>Is IELTS Mandatory</span>
//                       </Col>
//                       <Col md="6">
//                         <Input
//                           className="ml-1"
//                           type="checkbox"
//                           //   name='isIeltsMandatory'
//                           //   id='isIeltsMandatory'
//                           onChange={handleIelts}
//                           checked={ielts}
//                         />
//                       </Col>
//                     </FormGroup>

//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>
//                           {ielts ? "IELTS Score" : "IELTS Equivalent Score"}
//                         </span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="score"
//                           id="score"
//                           placeholder="Enter Score"
//                           defaultValue={data?.score}
//                           required
//                           onChange={handleScore}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <div className="row">
//                   <div className="col-md-5 d-flex justify-content-end">
//                     <ButtonForFunction
//                       type={"submit"}
//                       className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
//                       name={progress ? <ButtonLoader /> : "Save"}
//                       disable={!(required && score > "1")}
//                       permission={6}
//                     />
//                   </div>
//                 </div>
//               </Form> */}

//               {/* foundation information */}
//               <Form onSubmit={submitFoundationScore} className="mt-5">
//                 <div className="hedding-titel d-flex justify-content-between mb-4">
//                   <div>
//                     <h5>
//                       {" "}
//                       <b>Foundation Test Score Requirements</b>{" "}
//                     </h5>

//                     <div className="bg-h"></div>
//                   </div>
//                 </div>

//                 <input
//                   type="hidden"
//                   name="subjectId"
//                   id="subjectId"
//                   value={newSubId}
//                 />

//                 {foundationData?.id ? (
//                   <input
//                     type="hidden"
//                     name="id"
//                     id="id"
//                     value={foundationData?.id}
//                   />
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is IELTS Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isIeltsMandatory'
//                       //   id='isIeltsMandatory'
//                       onChange={handleIeltsReq}
//                       checked={ieltsReq}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {ieltsReq ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>IELTS Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="number"
//                           name="ieltstScore"
//                           id="ieltstScore"
//                           min="0"
//                           step="any"
//                           placeholder="Enter IELTS Score"
//                           defaultValue={foundationData?.ieltstScore}
//                           required
//                           onChange={handleIeltsScore}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : (
//                   <FormGroup row className="has-icon-left position-relative">
//                     <Col md="2">
//                       <span>IELTS Equivalent Score</span>
//                     </Col>
//                     <Col md="3">
//                       <Input
//                         type="number"
//                         name="ieltstScore"
//                         id="ieltstScore"
//                         min="0"
//                         step="any"
//                         placeholder="Enter IELTS Equivalent Score"
//                         defaultValue={foundationData?.ieltstScore}
//                         required
//                         onChange={handleIeltsScore}
//                       />
//                     </Col>
//                   </FormGroup>
//                 )}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GRE Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGreRequired}
//                       checked={greRequired}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {greRequired ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GRE Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="greScore"
//                           id="greScore"
//                           placeholder="Enter GRE Score"
//                           defaultValue={foundationData?.greScore}
//                           required
//                           onChange={handleGreScore}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GMAT Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGmatRequired}
//                       checked={gmatRequired}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {gmatRequired ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GMAT Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="gmatScore"
//                           id="gmatScore"
//                           placeholder="Enter GMAT Score"
//                           defaultValue={foundationData?.gmatScore}
//                           required
//                           onChange={handleGmatScore}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <div className="row">
//                   <div className="col-md-5 d-flex justify-content-end">
//                     {permissions?.includes(
//                       permissionList.Add_New_Subject_Test_Requirement
//                     ) ||
//                     permissions?.includes(
//                       permissionList.Update_Subject_Test_Requirement_info
//                     ) ? (
//                       <ButtonForFunction
//                         type={"submit"}
//                         className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
//                         name={progress1 ? <ButtonLoader /> : "Save"}
//                         disable={
//                           !(
//                             (greRequired && greScore > "1") ||
//                             (gmatRequired && gmatScore > "1") ||
//                             ieltsScore > "1"
//                           )
//                         }
//                         permission={6}
//                       />
//                     ) : null}
//                   </div>
//                 </div>
//               </Form>
//               {/* foundation information ends here */}

//               {/* undergraduation information starts here */}
//               <Form onSubmit={submitUndergradScore} className="mt-5">
//                 <div className="hedding-titel d-flex justify-content-between mb-4">
//                   <div>
//                     <h5>
//                       {" "}
//                       <b>Undergraduate Test Score Requirements</b>{" "}
//                     </h5>

//                     <div className="bg-h"></div>
//                   </div>
//                 </div>

//                 <input
//                   type="hidden"
//                   name="subjectId"
//                   id="subjectId"
//                   value={newSubId}
//                 />

//                 {underGradData?.id ? (
//                   <input
//                     type="hidden"
//                     name="id"
//                     id="id"
//                     value={underGradData?.id}
//                   />
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is IELTS Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isIeltsMandatory'
//                       //   id='isIeltsMandatory'
//                       onChange={handleIeltsReq1}
//                       checked={ieltsReq1}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {ieltsReq1 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>IELTS Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="number"
//                           name="ieltstScore"
//                           id="ieltstScore"
//                           min="0"
//                           step="any"
//                           placeholder="Enter IELTS Score"
//                           defaultValue={underGradData?.ieltstScore}
//                           required
//                           onChange={handleIeltsScore1}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : (
//                   <FormGroup row className="has-icon-left position-relative">
//                     <Col md="2">
//                       <span>IELTS Equivalent Score</span>
//                     </Col>
//                     <Col md="3">
//                       <Input
//                         type="number"
//                         name="ieltstScore"
//                         id="ieltstScore"
//                         min="0"
//                         step="any"
//                         placeholder="Enter IELTS Equivalent Score"
//                         defaultValue={underGradData?.ieltstScore}
//                         required
//                         onChange={handleIeltsScore1}
//                       />
//                     </Col>
//                   </FormGroup>
//                 )}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GRE Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGreRequired1}
//                       checked={greRequired1}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {greRequired1 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GRE Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="greScore"
//                           id="greScore"
//                           placeholder="Enter GRE Score"
//                           defaultValue={underGradData?.greScore}
//                           required
//                           onChange={handleGreScore1}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GMAT Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGmatRequired1}
//                       checked={gmatRequired1}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {gmatRequired1 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GMAT Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="gmatScore"
//                           id="gmatScore"
//                           placeholder="Enter GMAT Score"
//                           defaultValue={underGradData?.gmatScore}
//                           required
//                           onChange={handleGmatScore1}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <div className="row">
//                   <div className="col-md-5 d-flex justify-content-end">
//                     {permissions?.includes(
//                       permissionList.Add_New_Subject_Test_Requirement
//                     ) ||
//                     permissions?.includes(
//                       permissionList.Update_Subject_Test_Requirement_info
//                     ) ? (
//                       <ButtonForFunction
//                         type={"submit"}
//                         className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
//                         name={progress2 ? <ButtonLoader /> : "Save"}
//                         disable={
//                           !(
//                             (greRequired1 && greScore1 > "1") ||
//                             (gmatRequired1 && gmatScore1 > "1") ||
//                             ieltsScore1 > "1"
//                           )
//                         }
//                         permission={6}
//                       />
//                     ) : null}
//                   </div>
//                 </div>
//               </Form>
//               {/* undergraduation information ends here */}

//               {/* post grad starts here */}
//               <Form onSubmit={submitPostgradScore} className="mt-5">
//                 <div className="hedding-titel d-flex justify-content-between mb-4">
//                   <div>
//                     <h5>
//                       {" "}
//                       <b>Postgraduate Test Score Requirements</b>{" "}
//                     </h5>

//                     <div className="bg-h"></div>
//                   </div>
//                 </div>

//                 <input
//                   type="hidden"
//                   name="subjectId"
//                   id="subjectId"
//                   value={newSubId}
//                 />

//                 {postGradData?.id ? (
//                   <input
//                     type="hidden"
//                     name="id"
//                     id="id"
//                     value={postGradData?.id}
//                   />
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is IELTS Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isIeltsMandatory'
//                       //   id='isIeltsMandatory'
//                       onChange={handleIeltsReq2}
//                       checked={ieltsReq2}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {ieltsReq2 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>IELTS Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="number"
//                           name="ieltstScore"
//                           id="ieltstScore"
//                           min="0"
//                           step="any"
//                           placeholder="Enter IELTS Score"
//                           defaultValue={postGradData?.ieltstScore}
//                           required
//                           onChange={handleIeltsScore2}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : (
//                   <FormGroup row className="has-icon-left position-relative">
//                     <Col md="2">
//                       <span>IELTS Equivalent Score</span>
//                     </Col>
//                     <Col md="3">
//                       <Input
//                         type="number"
//                         name="ieltstScore"
//                         id="ieltstScore"
//                         min="0"
//                         step="any"
//                         placeholder="Enter IELTS Equivalent Score"
//                         defaultValue={postGradData?.ieltstScore}
//                         required
//                         onChange={handleIeltsScore2}
//                       />
//                     </Col>
//                   </FormGroup>
//                 )}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GRE Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGreRequired2}
//                       checked={greRequired2}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {greRequired2 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GRE Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="greScore"
//                           id="greScore"
//                           placeholder="Enter GRE Score"
//                           defaultValue={postGradData?.greScore}
//                           required
//                           onChange={handleGreScore2}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GMAT Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGmatRequired2}
//                       checked={gmatRequired2}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {gmatRequired2 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GMAT Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="gmatScore"
//                           id="gmatScore"
//                           placeholder="Enter GMAT Score"
//                           defaultValue={postGradData?.gmatScore}
//                           required
//                           onChange={handleGmatScore2}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <div className="row">
//                   <div className="col-md-5 d-flex justify-content-end">
//                     {permissions?.includes(
//                       permissionList.Add_New_Subject_Test_Requirement
//                     ) ||
//                     permissions?.includes(
//                       permissionList.Update_Subject_Test_Requirement_info
//                     ) ? (
//                       <ButtonForFunction
//                         type={"submit"}
//                         className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
//                         name={progress3 ? <ButtonLoader /> : "Save"}
//                         disable={
//                           !(
//                             (greRequired2 && greScore2 > "1") ||
//                             (gmatRequired2 && gmatScore2 > "1") ||
//                             ieltsScore2 > "1"
//                           )
//                         }
//                         permission={6}
//                       />
//                     ) : null}
//                   </div>
//                 </div>
//               </Form>
//               {/* post grad ends here */}

//               {/* research information starts here */}
//               <Form onSubmit={submitResearchScore} className="mt-5">
//                 <div className="hedding-titel d-flex justify-content-between mb-4">
//                   <div>
//                     <h5>
//                       {" "}
//                       <b>Research Test Score Requirements</b>{" "}
//                     </h5>

//                     <div className="bg-h"></div>
//                   </div>
//                 </div>

//                 <input
//                   type="hidden"
//                   name="subjectId"
//                   id="subjectId"
//                   value={newSubId}
//                 />

//                 {researchData?.id ? (
//                   <input
//                     type="hidden"
//                     name="id"
//                     id="id"
//                     value={researchData?.id}
//                   />
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is IELTS Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isIeltsMandatory'
//                       //   id='isIeltsMandatory'
//                       onChange={handleIeltsReq3}
//                       checked={ieltsReq3}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {ieltsReq3 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>IELTS Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="number"
//                           name="ieltstScore"
//                           id="ieltstScore"
//                           min="0"
//                           step="any"
//                           placeholder="Enter IELTS Score"
//                           defaultValue={researchData?.ieltstScore}
//                           required
//                           onChange={handleIeltsScore3}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : (
//                   <FormGroup row className="has-icon-left position-relative">
//                     <Col md="2">
//                       <span>IELTS Equivalent Score</span>
//                     </Col>
//                     <Col md="3">
//                       <Input
//                         type="number"
//                         name="ieltstScore"
//                         id="ieltstScore"
//                         min="0"
//                         step="any"
//                         placeholder="Enter IELTS Equivalent Score"
//                         defaultValue={researchData?.ieltstScore}
//                         required
//                         onChange={handleIeltsScore3}
//                       />
//                     </Col>
//                   </FormGroup>
//                 )}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GRE Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGreRequired3}
//                       checked={greRequired3}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {greRequired3 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GRE Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="greScore"
//                           id="greScore"
//                           placeholder="Enter GRE Score"
//                           defaultValue={researchData?.greScore}
//                           required
//                           onChange={handleGreScore3}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GMAT Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGmatRequired3}
//                       checked={gmatRequired3}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {gmatRequired3 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GMAT Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="gmatScore"
//                           id="gmatScore"
//                           placeholder="Enter GMAT Score"
//                           defaultValue={researchData?.gmatScore}
//                           required
//                           onChange={handleGmatScore3}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <div className="row">
//                   <div className="col-md-5 d-flex justify-content-end">
//                     {permissions?.includes(
//                       permissionList.Add_New_Subject_Test_Requirement
//                     ) ||
//                     permissions?.includes(
//                       permissionList.Update_Subject_Test_Requirement_info
//                     ) ? (
//                       <ButtonForFunction
//                         type={"submit"}
//                         className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
//                         name={progress4 ? <ButtonLoader /> : "Save"}
//                         disable={
//                           !(
//                             (greRequired3 && greScore3 > "1") ||
//                             (gmatRequired3 && gmatScore3 > "1") ||
//                             ieltsScore3 > "1"
//                           )
//                         }
//                         permission={6}
//                       />
//                     ) : null}
//                   </div>
//                 </div>
//               </Form>
//               {/* research information ends here */}

//               {/* others information starts here */}
//               <Form onSubmit={submitOtherScore} className="mt-5">
//                 <div className="hedding-titel d-flex justify-content-between mb-4">
//                   <div>
//                     <h5>
//                       {" "}
//                       <b>
//                         Default Test Score Requirements (Applicable for other
//                         education levels)
//                       </b>{" "}
//                     </h5>

//                     <div className="bg-h"></div>
//                   </div>
//                 </div>

//                 <input
//                   type="hidden"
//                   name="subjectId"
//                   id="subjectId"
//                   value={newSubId}
//                 />

//                 {otherData?.id ? (
//                   <input
//                     type="hidden"
//                     name="id"
//                     id="id"
//                     value={researchData?.id}
//                   />
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is IELTS Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isIeltsMandatory'
//                       //   id='isIeltsMandatory'
//                       onChange={handleIeltsReq4}
//                       checked={ieltsReq4}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {ieltsReq4 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>IELTS Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="number"
//                           name="ieltstScore"
//                           id="ieltstScore"
//                           min="0"
//                           step="any"
//                           placeholder="Enter IELTS Score"
//                           defaultValue={otherData?.ieltstScore}
//                           required
//                           onChange={handleIeltsScore4}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : (
//                   <FormGroup row className="has-icon-left position-relative">
//                     <Col md="2">
//                       <span>IELTS Equivalent Score</span>
//                     </Col>
//                     <Col md="3">
//                       <Input
//                         type="number"
//                         name="ieltstScore"
//                         id="ieltstScore"
//                         min="0"
//                         step="any"
//                         placeholder="Enter IELTS Equivalent Score"
//                         defaultValue={otherData?.ieltstScore}
//                         required
//                         onChange={handleIeltsScore4}
//                       />
//                     </Col>
//                   </FormGroup>
//                 )}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GRE Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGreRequired4}
//                       checked={greRequired4}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {greRequired4 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GRE Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="greScore"
//                           id="greScore"
//                           placeholder="Enter GRE Score"
//                           defaultValue={otherData?.greScore}
//                           required
//                           onChange={handleGreScore4}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <FormGroup row className="has-icon-left position-relative">
//                   <Col md="2">
//                     <span>Is GMAT Mandatory</span>
//                   </Col>
//                   <Col md="6">
//                     <Input
//                       className="ml-1"
//                       type="checkbox"
//                       //   name='isTestScoreRequired'
//                       //   id='isTestScoreRequired'
//                       onChange={handleGmatRequired4}
//                       checked={gmatRequired4}
//                     />
//                   </Col>
//                 </FormGroup>

//                 {gmatRequired4 ? (
//                   <>
//                     <FormGroup row className="has-icon-left position-relative">
//                       <Col md="2">
//                         <span>GMAT Score</span>
//                       </Col>
//                       <Col md="3">
//                         <Input
//                           type="text"
//                           name="gmatScore"
//                           id="gmatScore"
//                           placeholder="Enter GMAT Score"
//                           defaultValue={otherData?.gmatScore}
//                           required
//                           onChange={handleGmatScore4}
//                         />
//                       </Col>
//                     </FormGroup>
//                   </>
//                 ) : null}

//                 <div className="row">
//                   <div className="col-md-5 d-flex justify-content-end">
//                     {permissions?.includes(
//                       permissionList.Add_New_Subject_Test_Requirement
//                     ) ||
//                     permissions?.includes(
//                       permissionList.Update_Subject_Test_Requirement_info
//                     ) ? (
//                       <ButtonForFunction
//                         type={"submit"}
//                         className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
//                         name={progress5 ? <ButtonLoader /> : "Save"}
//                         disable={
//                           !(
//                             (greRequired4 && greScore4 > "1") ||
//                             (gmatRequired4 && gmatScore4 > "1") ||
//                             ieltsScore4 > "1"
//                           )
//                         }
//                         permission={6}
//                       />
//                     ) : null}
//                   </div>
//                 </div>
//               </Form>
//               {/* others information ends here */}

//               <div className="d-flex justify-content-between">
//                 <Button color="warning" onClick={goBack}>
//                   Previous Page
//                 </Button>

//                 <Button color="warning" onClick={goFront}>
//                   Next Page
//                 </Button>
//               </div>
//             </TabPane>
//           </TabContent>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default CopyUniversitySubjectTestScore;
