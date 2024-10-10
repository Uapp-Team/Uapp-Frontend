import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/CoustomStyle/dashboard.css";
import ProviderCountingCard from "../Dashboard/Pages/ProviderAdmin/Components/ProviderCountingCard";
import DashboardProgressReport from "../../../components/ui/DashboardProgressReport";
import DashboardReadyToApply from "../../../components/ui/DashboardReadyToApply";
import DashboardApplication from "../../../components/ui/DashboardApplication";
import get from "../../../helpers/get";
import DashboardProgressChart from "../../../components/ui/DashboardProgressChart";
// import ProviderApplications from "../Dashboard/Pages/ProviderAdmin/Components/ProviderApplicationList";
// import ProviderManagerList from "../Dashboard/Pages/ProviderAdmin/Components/ProviderManagerList";
// import ProviderUniversity from "../Dashboard/Pages/ProviderAdmin/Components/ProviderUniversity";

const ProviderDashboard = () => {
  const { id } = useParams();
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  useEffect(() => {
    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntakeRngValue(res?.id);
    });
  }, []);

  return (
    <>
      <ProviderCountingCard id={id} intakeRngValue={intakeRngValue} />
      <DashboardApplication
        url={`ProviderAdminDashboard/newApplications?id=${id}&rangeid=${intakeRngValue}`}
      />
      <DashboardReadyToApply
        url={`ProviderAdminDashboard/ReadyToApplyApplications?id=${id}&rangeid=${intakeRngValue}`}
      />
      <DashboardProgressChart />
      {/* <ProviderApplications id={id} />
      <ProviderManagerList id={id} />
      <ProviderUniversity id={id} /> */}
    </>
  );
};

export default ProviderDashboard;
