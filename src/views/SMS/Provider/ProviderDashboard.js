import React from "react";
import { useParams } from "react-router-dom";
import "../../../assets/CoustomStyle/dashboard.css";
import ProviderCountingCard from "../Dashboard/Pages/ProviderAdmin/Components/ProviderCountingCard";
import DashboardProgressReport from "../../../components/ui/DashboardProgressReport";
import DashboardReadyToApply from "../../../components/ui/DashboardReadyToApply";
import DashboardApplication from "../../../components/ui/DashboardApplication";
// import ProviderApplications from "../Dashboard/Pages/ProviderAdmin/Components/ProviderApplicationList";
// import ProviderManagerList from "../Dashboard/Pages/ProviderAdmin/Components/ProviderManagerList";
// import ProviderUniversity from "../Dashboard/Pages/ProviderAdmin/Components/ProviderUniversity";

const ProviderDashboard = () => {
  const { id } = useParams();

  return (
    <>
      <ProviderCountingCard id={id} />
      <DashboardApplication
        url={`ProviderAdminDashboard/newApplications?id=${id}`}
      />
      <DashboardReadyToApply
        url={`ProviderAdminDashboard/ReadyToApplyApplications?id=${id}`}
      />
      <DashboardProgressReport />
      {/* <ProviderApplications id={id} />
      <ProviderManagerList id={id} />
      <ProviderUniversity id={id} /> */}
    </>
  );
};

export default ProviderDashboard;
