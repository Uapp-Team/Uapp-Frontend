import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { userTypes } from "../../../../constants/userTypeConstant.js";
import Loader from "../../Search/Loader/Loader.js";
import ApplicationsCommon from "./Component/ApplicationsCommon.js";
import ConsultantApplication from "./Component/ConsultantApplication.js";
import StudentApplication from "./Component/StudentApplication.js";
import ProviderApplication from "./Component/ProviderApplication.js";
import AdmissionManagerApplication from "./Component/AdmissionManagerApplication.js";
import AffiliateApplication from "./Component/AffiliateApplication.js";
import CompanionApplication from "./Component/CompanionApplication.js";

const Applications = () => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    get("Account/GetCurrentUserId").then((res) => {
      setCurrentUser(res);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Check user which components render for application start here*/}
          {localStorage.getItem("userType") === userTypes?.Consultant ? (
            <ConsultantApplication currentUser={currentUser} />
          ) : localStorage.getItem("userType") === userTypes?.Student ? (
            <StudentApplication currentUser={currentUser} />
          ) : localStorage.getItem("userType") === userTypes?.Affiliate ? (
            <AffiliateApplication currentUser={currentUser} />
          ) : localStorage.getItem("userType") === userTypes?.Companion ? (
            <CompanionApplication currentUser={currentUser} />
          ) : localStorage.getItem("userType") === userTypes?.ProviderAdmin ? (
            <ProviderApplication currentUser={currentUser} />
          ) : localStorage.getItem("userType") ===
              userTypes?.AdmissionManager ||
            localStorage.getItem("userType") === userTypes?.AdmissionOfficer ? (
            <AdmissionManagerApplication currentUser={currentUser} />
          ) : localStorage.getItem("userType") === userTypes?.BranchAdmin ? (
            <ApplicationsCommon />
          ) : (
            <ApplicationsCommon />
          )}
          {/* Check user which components render for application end here*/}
        </>
      )}
    </div>
  );
};

export default Applications;
