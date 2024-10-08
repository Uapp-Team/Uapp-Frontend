import React from "react";
import { useParams } from "react-router-dom";
import { userTypes } from "../../../../../../../constants/userTypeConstant";

import ProviderCard from "../../ProfileComponent/ProviderCard";
import ProviderHeadForOwnProfile from "../../ProfileComponent/ProviderHeadForOwnProfile";
import BreadCrumb from "../../../../../../../components/breadCrumb/BreadCrumb";

const AdmissionmanagerForOthers = () => {
  const { admissionManagerId } = useParams();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");

  return (
    <div>
      <BreadCrumb
        title="Admission Manager Profile"
        backTo={
          userType === userTypes?.SystemAdmin ||
          userType === userTypes?.Admin ||
          userType === userTypes?.ProviderAdmin
            ? "Admission Manager"
            : ""
        }
        path={
          userType === userTypes?.SystemAdmin ||
          userType === userTypes?.Admin ||
          userType === userTypes?.ProviderAdmin
            ? `/admissionManagerProfile/${admissionManagerId}`
            : ""
        }
      />

      <div className="row">
        <div className="col-md-8">
          <ProviderHeadForOwnProfile
            admissionManagerId={
              admissionManagerId === undefined ? admissionManagerId : userId
            }
          />
        </div>

        <div className="col-md-4">
          <ProviderCard
            admissionManagerId={
              admissionManagerId === undefined ? admissionManagerId : userId
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdmissionmanagerForOthers;
