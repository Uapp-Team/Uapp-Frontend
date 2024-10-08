// import React, { useEffect, useState } from "react";
// import { Card, CardBody } from "reactstrap";
// import get from "../../../../../helpers/get";

// const ProfileRecruitingType = ({ id }) => {
//   const [typeData, setTypeData] = useState({});
//   const userId = localStorage.getItem("referenceId");

//   useEffect(() => {
//     if (id !== undefined) {
//       get(`ConsultantProfile/GetRecruitmentType/${id}`).then((res) => {
//         console.log(res);
//         setTypeData(res);
//       });
//     } else {
//       get(`ConsultantProfile/GetRecruitmentType/${userId}`).then((res) => {
//         console.log(res);
//         setTypeData(res);
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <Card>
//         <CardBody>
//           <div className="mb-3">
//             <span
//               style={{ fontSize: "16px", fontWeight: "600", color: "#707070" }}
//             >
//               Recruiting Type{" "}
//             </span>
//           </div>

//           <div className="d-flex flex-wrap">
//             {typeData?.eU_UK ? (
//               <div
//                 className="mr-2"
//                 style={{
//                   backgroundColor: "#EEF3F4",
//                   padding: "8px 16px",
//                   border: "1px solid rgba(37, 37, 37, 0.12)",
//                   borderRadius: "211px",
//                 }}
//               >
//                 UK
//               </div>
//             ) : null}
//             {typeData?.home ? (
//               <div
//                 className="mr-2"
//                 style={{
//                   backgroundColor: "#EEF3F4",
//                   padding: "8px 16px",
//                   border: "1px solid rgba(37, 37, 37, 0.12)",
//                   borderRadius: "211px",
//                 }}
//               >
//                 Home
//               </div>
//             ) : null}
//             {typeData?.international ? (
//               <div
//                 className="mr-2"
//                 style={{
//                   backgroundColor: "#EEF3F4",
//                   padding: "8px 16px",
//                   border: "1px solid rgba(37, 37, 37, 0.12)",
//                   borderRadius: "211px",
//                 }}
//               >
//                 International
//               </div>
//             ) : null}
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default ProfileRecruitingType;
