import React, { useState } from "react";
import PersonalStatementCard from "./ProfilePreview/PersonalStatementCard";
import PersonalInformationCard from "./ProfilePreview/PersonalInformationCard";
import ContactInformationCard from "./ProfilePreview/ContactInformationCard";
import OtherInformationCard from "./ProfilePreview/OtherInformationCard";
import EducationalInformationCard from "./ProfilePreview/EducationalInformationCard";
import TestScoresCard from "./ProfilePreview/TestScoresCard";
import ExperienceCard from "./ProfilePreview/ExperienceCard";
import ReferenceCard from "./ProfilePreview/ReferenceCard";
import UploadDocuments from "./ProfilePreview/UploadDocuments";
import ApplicationInformation from "./ProfilePreview/ApplicationInformation";
import FundingInformation from "./ProfilePreview/FundingInformation";
import ProfileStatus from "./Status/ProfileStatus";
import StudentDeclaration from "./ProfilePreview/StudentDeclaration";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
// import { Link } from "react-router-dom";
// import ReactToPrint from "react-to-print";

const ProfilePreview = ({ sId, applicationInfo, success, setSuccess }) => {
  // const componentRef = useRef();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [stName, setStName] = useState("");

  return (
    <>
      {/* <div ref={componentRef}> */}
      <div className="custom-card-border p-4 mb-3 ">
        {/* <div className="d-flex justify-content-between"> */}
        <h3> {stName} </h3>

        {/* <div className="d-flex justify-content-end d-print-none">
              <Link className="btn btn-blue mr-1" to={`/studentProfile/${sId}`}>
                <span> Go to profile</span>
              </Link>
              <ReactToPrint
                trigger={() => (
                  <button className="btn btn-border-blue">
                    <i class="fas fa-print"></i> Print
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div> */}
        {/* </div> */}
        <hr />
        <ApplicationInformation sId={sId} />
        <PersonalInformationCard sId={sId} setName={setStName} />
        <ContactInformationCard sId={sId} />
        <FundingInformation sId={sId} />
        <EducationalInformationCard sId={sId} />
        <TestScoresCard sId={sId} />
        <ExperienceCard sId={sId} />
        <ReferenceCard sId={sId} />
        <PersonalStatementCard sId={sId} />
        <OtherInformationCard sId={sId} />
        <UploadDocuments sId={sId} />
        <StudentDeclaration sId={sId} />
      </div>
      {/* </div> */}

      {applicationInfo.applicationStatusId !== 13 && (
        <>
          {permissions?.includes(
            permissionList.Update_Application_Assesment
          ) ? (
            <ProfileStatus
              id={applicationInfo?.id}
              success={success}
              setSuccess={setSuccess}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default ProfilePreview;
