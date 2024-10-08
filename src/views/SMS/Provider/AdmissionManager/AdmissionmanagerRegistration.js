// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Col,
//   FormGroup,
//   Input,
// } from "reactstrap";
// import get from "../../../../helpers/get";
// import post from "../../../../helpers/post";
// import Select from "react-select";
// import { useHistory, useParams } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
// import { permissionList } from "../../../../constants/AuthorizationConstant";
// import { Image, Modal, Upload } from "antd";
// import * as Icon from "react-feather";
// import ButtonLoader from "../../Components/ButtonLoader";

// const AdmissionmanagerRegistration = () => {
//   const [pass, setPass] = useState("");
//   const [passError, setPassError] = useState("");
//   const [title, setTitle] = useState([]);
//   const [titleLabel, setTitleLabel] = useState("Title");
//   const [titleValue, setTitleValue] = useState(0);
//   const [titleError, setTitleError] = useState(false);
//   const [emailError, setEmailError] = useState(true);

//   const [providerDD, setProviderDD] = useState([]);
//   const [providerLabel, setProviderLabel] = useState("Provider");
//   const [providerValue, setProviderValue] = useState(0);
//   const [providerError, setProviderError] = useState(false);

//   const permissions = JSON.parse(localStorage.getItem("permissions"));

//   const { addToast } = useToasts();
//   const { providerId } = useParams();
//   const history = useHistory();

//   const [buttonStatus, setButtonStatus] = useState(false);
//   const [progress, setProgress] = useState(false);

//   useEffect(() => {
//     get("ProviderDD/Index").then((res) => {
//       setProviderDD(res);
//     });

//     get("NameTittle/GetAll").then((res) => {
//       setTitle(res);
//     });
//   }, []);

//   const providerMenu = providerDD.map((provider) => ({
//     label: provider?.name,
//     value: provider?.id,
//   }));

//   const selectProvider = (label, value) => {
//     setProviderError(false);
//     setProviderLabel(label);
//     setProviderValue(value);
//   };

//   const nameTitle = title?.map((singleTitle) => ({
//     label: singleTitle.name,
//     value: singleTitle.id,
//   }));

//   // select  Title
//   const selectTitle = (label, value) => {
//     setTitleError(false);
//     setTitleLabel(label);
//     setTitleValue(value);
//   };

//   const backToAdmissionManagerList = () => {
//     if (providerId !== undefined) {
//       history.push(`/providerDetails/${providerId}`);
//     } else {
//       history.push(`/admissionManagerList`);
//     }
//   };

//   const handlePass = (e) => {
//     setPassError("");
//     setPass(e.target.value);
//   };

//   const goBack = () => {
//     if (providerId !== undefined) {
//       history.push(`/providerDetails/${providerId}`);
//     } else {
//       history.push(`/admissionManagerList`);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const subData = new FormData(e.target);
//     subData.append(
//       "admissionManagerFile",
//       FileList?.length < 1 ? null : FileList[0]?.originFileObj
//     );

//     if (providerId === undefined) {
//       if (providerValue === 0) {
//         setProviderError(true);
//       } else if (titleValue === 0) {
//         setTitleError(true);
//       } else if (pass.length < 6) {
//         setPassError("Password length can not be less than six digits");
//       } else if (emailError == false) {
//         setEmailError(emailError);
//       } else {
//         setProgress(true);
//         setButtonStatus(true);
//         post(`AdmissionManager/Register`, subData).then((res) => {
//           setButtonStatus(false);
//           setProgress(false);
//           if (res?.status == 200 && res?.data?.isSuccess == true) {
//             addToast(res?.data?.message, {
//               appearance: "success",
//               autoDismiss: true,
//             });
//             history.push(`/addAdmissionManagerForm/${res?.data?.result?.id}`);
//           } else if (res?.status == 200 && res?.data?.isSuccess == false) {
//             addToast(res?.data?.message, {
//               appearance: "error",
//               autoDismiss: true,
//             });
//           }
//         });
//       }
//     } else {
//       if (titleValue === 0) {
//         setTitleError(true);
//       } else if (pass.length < 6) {
//         setPassError("Password length can not be less than six digits");
//       } else if (emailError == false) {
//         setEmailError(emailError);
//       } else {
//         setProgress(true);
//         setButtonStatus(true);
//         post(`AdmissionManager/Register`, subData).then((res) => {
//           setButtonStatus(false);
//           setProgress(false);
//           if (res?.status == 200 && res?.data?.isSuccess == true) {
//             addToast(res?.data?.message, {
//               appearance: "success",
//               autoDismiss: true,
//             });
//             history.push(
//               `/addAdmissionManagerForm/${res?.data?.result?.id}/${providerId}`
//             );
//           } else if (res?.status == 200 && res?.data?.isSuccess == false) {
//             addToast(res?.data?.message, {
//               appearance: "error",
//               autoDismiss: true,
//             });
//           }
//         });
//       }
//     }
//   };

