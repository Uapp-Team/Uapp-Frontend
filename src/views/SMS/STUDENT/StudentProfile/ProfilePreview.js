import React, { useRef } from "react";
import { Card } from "reactstrap";
import PersonalStatementCard from "./Component/PersonalStatementCard";
import PersonalInformationCard from "./Component/PersonalInformationCard";
import ContactInformationCard from "./Component/ContactInformationCard";
import OtherInformationCard from "./Component/OtherInformationCard";
import EducationalInformationCard from "./Component/EducationalInformationCard";
import TestScoresCard from "./Component/TestScoresCard";
import ExperienceCard from "./Component/ExperienceCard";
import ReferenceCard from "./Component/ReferenceCard";
import UploadDocuments from "./Component/UploadDocuments";
import ApplicationInformation from "./Component/ApplicationInformation";
import FundingInformation from "./Component/FundingInformation";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import EmergencyContactCard from "./Component/EmergencyContactCard";

const ProfilePreview = ({ sId }) => {
  const location = useLocation();
  const componentRef = useRef();
  const currentLocation = location.pathname;
  return (
    <>
      <Card className="p-4">
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex justify-content-start">
            <h3>Profile Preview</h3>
            <ReactToPrint
              trigger={() => (
                <button className="btn btn-border-blue mx-2">
                  <i class="fas fa-print"></i> Print
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
          {currentLocation === `/studentDeclaration/${sId}` && (
            <a className="btn btn-blue" href="#application">
              <span> Add Application</span>
            </a>
          )}
        </div>
        <div ref={componentRef}>
          <h3 className="d-none d-print-block">Student Overview</h3>
          <PersonalInformationCard sId={sId} />
          <ContactInformationCard sId={sId} />
          <EmergencyContactCard sId={sId} />
          <ApplicationInformation sId={sId} />
          <FundingInformation sId={sId} />
          <EducationalInformationCard sId={sId} />
          <TestScoresCard sId={sId} />
          <ExperienceCard sId={sId} />
          <ReferenceCard sId={sId} />
          <PersonalStatementCard sId={sId} />
          <OtherInformationCard sId={sId} />
          <UploadDocuments sId={sId} />
        </div>
      </Card>
    </>
  );
};

export default ProfilePreview;
