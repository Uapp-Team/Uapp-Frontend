import React from "react";
import { userTypes } from "../../../../../constants/userTypeConstant";
import AdmissionManagerForAdministrator from "./Components/AdmissionManagerForAdministrator/AdmissionManagerForAdministrator";
import AdmissionmanagerForOthers from "./Components/AdmissionManagerForOthers/AdmissionmanagerForOthers";
import AdmissionManagerOwnProfile from "./Components/AdmissionManagerOwnProfile/AdmissionManagerOwnProfile";

const Index = ({ admissionManagerId }) => {
  const userType = localStorage.getItem("userType");

  return (
    <div>
      {userType === userTypes?.SystemAdmin ||
      userType === userTypes?.Admin ||
      userType === userTypes?.ProviderAdmin ? (
        <AdmissionManagerForAdministrator
          admissionManagerId={admissionManagerId}
        />
      ) : userType === userTypes?.AdmissionManager ? (
        <AdmissionManagerOwnProfile admissionManagerId={admissionManagerId} />
      ) : (
        <AdmissionmanagerForOthers admissionManagerId={admissionManagerId} />
      )}
    </div>
  );
};

export default Index;
