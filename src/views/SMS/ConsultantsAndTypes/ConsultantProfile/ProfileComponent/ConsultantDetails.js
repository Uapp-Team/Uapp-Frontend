import React from "react";
import { Card } from "reactstrap";
import PersonalDetails from "./ConsultantDetails/PersonalDetails";
import Rightwork from "./ConsultantDetails/Rightwork";
import BankDetails from "./ConsultantDetails/BankDetails";
import Address from "./ConsultantDetails/Address";
import Recruitment from "./ConsultantDetails/Recruitment";
import GeneralInfo from "./ConsultantDetails/GeneralInfo";
import Commission from "./ConsultantDetails/Commission";
import EmergencyContactConsultant from "../EmergencyContactConsultant";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ConsultantDetails = ({ id }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <>
      {" "}
      {permissions?.includes(permissionList.View_Consultant) ? (
        <>
          {" "}
          <Card className="p-4">
            <GeneralInfo id={id} />
            <PersonalDetails id={id} />
            <Address id={id} />
            <EmergencyContactConsultant id={id} />
            <Rightwork id={id} />
            <BankDetails id={id} />
            <Recruitment id={id} />
            <Commission id={id} />
          </Card>
        </>
      ) : null}
    </>
  );
};

export default ConsultantDetails;
