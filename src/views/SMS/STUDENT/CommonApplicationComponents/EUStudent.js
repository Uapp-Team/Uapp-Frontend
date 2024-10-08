// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
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
// import post from "../../../../helpers/post";
// import put from "../../../../helpers/put";
// import ButtonLoader from "../../Components/ButtonLoader";

// const EUStudent = ({
//   applicationInformation,
//   applicationStudentId,
//   studentTypeValue,
//   destination,
//   countryLabel,
//   countryValue,
// }) => {
//   console.log(applicationInformation);

//   console.log(applicationInformation);

//   const [euOne, setEuOne] = useState("");
//   const [euTwo, setEuTwo] = useState("");
//   const [euThree, setEuThree] = useState("");
//   const [euFour, setEuFour] = useState("");
//   const history = useHistory();
//   const { addToast } = useToasts();
//   const [buttonStatus, setButtonStatus] = useState(false);
//   const [progress, setProgress] = useState(false);
//   const [residencyStatus, setResidencyStatus] = useState("");

//   useEffect(() => {
//     setEuOne(`${applicationInformation?.loanfromStudentLoansCompanyForEU}`);
//     setEuTwo(`${applicationInformation?.isHavePre_Settlementstatus}`);
//     setEuThree(`${applicationInformation?.isStayedInsideInUkinLast3Years}`);
//     setEuFour(
//       `${applicationInformation?.havingUndergraduatePostgraduateCourseForEU}`
//     );
//   }, []);

//   const handleDate = (e) => {
//     var datee = e;
//     var utcDate = new Date(datee);
//     var localeDate = utcDate.toLocaleString("en-CA");
//     const x = localeDate.split(",")[0];
//     return x;
//   };

//   const eu1Function = (event) => {
//     setEuOne(event.target.value);
//   };

//   const eu2Function = (event) => {
//     setEuTwo(event.target.value);
//   };

//   const eu3Function = (event) => {
//     setEuThree(event.target.value);
//   };

//   const eu4Function = (event) => {
//     setEuFour(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     console.log("event -57", event.target);
//     event.preventDefault();
//     const subData = new FormData(event.target);
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

//         history.push(`/sourceofFund/${applicationStudentId}/${1}`);
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
//             <span className="text-danger">*</span> When Did You Move to The{" "}
//             {countryLabel}?
//           </span>

//           <Input
//             className="form-mt"
//             required
//             type="date"
//             name="DateOfMoveToUk"
//             id="DateOfMoveToUk"
//             defaultValue={handleDate(applicationInformation?.dateOfMoveToUk)}
//           />
//         </FormGroup>

//         <FormGroup className="has-icon-left position-relative">
//           <span>
//             <span className="text-danger">*</span> Have You Ever Had Any Other
//             Loans From The Student Loans Company (SLC)?
//           </span>
//           <br />

//           <FormGroup check inline className="form-mt">
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="loanfromStudentLoansCompanyForEU"
//               onChange={eu1Function}
//               name="loanfromStudentLoansCompanyForEU"
//               value="true"
//               checked={euOne == "true"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="loanfromStudentLoansCompanyForEU"
//             >
//               Yes
//             </Label>
//           </FormGroup>

//           <FormGroup check inline>
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="loanfromStudentLoansCompanyForEU"
//               onChange={eu1Function}
//               name="loanfromStudentLoansCompanyForEU"
//               value="false"
//               checked={euOne == "false"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="loanfromStudentLoansCompanyForEU"
//             >
//               No
//             </Label>
//           </FormGroup>
//         </FormGroup>

//         {euOne === "true" ? (
//           <FormGroup className="has-icon-left position-relative">
//             <span>
//               <span className="text-danger">*</span> How Many Years?
//             </span>

//             <Input
//               className="form-mt"
//               required
//               type="text"
//               name="loanYearsForEU"
//               id="loanYearsForEU"
//               placeholder="Enter Years"
//               defaultValue={applicationInformation?.loanYearsForEU}
//             />
//           </FormGroup>
//         ) : null}

//         <FormGroup className="has-icon-left position-relative">
//           <span>
//             <span className="text-danger">*</span> Do You Have Settled or
//             Pre-settled Status Under The EU Settlement Scheme?
//           </span>
//           <br />

