// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Form,
//   FormGroup,
//   Input,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
//   Label,
// } from "reactstrap";
// import { Upload, Modal, Image } from "antd";
// import * as Icon from "react-feather";
// import put from "../../../../helpers/put";
// import { useHistory } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
// import post from "../../../../helpers/post";
// import { rootUrl } from "../../../../constants/constants";
// import ButtonLoader from "../../Components/ButtonLoader";

// const InternationalStudent = ({
//   applicationInformation,
//   applicationStudentId,
//   studentTypeValue,
//   destination,
//   countryLabel,
//   countryValue,
// }) => {
//   const [intOne, setIntOne] = useState("");
//   const [intTwo, setIntTwo] = useState("");
//   const [intThree, setIntThree] = useState("");
//   const [intFour, setIntFour] = useState("");
//   const [residencyStatus, setResidencyStatus] = useState("");
//   const history = useHistory();
//   const { addToast } = useToasts();

//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");
//   const [FileList, setFileList] = useState([]);

//   const [previewVisible2, setPreviewVisible2] = useState(false);
//   const [previewImage2, setPreviewImage2] = useState("");
//   const [previewTitle2, setPreviewTitle2] = useState("");
//   const [FileList2, setFileList2] = useState([]);
//   // const [buttonStatus, setButtonStatus] = useState(false);
//   const [progress, setProgress] = useState(false);

//   useEffect(() => {
//     setIntOne(`${applicationInformation?.isApplyingFromInside}`);
//     setIntTwo(`${applicationInformation?.isAppliedForUkVisa}`);
//     setIntThree(`${applicationInformation?.isRefusedForUKVisa}`);
//     setIntFour(`${applicationInformation?.isRefusedForOtherVisa}`);
//     setResidencyStatus(
//       applicationInformation?.currentResidencyStatusForInternational
//     );
//     setFileList([
//       `${rootUrl}` + applicationInformation?.refusalLetterForUKVisa?.fileUrl,
//     ]);
//     setFileList2([
//       `${rootUrl}` + applicationInformation?.refusalLetterForOtherVisa?.fileUrl,
//     ]);
//   }, []);

//   console.log(applicationInformation);

//   // Trial start

//   function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   }

//   const handleCancel = () => {
//     setPreviewVisible(false);
//   };

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     setPreviewImage(file.url || file.preview);
//     setPreviewVisible(true);
//     setPreviewTitle(
//       file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
//     );
//   };

//   const handleChange = ({ fileList }) => {
//     // if(fileList.length > 0 && fileList[0]?.type !== 'image/jpeg' && fileList[0]?.type !== 'image/jpg' && fileList[0]?.type !== 'image/png'){
//     //   setFileList([]);
//     //   setError('Only jpeg, jpg, png image is allowed');
//     // }
//     // else{
//     console.log(fileList);
//     setFileList(fileList);

//     // }
//   };

//   // Trial End

//   // Trial2 start

//   const handleCancel2 = () => {
//     setPreviewVisible2(false);
//   };

//   const handlePreview2 = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     setPreviewImage(file.url || file.preview);
//     setPreviewVisible(true);
//     setPreviewTitle(
//       file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
//     );
//   };

//   const handleChange2 = ({ fileList }) => {
//     // if(fileList.length > 0 && fileList[0]?.type !== 'image/jpeg' && fileList[0]?.type !== 'image/jpg' && fileList[0]?.type !== 'image/png'){
//     //   setFileList([]);
//     //   setError('Only jpeg, jpg, png image is allowed');
//     // }
//     // else{
//     setFileList2(fileList);

//     // }
//   };

//   // Trial2 End

//   const Int1Function = (event) => {
//     setIntOne(event.target.value);
//   };

//   const Int2Function = (event) => {
//     setIntTwo(event.target.value);
//   };

//   const Int3Function = (event) => {
//     setIntThree(event.target.value);
//   };

//   const Int4Function = (event) => {
//     setIntFour(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const subData = new FormData(event.target);
//     subData.append("RefusalLetterForUKVisaFile", FileList[0]?.originFileObj);
//     subData.append(
//       "RefusalLetterForOtherVisaFile",
//       FileList2[0]?.originFileObj
//     );
//     setButtonStatus(true);
//     setProgress(true);

//     post(`ApplicationInfo/Submit`, subData).then((res) => {
//       setButtonStatus(false);
//       setProgress(false);
//       if (res?.status == 200 && res?.data?.isSuccess == true) {
//         addToast(res?.data?.message, {
//           appearance: "success",
//           autoDismiss: true,
//         });
//         if (destination == "register") {
//           history.push(`/studentSourceofFund/${applicationStudentId}`);
//         } else {
//           history.push(`/sourceofFund/${applicationStudentId}/${1}`);
//         }
//       } else {
//         addToast(res?.data?.message, {
//           appearance: "error",
//           autoDismiss: true,
//         });
//       }
//     });
//   };

