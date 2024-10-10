import React from "react";
import { Card } from "reactstrap";

const CompanionLink = ({ companionId, companionProfileData }) => {
  return (
    <div>
      <Card className="p-4">
        <div className="mb-4">
          <h4 className="mb-0">Digital Portfolio Information</h4>
        </div>
        {companionProfileData?.data?.companionLinks.map((details) => (
          <>
            <a href={details?.link} target="blank">
              <h5 className="font-theme-second fw-500">
                <i class="fa-solid fa-arrow-up-right-from-square theme-text-primary mr-2"></i>
                {details?.title}
              </h5>
            </a>
          </>
        ))}
      </Card>
    </div>
  );
};

export default CompanionLink;