//   const handleEmail = (e) => {
//     get(`Consultant/OnChangeEmail/${e.target.value}`).then((res) => {
//       setEmailError(res);
//     });
//   };

//   return (
//     <div>
//       <Card className="uapp-card-bg">
//         <CardHeader className="page-header">
//           <h3 className="text-white">Admission Manager Registration</h3>
//           <div className="page-header-back-to-home">
//             <span className="text-white" onClick={backToAdmissionManagerList}>
//               {" "}
//               <i className="fas fa-arrow-circle-left"></i>{" "}
//               {providerId !== undefined
//                 ? "Back to Provider Details"
//                 : "Back to Admission Manager List"}
//             </span>
//           </div>
//         </CardHeader>
//       </Card>

//       <Card>
//         <CardBody>
//           <form onSubmit={handleSubmit}>
//             {providerId !== undefined ? (
//               <Input
//                 type="hidden"
//                 name="providerId"
//                 id="providerId"
//                 value={providerId}
//               />
//             ) : (
//               <FormGroup row className="has-icon-left position-relative">
//                 <Col md="2">
//                   <span className="pl-2">
//                     Provider <span className="text-danger">*</span>{" "}
//                   </span>
//                 </Col>
//                 <Col md="4">
//                   <Select
//                     options={providerMenu}
//                     value={{
//                       label: providerLabel,
//                       value: providerValue,
//                     }}
//                     onChange={(opt) => selectProvider(opt.label, opt.value)}
//                     name="providerId"
//                     id="providerId"
//                   />

//                   {providerError ? (
//                     <span className="text-danger">Provider is required</span>
//                   ) : null}
//                 </Col>
//               </FormGroup>
//             )}

//             {providerId !== undefined ? (
//               <Input type="hidden" name="id" id="id" value={providerId} />
//             ) : null}

//             <FormGroup row className="has-icon-left position-relative">
//               <Col md="2">
//                 <span className="pl-2">
//                   Title <span className="text-danger">*</span>
//                 </span>
//               </Col>
//               <Col md="4">
//                 <Select
//                   options={nameTitle}
//                   value={{ label: titleLabel, value: titleValue }}
//                   onChange={(opt) => selectTitle(opt.label, opt.value)}
//                   name="nameTittleId"
//                   id="nameTittleId"
//                   required
//                 />

//                 {titleError && (
//                   <span className="text-danger">Title is required</span>
//                 )}
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Col md="2">
//                 <span className="pl-2">
//                   First Name <span className="text-danger">*</span>
//                 </span>
//               </Col>

//               <Col md="10" lg="4">
//                 <Input
//                   type="text"
//                   name="firstName"
//                   id="firstName"
//                   placeholder="Enter First Name"
//                   required
//                 />
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Col md="2">
//                 <span className="pl-2">
//                   Last Name <span className="text-danger">*</span>
//                 </span>
//               </Col>

//               <Col md="10" lg="4">
//                 <Input
//                   type="text"
//                   name="lastName"
//                   id="lastName"
//                   placeholder="Enter Last Name"
//                   required
//                 />
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Col md="2">
//                 <span className="pl-2">
//                   Email <span className="text-danger">*</span>
//                 </span>
//               </Col>

//               <Col md="10" lg="4">
//                 <Input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Enter Email"
//                   onBlur={handleEmail}
//                   required
//                 />

//                 {!emailError ? (
//                   <span className="text-danger">Email already exists</span>
//                 ) : null}
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Col md="2">
//                 <span className="pl-2">
//                   Password <span className="text-danger">*</span>
//                 </span>
//               </Col>

//               <Col md="10" lg="4">
//                 <Input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="Enter Password"
//                   onChange={handlePass}
//                   required
//                 />
//                 <span className="text-danger">{passError}</span>
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Col md="2">
//                 <span className="pl-2">
//                   Phone Number <span className="text-danger">*</span>
//                 </span>
//               </Col>

//               <Col md="10" lg="4">
//                 <Input
//                   type="text"
//                   name="phoneNumber"
//                   id="phonenumber"
//                   placeholder="Enter Phone Number"
//                   required
//                 />
//               </Col>
//             </FormGroup>

//             <FormGroup row>
//               <Col md="6">
//                 <div className="d-flex justify-content-end">
//                   <Button color="danger" className="mr-1 mt-3" onClick={goBack}>
//                     Cancel
//                   </Button>
//                   {permissions?.includes(
//                     permissionList?.Add_New_Admission_manager
//                   ) ? (
//                     <Button
//                       type="submit"
//                       className="ml-1 mt-3 badge-primary"
//                       // onClick={(e)=>handleSubmit(e)}
//                       disabled={buttonStatus}
//                     >
//                       {progress ? <ButtonLoader /> : "Submit"}
//                     </Button>
//                   ) : null}
//                 </div>
//               </Col>
//             </FormGroup>
//           </form>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default AdmissionmanagerRegistration;
