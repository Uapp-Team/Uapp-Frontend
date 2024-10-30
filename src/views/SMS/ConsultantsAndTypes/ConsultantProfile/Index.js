import React from "react";
import { userTypes } from "../../../../constants/userTypeConstant";
import ConsultantProfile from "./ConsultantProfile";
import ConsultantProfileForStudent from "./ConsultantProfileForStudent";
import ConsultantProfileForOthers from "./ConsultantProfileForOthers";
import ConsultantProfileForAdministrator from "./ConsultantProfileForAdministrator";
import ConsultantProfileForAccountUser from "./ConsultantProfileForAccountUser";

const Index = () => {
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");
  return (
    <div>
      {userType === userTypes?.Consultant.toString() ? (
        <ConsultantProfile userId={userId} />
      ) : userType === userTypes?.Student.toString() ? (
        <ConsultantProfileForStudent />
      ) : userType === userTypes?.SystemAdmin.toString() ||
        userType === userTypes?.BranchManager.toString() ||
        userType === userTypes?.ComplianceManager.toString() ||
        userType === "22" ||
        userType === userTypes?.Admin.toString() ? (
        <ConsultantProfileForAdministrator />
      ) : userType === userTypes?.FinanceManager.toString() ||
        userType === userTypes?.AccountManager.toString() ||
        userType === userTypes?.AccountOfficer.toString() ? (
        <ConsultantProfileForAccountUser />
      ) : (
        <ConsultantProfileForOthers />
      )}
    </div>
  );
};

export default Index;