import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { userTypes } from "../../../../../../../constants/userTypeConstant";
import AdmissionOfficers from "./Componet/AdmissionOfficers";
import Applications from "./Componet/Applications";
import AssignedSubjectCard from "./Componet/AssignedSubjectCard";
import AssignedUniversityCard from "./Componet/AssignedUniversityCard";
import ProfileHead from "./Componet/ProfileHead";
import ProviderCard from "../../ProfileComponent/ProviderCard";
import BreadCrumb from "../../../../../../../components/breadCrumb/BreadCrumb";
import DashboardApplication from "../../../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../../../components/ui/DashboardReadyToApply";
import AdmissionOfficer from "../../../../../Dashboard/Pages/AdmissionManager/AdmissionOfficer";
import DashboardProgressReport from "../../../../../../../components/ui/DashboardProgressReport";
import get from "../../../../../../../helpers/get";

const AdmissionManagerForAdministrator = () => {
  const [headData, setHeadData] = useState({});
  const { admissionManagerId } = useParams();
  const [addMissionOfficers, setAddMissionOfficers] = useState([]);

  useEffect(() => {
    get(`AddmissionManagerProfile/ManagerOfficer/${admissionManagerId}`).then(
      (res) => {
        setAddMissionOfficers(res);
        console.log(res, "arif");
      }
    );
  }, [admissionManagerId]);

  return (
    <div>
      <BreadCrumb
        title="Admission Manager Profile"
        backTo="Admission Manager"
        path="/admissionManagerList"
      />

      <div className="row">
        <div className="col-md-8 uapp-employee-profile-left">
          <ProfileHead
            admissionManagerId={admissionManagerId}
            setHeadData={setHeadData}
            headData={headData}
          />
          {/* <AssignedUniversityCard
            admissionManagerId={admissionManagerId}
            setHeadData={setHeadData}
            headData={headData}
          />
          <AssignedSubjectCard admissionManagerId={admissionManagerId} />
          <Applications admissionManagerId={admissionManagerId} />
          <AdmissionOfficers
            admissionManagerId={admissionManagerId}
            setHeadData={setHeadData}
            headData={headData}
          /> */}
          <>
            <DashboardApplication
              url={`AddmissionManagerProfile/NewApplications/${admissionManagerId}`}
            />
            <DashboardReadyToApply
              url={`AddmissionManagerProfile/ReadyToApplyApplications/${admissionManagerId}`}
            />
            <AdmissionOfficer data={addMissionOfficers} />
            <DashboardProgressReport />
          </>
        </div>

        <div className="col-md-4">
          <ProviderCard admissionManagerId={admissionManagerId} />
        </div>
      </div>
    </div>
  );
};

export default AdmissionManagerForAdministrator;
