import React, { useState } from "react";
import { Link } from "react-router-dom";
import editbtn from "../../../../../assets/img/editbtn.png";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ContactInformationCard from "./ProfilePreview/ContactInformationCard";
import EducationalInformationCard from "./ProfilePreview/EducationalInformationCard";
import EmergencyContactInformation from "./ProfilePreview/EmergencyContactInformation";
import ExperienceCard from "./ProfilePreview/ExperienceCard";
import FundingInformation from "./ProfilePreview/FundingInformation";
import OtherInformationCard from "./ProfilePreview/OtherInformationCard";
import PersonalInformationCard from "./ProfilePreview/PersonalInformationCard";
import PersonalStatementCard from "./ProfilePreview/PersonalStatementCard";
import ReferenceCard from "./ProfilePreview/ReferenceCard";
import StudentDeclaration from "./ProfilePreview/StudentDeclaration";
import TestScoresCard from "./ProfilePreview/TestScoresCard";
import UploadDocuments from "./ProfilePreview/UploadDocuments";
import ProfileStatus from "./Status/ProfileStatus";

const ProfilePreview = ({ sId, applicationInfo, success, setSuccess }) => {
  // const componentRef = useRef();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [stName, setStName] = useState("");

  const [applicationData, setApplicationData] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  console.log(studentDetails, "hahahaha");
  const [contactData, setContactData] = useState([]);
  const [emergencyContactList, setEmergencyContactList] = useState([]);
  const [fundingData, setFundingData] = useState({});
  const [educationInfos, setEducationInfos] = useState([]);
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
  const [refList, setRefList] = useState([]);
  const [studentStatementDetails, setStudentStatementDetails] = useState({});
  const [othersDetails, setOthersDetails] = useState({});
  const [uploadData, setUploadData] = useState([]);

  return (
    <>
      {/* <div ref={componentRef}> */}
      <div className="custom-card-border p-4 mb-3 ">
        <div className="d-flex">
          <div>
            {" "}
            <Link to={`/studentProfile/${sId}/${1}`}>
              <h3> {stName} </h3>
            </Link>
            <p>{studentDetails?.studentViewId}</p>
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
          >
            <div className="ml-2">
              {permissions?.includes(permissionList.Edit_Student) ? (
                <Link to={`/addStudentInformation/${sId}/${1}`}>
                  <img src={editbtn} alt="" className="img-fluid" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <hr />
        {/* <ApplicationInformation
          sId={sId}
          applicationData={applicationData}
          setApplicationData={setApplicationData}
        /> */}
        <PersonalInformationCard
          sId={sId}
          setName={setStName}
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
        />
        <ContactInformationCard
          sId={sId}
          contactData={contactData}
          setContactData={setContactData}
        />
        <EmergencyContactInformation
          sId={sId}
          emergencyContactList={emergencyContactList}
          setEmergencyContactList={setEmergencyContactList}
        />
        <FundingInformation
          sId={sId}
          fundingData={fundingData}
          setFundingData={setFundingData}
        />
        <EducationalInformationCard
          sId={sId}
          educationInfos={educationInfos}
          setEducationInfos={setEducationInfos}
        />
        <TestScoresCard
          sId={sId}
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
        />
        <ExperienceCard
          sId={sId}
          experienceInfo={experienceInfo}
          setExperienceInfo={setExperienceInfo}
        />
        <ReferenceCard sId={sId} refList={refList} setRefList={setRefList} />
        <PersonalStatementCard
          sId={sId}
          studentStatementDetails={studentStatementDetails}
          setStudentStatementDetails={setStudentStatementDetails}
        />
        <OtherInformationCard
          sId={sId}
          othersDetails={othersDetails}
          setOthersDetails={setOthersDetails}
        />
        <UploadDocuments
          sId={sId}
          uploadData={uploadData}
          setUploadData={setUploadData}
        />
        <StudentDeclaration
          sId={sId}
          emergencyContactList={emergencyContactList}
          setEmergencyContactList={setEmergencyContactList}
          applicationData={applicationData}
          setApplicationData={setApplicationData}
          setName={setStName}
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          contactData={contactData}
          setContactData={setContactData}
          fundingData={fundingData}
          setFundingData={setFundingData}
          educationInfos={educationInfos}
          setEducationInfos={setEducationInfos}
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
          refList={refList}
          setRefList={setRefList}
          studentStatementDetails={studentStatementDetails}
          setStudentStatementDetails={setStudentStatementDetails}
          othersDetails={othersDetails}
          setOthersDetails={setOthersDetails}
          uploadData={uploadData}
          setUploadData={setUploadData}
        />
      </div>
      {/* </div> */}

      {applicationInfo?.applicationSubStatusId !== 38 && (
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
