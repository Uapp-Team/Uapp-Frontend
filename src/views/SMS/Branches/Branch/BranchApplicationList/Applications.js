import React, { useEffect, useState } from "react";

import ApplicationsCommon from "./Component/ApplicationsCommon.js";
import ConsultantApplication from "./Component/ConsultantApplication.js";
import StudentApplication from "./Component/StudentApplication.js";
import ProviderApplication from "./Component/ProviderApplication.js";
import AdmissionManagerApplication from "./Component/AdmissionManagerApplication.js";
import Loader from "../../../Search/Loader/Loader.js";
import { userTypes } from "../../../../../constants/userTypeConstant.js";
import get from "../../../../../helpers/get.js";

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
          {parseInt(localStorage.getItem("userType")) ===
          userTypes?.Consultant ? (
            <ConsultantApplication currentUser={currentUser} />
          ) : parseInt(localStorage.getItem("userType")) ===
            userTypes?.Student ? (
            <StudentApplication currentUser={currentUser} />
          ) : parseInt(localStorage.getItem("userType")) ===
            userTypes?.ProviderAdmin ? (
            <ProviderApplication currentUser={currentUser} />
          ) : parseInt(localStorage.getItem("userType")) ===
              userTypes?.AdmissionManager ||
            parseInt(localStorage.getItem("userType")) ===
              userTypes?.AdmissionOfficer ? (
            <AdmissionManagerApplication currentUser={currentUser} />
          ) : parseInt(localStorage.getItem("userType")) ===
            userTypes?.BranchManager ? (
            <ApplicationsCommon />
          ) : (
            <ApplicationsCommon />
          )}
        </>
      )}
    </div>
  );
};

export default Applications;