//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <input
//           type="hidden"
//           name="studentId"
//           id="studentId"
//           value={applicationStudentId}
//         />

//         <input
//           type="hidden"
//           name="id"
//           id="id"
//           value={
//             applicationInformation?.id == null ||
//             applicationInformation?.id == undefined
//               ? 0
//               : applicationInformation?.id
//           }
//         />

//         <input
//           type="hidden"
//           name="studentTypeId"
//           id="studentTypeId"
//           value={studentTypeValue}
//         />

//         <FormGroup className="has-icon-left position-relative">
//           <span>
//             Are You Applying From Inside {countryLabel}?{" "}
//             <span className="text-danger">*</span>{" "}
//           </span>
//           <br />

//           <FormGroup check inline className="form-mt">
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="IsApplyingFromInside"
//               onChange={Int1Function}
//               name="IsApplyingFromInside"
//               value="true"
//               checked={intOne == "true"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="IsApplyingFromInside"
//             >
//               Yes
//             </Label>
//           </FormGroup>

//           <FormGroup check inline>
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="isApplyingFromInside"
//               onChange={Int1Function}
//               name="isApplyingFromInside"
//               value="false"
//               checked={intOne == "false"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="isApplyingFromInside"
//             >
//               No
//             </Label>
//           </FormGroup>
//         </FormGroup>

//         {intOne === "true" ? (
//           <FormGroup className="has-icon-left position-relative">
//             <span>
//               <span className="text-danger">*</span> What is Your Current
//               Residency Status?
//             </span>

//             <Input
//               className="form-mt"
//               required
//               type="text"
//               name="CurrentResidencyStatusForInternational"
//               id="CurrentResidencyStatusForInternational"
//               placeholder="Enter Current Residency Status"
//               defaultValue={residencyStatus}
//             />
//           </FormGroup>
//         ) : intOne == "false" ? (
//           <>
//             <FormGroup className="has-icon-left position-relative">
//               <span>
//                 Have You Ever Applied for {countryLabel} Visa?{" "}
//                 <span className="text-danger">*</span>{" "}
//               </span>
//               <br />

//               <FormGroup check inline className="form-mt">
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="IsAppliedForUkVisa"
//                   onChange={Int2Function}
//                   name="IsAppliedForUkVisa"
//                   value="true"
//                   checked={intTwo == "true"}
//                 />
//                 <Label
//                   className="form-check-label"
//                   check
//                   htmlFor="IsAppliedForUkVisa"
//                 >
//                   Yes
//                 </Label>
//               </FormGroup>

//               <FormGroup check inline>
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="IsAppliedForUkVisa"
//                   onChange={Int2Function}
//                   name="IsAppliedForUkVisa"
//                   value="false"
//                   checked={intTwo == "false"}
//                 />
//                 <Label
//                   className="form-check-label"
//                   check
//                   htmlFor="IsAppliedForUkVisa"
//                 >
//                   No
//                 </Label>
//               </FormGroup>
//             </FormGroup>

//             {intTwo === "true" ? (
//               <>
//                 <FormGroup className="has-icon-left position-relative">
//                   <span>What Type of Visa You Have Applied for?</span>{" "}
//                   <span className="text-danger">*</span>
//                   <Input
//                     required
//                     placeholder="Enter Visa Type"
//                     type="text"
//                     name="VisaType"
//                     id="VisaType"
//                     defaultValue={applicationInformation?.visaType}
//                   />
//                 </FormGroup>

//                 <FormGroup className="has-icon-left position-relative">
//                   <span>
//                     Have You Ever Been Refused for {countryLabel} Visa?{" "}
//                     <span className="text-danger">*</span>{" "}
//                   </span>

//                   <FormGroup check inline>
//                     <Input
//                       className="form-check-input"
//                       type="radio"
//                       id="IsRefusedForUKVisa"
//                       onChange={Int3Function}
//                       name="IsRefusedForUKVisa"
//                       value="true"
//                       checked={intThree == "true"}
//                     />
//                     <Label
//                       className="form-check-label"
//                       check
//                       htmlFor="IsRefusedForUKVisa"
//                     >
//                       Yes
//                     </Label>
//                   </FormGroup>

