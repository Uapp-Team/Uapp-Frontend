import React from "react";
import { userTypes } from "../../../constants/userTypeConstant";
import IntakeRangeReportForAdministrator from "./IntakeRangeReportForAdministrator";
import IntakeRangeReportForProviderAdmin from "./IntakeRangeReportForProviderAdmin";

const Index = () => {
  const userType = localStorage.getItem("userType");

  return (
    <div>
      {userType == userTypes?.SystemAdmin ||
      userType == userTypes?.AdmissionCompliance ||
      userType == userTypes?.Admin ||
      userType == userTypes?.BranchManager ? (
        <IntakeRangeReportForAdministrator />
      ) : userType == userTypes?.ProviderAdmin ? (
        <IntakeRangeReportForProviderAdmin />
      ) : null}
    </div>
  );
};

export default Index;
