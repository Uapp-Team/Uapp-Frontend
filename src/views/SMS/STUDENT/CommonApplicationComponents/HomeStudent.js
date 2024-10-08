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

// const HomeStudent = ({
//   applicationInformation,
//   applicationStudentId,
//   studentTypeValue,
//   destination,
//   countryLabel,
//   countryValue,
//   handleSubmit,
// }) => {
//   console.log(destination);
//   const [homeOne, setHomeOne] = useState("");
//   const [homeTwo, setHomeTwo] = useState("");
//   const history = useHistory();
//   const { addToast } = useToasts();
//   const [buttonStatus, setButtonStatus] = useState(false);
//   const [progress, setProgress] = useState(false);

//   useEffect(() => {
//     setHomeOne(`${applicationInformation?.loanfromStudentLoansCompanyForHome}`);
//     setHomeTwo(
//       `${applicationInformation?.havingUndergraduatePostgraduateCourseForHome}`
//     );
//   }, []);

//   const home1Function = (event) => {
//     setHomeOne(event.target.value);
//   };

//   const home2Function = (event) => {
//     setHomeTwo(event.target.value);
//   };
//   const handleCancelAdd = () => {
//     history.push("/studentList");
//   };
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();

//   //   const subData = new FormData(event.target);
//   //   setProgress(true);
//   //   setButtonStatus(true);

//   //   post(`ApplicationInfo/Submit`, subData).then((res) => {
//   //     setProgress(false);
//   //     setButtonStatus(false);
//   //     if (res?.status == 200 && res?.data?.isSuccess == true) {
//   //       addToast(res?.data?.message, {
//   //         appearance: "success",
//   //         autoDismiss: true,
//   //       });
//   //       if (destination == "register") {
//   //         history.push(`/studentSourceofFund/${applicationStudentId}`);
//   //       } else {
//   //         history.push(`/sourceofFund/${applicationStudentId}/${1}`);
//   //       }
//   //     } else {
//   //       addToast(res?.data?.message, {
//   //         appearance: "error",
//   //         autoDismiss: true,
//   //       });
//   //     }
//   //   });
//   // };

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
//             <span className="text-danger">*</span> Have You Ever Had Any Other
//             Loans From The Student Loans Company (SLC)?
//           </span>
//           <br />
//           <FormGroup check inline className="form-mt">
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="loanfromStudentLoansCompanyForHome"
//               onChange={home1Function}
//               name="loanfromStudentLoansCompanyForHome"
//               value="true"
//               checked={homeOne == "true"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="loanfromStudentLoansCompanyForHome"
//             >
//               Yes
//             </Label>
//           </FormGroup>

//           <FormGroup check inline>
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="loanfromStudentLoansCompanyForHome"
//               onChange={home1Function}
//               name="loanfromStudentLoansCompanyForHome"
//               value="false"
//               checked={homeOne == "false"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="loanfromStudentLoansCompanyForHome"
//             >
//               No
//             </Label>
//           </FormGroup>
//         </FormGroup>

//         {homeOne === "true" ? (
//           <FormGroup className="has-icon-left position-relative">
//             <span>
//               <span className="text-danger">*</span> How Many Years?
//             </span>
//             <Input
//               className="form-mt"
//               type="text"
//               name="LoanYearsForHome"
//               id="LoanYearsForHome"
//               required
//               placeholder="Enter Years"
//               defaultValue={applicationInformation?.loanYearsForHome}
//             />
//           </FormGroup>
//         ) : null}

//         <FormGroup className="has-icon-left position-relative">
//           <span>
//             <span className="text-danger">*</span> Have You Started an
//             Undergraduate or Postgraduate Course of Higher Education in Any
//             Country Since Leaving School?
//           </span>
//           <br />

//           <FormGroup check inline className="form-mt">
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="HavingUndergraduatePostgraduateCourseForHome"
//               onChange={home2Function}
//               name="HavingUndergraduatePostgraduateCourseForHome"
//               value="true"
//               checked={homeTwo == "true"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="HavingUndergraduatePostgraduateCourseForHome"
//             >
//               Yes
//             </Label>
//           </FormGroup>

//           <FormGroup check inline>
//             <Input
//               className="form-check-input"
//               type="radio"
//               id="HavingUndergraduatePostgraduateCourseForHome"
//               onChange={home2Function}
//               name="HavingUndergraduatePostgraduateCourseForHome"
//               value="false"
//               checked={homeTwo == "false"}
//             />
//             <Label
//               className="form-check-label"
//               check
//               htmlFor="HavingUndergraduatePostgraduateCourseForHome"
//             >
//               No
//             </Label>
//           </FormGroup>
//         </FormGroup>

//         <FormGroup row className="has-icon-left position-relative">
//           <Col>
//             <button className="cancel-button" onClick={handleCancelAdd}>
//               Cancel
//             </button>

//             <button className="save-button" type="submit">
//               Save
//             </button>
//             {progress ? (
//               <span>
//                 <ButtonLoader />
//               </span>
//             ) : (
//               <></>
//             )}
//           </Col>
//         </FormGroup>
//       </Form>
//     </div>
//   );
// };

// export default HomeStudent;