//                   <FormGroup check inline>
//                     <Input
//                       className="form-check-input"
//                       type="radio"
//                       id="IsRefusedForUKVisa"
//                       onChange={Int3Function}
//                       name="IsRefusedForUKVisa"
//                       value="false"
//                       checked={intThree == "false"}
//                     />
//                     <Label
//                       className="form-check-label"
//                       check
//                       htmlFor="IsRefusedForUKVisa"
//                     >
//                       No
//                     </Label>
//                   </FormGroup>
//                 </FormGroup>

//                 {intThree === "true" ? (
//                   <FormGroup className="has-icon-left position-relative">
//                     <span>Attach the refusal letter</span>

//                     {/* {
//                 (applicationInformation?.refusalLetterForUKVisa?.fileUrl !== null) ?
//                 <Image
//                 src={`${rootUrl}`+applicationInformation?.refusalLetterForUKVisa?.fileUrl}
//                 width={100}
//                 height={100}
//                 />

//                 :
//                 null
//               } */}

//                     <>
//                       <Upload
//                         listType="picture-card"
//                         multiple={false}
//                         fileList={FileList}
//                         onPreview={handlePreview}
//                         onChange={handleChange}
//                         beforeUpload={(file) => {
//                           return false;
//                         }}
//                       >
//                         {FileList.length < 1 ? (
//                           <div className="text-danger" style={{ marginTop: 8 }}>
//                             <Icon.Upload />
//                             <br />
//                             <span>Upload File Here</span>
//                           </div>
//                         ) : (
//                           ""
//                         )}
//                       </Upload>
//                       <Modal
//                         visible={previewVisible}
//                         title={previewTitle}
//                         footer={null}
//                         onCancel={handleCancel}
//                       >
//                         <img
//                           alt="example"
//                           style={{ width: "100%" }}
//                           src={previewImage}
//                         />
//                       </Modal>
//                     </>
//                   </FormGroup>
//                 ) : null}
//               </>
//             ) : null}

//             <FormGroup className="has-icon-left position-relative">
//               <span className="aaa">
//                 Have You Ever Been Refused Visa to Any Other Country?{" "}
//                 <span className="text-danger">*</span>{" "}
//               </span>

//               <FormGroup check inline className="form-mt">
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="IsRefusedForOtherVisa"
//                   onChange={Int4Function}
//                   name="IsRefusedForOtherVisa"
//                   value="true"
//                   checked={intFour == "true"}
//                 />
//                 <Label
//                   className="form-check-label"
//                   check
//                   htmlFor="IsRefusedForOtherVisa"
//                 >
//                   Yes
//                 </Label>
//               </FormGroup>

//               <FormGroup check inline>
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="IsRefusedForOtherVisa"
//                   onChange={Int4Function}
//                   name="IsRefusedForOtherVisa"
//                   value="false"
//                   checked={intFour == "false"}
//                 />
//                 <Label
//                   className="form-check-label"
//                   check
//                   htmlFor="IsRefusedForOtherVisa"
//                 >
//                   No
//                 </Label>
//               </FormGroup>
//             </FormGroup>

//             {intFour === "true" ? (
//               <FormGroup className="has-icon-left position-relative">
//                 <span>Attach the refusal letter</span>

//                 {/* {
//                 (applicationInformation?.refusalLetterForUKVisa?.fileUrl !== null) ?
//                 <Image
//                 src={`${rootUrl}`+applicationInformation?.refusalLetterForOtherVisa?.fileUrl}
//                 width={100}
//                 height={100}
//                 />

//                 :
//                 null
//               } */}

//                 <>
//                   <Upload
//                     listType="picture-card"
//                     multiple={false}
//                     fileList={FileList2}
//                     onPreview={handlePreview2}
//                     onChange={handleChange2}
//                     beforeUpload={(file) => {
//                       return false;
//                     }}
//                   >
//                     {FileList2.length < 1 ? (
//                       <div className="text-danger" style={{ marginTop: 8 }}>
//                         <Icon.Upload />
//                         <br />
//                         <span>Upload File Here</span>
//                       </div>
//                     ) : (
//                       ""
//                     )}
//                   </Upload>
//                   <Modal
//                     visible={previewVisible2}
//                     title={previewTitle2}
//                     footer={null}
//                     onCancel={handleCancel2}
//                   >
//                     <img
//                       alt="example"
//                       style={{ width: "100%" }}
//                       src={previewImage2}
//                     />
//                   </Modal>
//                 </>
//               </FormGroup>
//             ) : null}
//           </>
//         ) : null}

//         <div className="row">
//           <div className="col-md-10 d-flex justify-content-end">
//             <Button color="primary" type="submit" disabled={buttonStatus}>
//               {progress ? <ButtonLoader /> : "Save & Next"}
//             </Button>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default InternationalStudent;
