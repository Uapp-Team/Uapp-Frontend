import React from "react";
import { Card } from "reactstrap";
import PersonalDetails from "./ConsultantDetails/PersonalDetails";
import Rightwork from "./ConsultantDetails/Rightwork";
import BankDetails from "./ConsultantDetails/BankDetails";
import Address from "./ConsultantDetails/Address";
import Recruitment from "./ConsultantDetails/Recruitment";
import GeneralInfo from "./ConsultantDetails/GeneralInfo";
import Commission from "./ConsultantDetails/Commission";

const ConsultantDetails = ({ id }) => {
  return (
    <Card className="p-4">
      <GeneralInfo id={id} />
      <PersonalDetails id={id} />
      <Address id={id} />
      <Rightwork id={id} />
      <BankDetails id={id} />
      <Recruitment id={id} />
      <Commission id={id} />
    </Card>
  );
};

export default ConsultantDetails;
