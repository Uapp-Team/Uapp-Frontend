import React from "react";
import { userTypes } from "../../../constants/userTypeConstant";
import BranchManagerNewProfile from "../Branches/BranchManager/BranchManagerNewProfile";
import ComplianceOfficerNewProfile from "../Branches/ComplianceOfficer/ComplianceOfficerNewProfile";
// import EmployeeNewProfile from "../Configuration/Employees/EmployeeNewProfile";
import Index from "../ConsultantsAndTypes/ConsultantProfile/Index";
import AdmissionManagerNewProfile from "../AllStaffs/AdmissionManager/AdmissionManagerProfile/Index";
import AdmissionOfficerProfile from "../AllStaffs/AdmissionOfficer/AdmissionOfficerProfile/Component/AdmissionOfficerProfile";
// import ProviderAdminOwnProfile from "../Provider/ProviderAdmin/ProviderAdminProfile/ProviderAdminOwnProfile";
import StudentProfileView from "../STUDENT/StudentProfile/StudentProfileView";
import ProviderDetails from "../Provider/ProviderDetails/ProviderDetails";
import EmployeeProfile from "../AllStaffs/Staffs/StaffProfile/Index";
import ProviderComplianceProfile from "../AllStaffs/ProviderCompliance/StaffProfile/Index";
import AffiliateProfile from "../Affiliate/AffiliateProfile/AffiliateProfile";
import CompanionProfile from "../Companion/CompanionProfile/CompanionProfile";

const CommonProfile = () => {
  const currentUser = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");

  console.log("userId", userId);

  return (
    <>
      {currentUser === userTypes?.Affiliate.toString() && <AffiliateProfile />}
      {currentUser === userTypes?.Companion.toString() && <CompanionProfile />}

      {currentUser === userTypes?.AdmissionManager.toString() && (
        <AdmissionManagerNewProfile />
      )}

      {currentUser === userTypes?.BranchAdmin.toString() && (
        <BranchManagerNewProfile />
      )}
      {currentUser === userTypes?.Student.toString() && (
        <StudentProfileView sId={userId} />
      )}
      {(currentUser === userTypes?.AccountManager.toString() ||
        currentUser === userTypes?.Editor.toString() ||
        currentUser === userTypes?.AccountOfficer.toString() ||
        currentUser === userTypes?.ComplianceManager.toString() ||
        currentUser === userTypes?.FinanceManager.toString()) && (
        <EmployeeProfile userId={userId} />
        // <EmployeeNewProfile />
      )}
      {currentUser === userTypes?.ProviderAdmin.toString() && (
        <ProviderDetails />
        // <ProviderAdminOwnProfile userId={userId} />
      )}
      {currentUser === userTypes?.ProviderCompliance && (
        <ProviderComplianceProfile userId={userId} />
      )}
      {currentUser === userTypes?.AdmissionOfficer.toString() && (
        <AdmissionOfficerProfile userId={userId} />
      )}
      {currentUser === userTypes?.Consultant.toString() && <Index />}
      {currentUser === userTypes?.ComplianceOfficer.toString() && (
        <ComplianceOfficerNewProfile />
      )}
    </>
  );
};

export default CommonProfile;