//           <FormGroup check inline className="form-mt">
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="isHavePre_Settlementstatus"
//               onChange={eu2Function}
//               name="isHavePre_Settlementstatus"
//               value="true"
//               checked={euTwo == "true"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="IsHavePre_Settlementstatus"
//             >
//               Yes
//             </Label>
//           </FormGroup>

//           <FormGroup check inline>
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="isHavePre_Settlementstatus"
//               onChange={eu2Function}
//               name="isHavePre_Settlementstatus"
//               value="false"
//               checked={euTwo == "false"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="IsHavePre_Settlementstatus"
//             >
//               No
//             </Label>
//           </FormGroup>
//         </FormGroup>

//         {euTwo === "true" ? (
//           <>
//             <FormGroup className="has-icon-left position-relative">
//               <span>
//                 <span className="text-danger">*</span> Please Provide The Valid
//                 Share Code
//               </span>

//               <Input
//                 className="form-mt"
//                 required
//                 type="text"
//                 name="shareCode"
//                 id="shareCode"
//                 placeholder="Enter Share Code"
//                 defaultValue={applicationInformation?.shareCode}
//               />
//             </FormGroup>

//             <FormGroup className="has-icon-left position-relative">
//               <span>
//                 <span className="text-danger mr-1">*</span>Have You Been
//                 Resident in The UK And Islands For The Last Three Years?
//               </span>
//               <br />

//               <FormGroup check inline className="form-mt">
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="isStayedInsideInUkinLast3Years"
//                   onChange={eu3Function}
//                   name="isStayedInsideInUkinLast3Years"
//                   value="true"
//                   checked={euThree == "true"}
//                 />
//                 <Label
//                   className="form-check-label"
//                   check
//                   htmlFor="IsStayedInsideInUkinLast3Years"
//                 >
//                   Yes
//                 </Label>
//               </FormGroup>

//               <FormGroup check inline>
//                 <Input
//                   className="form-check-input"
//                   type="radio"
//                   id="isStayedInsideInUkinLast3Years"
//                   onChange={eu3Function}
//                   name="isStayedInsideInUkinLast3Years"
//                   value="false"
//                   checked={euThree == "false"}
//                 />
//                 <Label
//                   className="form-check-label"
//                   check
//                   htmlFor="IsStayedInsideInUkinLast3Years"
//                 >
//                   No
//                 </Label>
//               </FormGroup>
//             </FormGroup>
//           </>
//         ) : euTwo === "false" ? (
//           <FormGroup className="has-icon-left position-relative">
//             <span>
//               <span className="text-danger">*</span> What is Your Current
//               Residency Status in The UK?
//             </span>

//             <Input
//               className="form-mt"
//               required
//               type="text"
//               name="CurrentResidencyStatusForEU"
//               id="CurrentResidencyStatusForEU"
//               placeholder="Enter Residency Status"
//               defaultValue={applicationInformation?.currentResidencyStatusForEU}
//             />
//           </FormGroup>
//         ) : null}

//         <FormGroup className="has-icon-left position-relative">
//           <span>
//             <span className="text-danger">*</span> Have You Started An
//             Undergraduate or Postgraduate Course of Higher Education in Any
//             Country Since Leaving School?
//           </span>
//           <br />
//           <FormGroup check inline className="form-mt">
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="HavingUndergraduatePostgraduateCourseForEU"
//               onChange={eu4Function}
//               name="HavingUndergraduatePostgraduateCourseForEU"
//               value="true"
//               checked={euFour == "true"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="HavingUndergraduatePostgraduateCourseForEU"
//             >
//               Yes
//             </Label>
//           </FormGroup>

//           <FormGroup check inline>
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="HavingUndergraduatePostgraduateCourseForEU"
//               onChange={eu4Function}
//               name="HavingUndergraduatePostgraduateCourseForEU"
//               value="false"
//               checked={euFour === "false"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="HavingUndergraduatePostgraduateCourseForEU"
//             >
//               No
//             </Label>
//           </FormGroup>
//         </FormGroup>
//       </Form>
//     </div>
//   );
// };

// export default EUStudent;
