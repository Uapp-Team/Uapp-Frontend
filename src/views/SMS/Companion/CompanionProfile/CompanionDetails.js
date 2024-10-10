import React from "react";
import { Card } from "reactstrap";
import PersonalDetails from "./PersonalDetails";
import Address from "./Address";
import Rightwork from "./Rightwork";
import BankDetails from "./BankDetails";
import EmergencyContact from "./EmergencyContact";

const CompanionDetails = ({
  companionProfileData,
  companionId,
  referenceId,
}) => {
  return (
    <Card className="p-4">
      <PersonalDetails
        companionProfileData={companionProfileData}
        companionId={companionId}
        referenceId={referenceId}
      />
      <Address
        companionProfileData={companionProfileData}
        companionId={companionId}
        referenceId={referenceId}
      />
      <EmergencyContact
        companionProfileData={companionProfileData}
        companionId={companionId}
        referenceId={referenceId}
      />
      <Rightwork
        companionProfileData={companionProfileData}
        companionId={companionId}
        referenceId={referenceId}
      />
      <BankDetails
        companionProfileData={companionProfileData}
        companionId={companionId}
        referenceId={referenceId}
      />
    </Card>
  );
};

export default CompanionDetails;
