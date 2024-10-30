import React, { useRef, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import StudentParentConsultant from "./Component/StudentParentConsultant";
import StudentProfileHeadComponent from "./Component/StudentProfileHeadComponent";
import Application from "./Component/Application";
import Consent from "./Component/Consent";
import ProfilePreview from "./ProfilePreview";

const StudentProfileView = ({ sId }) => {
  const componentRef = useRef();
  const referenceId = JSON.parse(localStorage.getItem("referenceId"));

  const [studentDetails, setStudentDetails] = useState({});
  const [contactData, setContactData] = useState([]);
  const [emergencyContactList, setEmergencyContactList] = useState({});
  const [applicationData, setApplicationData] = useState({});
  const [fundingData, setFundingData] = useState({});
  const [educationalInfos, setEducationalInfos] = useState([]);

  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [pte, setPte] = useState({});
  const [greData, setGreData] = useState({});
  const [gmatData, setGmatData] = useState({});

  const [experienceInfo, setExperienceInfo] = useState([]);
  const [referenceList, setReferenceList] = useState([]);
  const [studentStatement, setStudentStatement] = useState({});
  const [scanId, setScanId] = useState("");
  const [result, setResult] = useState("");
  const [otherInformation, setOtherInformation] = useState({});
  const [UploadData, setUploadData] = useState({});

  return (
    <>
      <BreadCrumb title="Student Profile" backTo="" path="/" />
      <div ref={componentRef}>
        <div className="uapp-employee-profile">
          <Row>
            <Col md="8">
              <div className="uapp-employee-profile-left">
                <StudentProfileHeadComponent studentid={sId} />
                <Card className="p-4">
                  <Application id={sId} />
                </Card>
                {/* <ProfilePreview sId={sId} /> */}

                <ProfilePreview
                  sId={sId}
                  studentDetails={studentDetails}
                  setStudentDetails={setStudentDetails}
                  contactData={contactData}
                  setContactData={setContactData}
                  emergencyContactList={emergencyContactList}
                  setEmergencyContactList={setEmergencyContactList}
                  applicationData={applicationData}
                  setApplicationData={setApplicationData}
                  fundingData={fundingData}
                  setFundingData={setFundingData}
                  educationalInfos={educationalInfos}
                  setEducationalInfos={setEducationalInfos}
                  ielts={ielts}
                  setIelts={setIelts}
                  duolingo={duolingo}
                  setDuolingo={setDuolingo}
                  toefl={toefl}
                  setToefl={setToefl}
                  functions={functions}
                  setFunctions={setFunctions}
                  gcse={gcse}
                  setGcse={setGcse}
                  pearson={pearson}
                  setPearson={setPearson}
                  others={others}
                  setOthers={setOthers}
                  pte={pte}
                  setPte={setPte}
                  greData={greData}
                  setGreData={setGreData}
                  gmatData={gmatData}
                  setGmatData={setGmatData}
                  experienceInfo={experienceInfo}
                  setExperienceInfo={setExperienceInfo}
                  referenceList={referenceList}
                  setReferenceList={setReferenceList}
                  studentStatement={studentStatement}
                  setStudentStatement={setStudentStatement}
                  scanId={scanId}
                  setScanId={setScanId}
                  result={result}
                  setResult={setResult}
                  otherInformation={otherInformation}
                  setOtherInformation={setOtherInformation}
                  UploadData={UploadData}
                  setUploadData={setUploadData}
                />
              </div>
            </Col>

            <Col md="4">
              <StudentParentConsultant id={sId} />
              <Consent
                sId={sId ? sId : referenceId}
                studentDetails={studentDetails}
                contactData={contactData}
                emergencyContactList={emergencyContactList}
                applicationData={applicationData}
                fundingData={fundingData}
                educationalInfos={educationalInfos}
                ielts={ielts}
                duolingo={duolingo}
                toefl={toefl}
                functions={functions}
                gcse={gcse}
                pearson={pearson}
                others={others}
                pte={pte}
                greData={greData}
                gmatData={gmatData}
                experienceInfo={experienceInfo}
                referenceList={referenceList}
                studentStatement={studentStatement}
                scanId={scanId}
                result={result}
                otherInformation={otherInformation}
                UploadData={UploadData}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default StudentProfileView;
