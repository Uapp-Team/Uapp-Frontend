import React from "react";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import { userTypes } from "../../../constants/userTypeConstant";
import SuperAdmin from "../../SMS/Dashboard/Pages/SuperAdmin/Index";
import AdmissionManager from "../../SMS/Dashboard/Pages/AdmissionManager/Index";
// import Admin from "../../SMS/Dashboard/Pages/Admin/Index";
import Provider from "../../SMS/Dashboard/Pages/Provider/Index";
import BranchManager from "../../SMS/Dashboard/Pages/BranchManager/Index";
import Student from "../../SMS/Dashboard/Pages/Student/Index";
import AccountManager from "../../SMS/Dashboard/Pages/AccountManager/Index";
import Editor from "../../SMS/Dashboard/Pages/Editor/Index";
import FinanceManager from "../../SMS/Dashboard/Pages/FinanceManager/Index";
import AccountOfficer from "../../SMS/Dashboard/Pages/AccountOfficer/Index";
import ComplianceManager from "../../SMS/Dashboard/Pages/ComplianceManager/Index";
import ProviderAdmin from "../../SMS/Dashboard/Pages/ProviderAdmin/Index";
import ProviderCompliance from "../../SMS/Dashboard/Pages/ProviderCompliance/Index";
import AdmissionOfficer from "../../SMS/Dashboard/Pages/AdmissionOfficer/Index";
import Consultant from "../../SMS/Dashboard/Pages/Consultant/Index";
import Affiliate from "../../SMS/Dashboard/Pages/Affiliate/Index";
import Companion from "../../SMS/Dashboard/Pages/Companion/Index";
// import NewDashboard from "../../SMS/Dashboard/Pages/NewDashboard/NewDashboard";
// import StudentDashboard from "../../SMS/Dashboard/Pages/StudentNew/StudentDashboard";
import ForOtherUser from "../../SMS/Dashboard/Pages/ForOtherUser/ForOtherUser";
import SalesManager from "../../SMS/Dashboard/Pages/SalesManager/Index";
import SalesTeamLeader from "../../SMS/Dashboard/Pages/SalesTeamLeader/Index";

const AnalyticsDashboard = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  //fetch('https://localhost:44349/api/Values')
  //  .then(response => response.json())
  //  .then(data => {

  //  });

  return (
    <div>
      {currentUser.userTypeId.toString() === userTypes?.SystemAdmin ||
      currentUser.userTypeId.toString() === userTypes?.Admin ? (
        <SuperAdmin />
      ) : currentUser.userTypeId.toString() === userTypes?.SalesManager ? (
        <SalesManager />
      ) : currentUser.userTypeId.toString() === userTypes?.SalesTeamLeader ? (
        <SalesTeamLeader />
      ) : currentUser.userTypeId.toString() === userTypes?.AdmissionManager ? (
        <AdmissionManager />
      ) : currentUser.userTypeId.toString() === userTypes?.Provider ? (
        <Provider />
      ) : currentUser.userTypeId.toString() === userTypes?.BranchAdmin ||
        currentUser.userTypeId.toString() === userTypes?.BranchManager ? (
        <BranchManager />
      ) : currentUser.userTypeId.toString() === userTypes?.Student ? (
        <Student />
      ) : currentUser.userTypeId.toString() === userTypes?.AccountManager ? (
        <AccountManager />
      ) : currentUser.userTypeId.toString() === userTypes?.Editor ? (
        <Editor />
      ) : currentUser.userTypeId.toString() === userTypes?.FinanceManager ? (
        <FinanceManager />
      ) : currentUser.userTypeId.toString() === userTypes?.AccountOfficer ? (
        <AccountOfficer />
      ) : currentUser.userTypeId.toString() === userTypes?.ComplianceManager ? (
        <ComplianceManager />
      ) : currentUser.userTypeId.toString() === userTypes?.ProviderAdmin ? (
        <ProviderAdmin />
      ) : currentUser.userTypeId.toString() ===
        userTypes?.ProviderCompliance ? (
        <ProviderCompliance />
      ) : currentUser.userTypeId.toString() === userTypes?.AdmissionOfficer ? (
        <AdmissionOfficer />
      ) : currentUser.userTypeId.toString() === userTypes?.Consultant ? (
        <Consultant />
      ) : currentUser.userTypeId.toString() === userTypes?.Affiliate ? (
        <Affiliate />
      ) : currentUser.userTypeId.toString() === userTypes?.Companion ? (
        <Companion />
      ) : (
        // <Affiliate />
        <ForOtherUser></ForOtherUser>
      )}

      {/* {(currentUser.userTypeId == userTypes?.SystemAdmin ||
        currentUser.userTypeId == userTypes?.Admin) && <SuperAdmin />}

      {currentUser.userTypeId == userTypes?.AdmissionManager && (
        <AdmissionManager />
      )}

      {currentUser.userTypeId == userTypes?.Provider && <Provider />}

      {currentUser.userTypeId == userTypes?.BranchAdmin && <BranchManager />}

      {currentUser.userTypeId == userTypes?.Student && <Student />}

      {currentUser.userTypeId == userTypes?.AccountManager && (
        <AccountManager />
      )}

      {currentUser.userTypeId == userTypes?.Editor && <Editor />}

      {currentUser.userTypeId == userTypes?.FinanceManager && (
        <FinanceManager />
      )}

      {currentUser.userTypeId == userTypes?.AccountOfficer && (
        <AccountOfficer />
      )}

      {currentUser.userTypeId == userTypes?.ComplianceManager && (
        <ComplianceManager />
      )}

      {currentUser.userTypeId == userTypes?.ProviderAdmin && <ProviderAdmin />}

      {currentUser.userTypeId == userTypes?.ProviderCompliance && (
        <ProviderCompliance />
      )}

      {currentUser.userTypeId == userTypes?.AdmissionOfficer && (
        <AdmissionOfficer />
      )}

      {currentUser.userTypeId == userTypes?.Consultant && <Consultant />} */}
    </div>
  );
};

export default AnalyticsDashboard;
