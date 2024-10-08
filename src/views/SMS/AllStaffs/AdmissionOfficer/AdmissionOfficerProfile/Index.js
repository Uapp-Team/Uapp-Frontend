import React from "react";
import { userTypes } from "../../../../../constants/userTypeConstant";
import AdmissionOfficerProfileForAdministrators from "./Component/AdmissionOfficerProfileForAdministrators";
import AdmissionOfficerProfileForOthers from "./Component/AdmissionOfficerProfileForOthers";
import AdmissionOfficerProfile from "./Component/AdmissionOfficerProfile";

const Index = () => {
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");

  return (
    <div>
      {userType === userTypes?.SystemAdmin.toString() ||
      userType === userTypes?.ProviderAdmin.toString() ||
      userType === userTypes?.AdmissionManager.toString() ||
      userType === userTypes?.Admin.toString() ? (
        <AdmissionOfficerProfileForAdministrators />
      ) : userType === userTypes?.AdmissionOfficer.toString() ? (
        <AdmissionOfficerProfile userId={userId} />
      ) : (
        <AdmissionOfficerProfileForOthers />
      )}
    </div>
  );
};

export default Index;
