import React from "react";
import { Card } from "reactstrap";
import PersonalDetails from "./PersonalDetails";
import Address from "./Address";
import Rightwork from "./Rightwork";
import BankDetails from "./BankDetails";
import EmergencyContact from "./EmergencyContact";

const AffiliateDetails = ({
  affiliateProfileData,
  affiliateId,
  referenceId,
}) => {
  return (
    <Card className="p-4">
      <PersonalDetails
        affiliateProfileData={affiliateProfileData}
        affiliateId={affiliateId}
        referenceId={referenceId}
      />
      <Address
        affiliateProfileData={affiliateProfileData}
        affiliateId={affiliateId}
        referenceId={referenceId}
      />
      <EmergencyContact
        affiliateProfileData={affiliateProfileData}
        affiliateId={affiliateId}
        referenceId={referenceId}
      />
      <Rightwork
        affiliateProfileData={affiliateProfileData}
        affiliateId={affiliateId}
        referenceId={referenceId}
      />
      <BankDetails
        affiliateProfileData={affiliateProfileData}
        affiliateId={affiliateId}
        referenceId={referenceId}
      />
    </Card>
  );
};

export default AffiliateDetails;
