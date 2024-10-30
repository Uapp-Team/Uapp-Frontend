import React from "react";
import { Card } from "reactstrap";

const AffiliateLink = ({ affiliateId, affiliateProfileData }) => {
  return (
    <div>
      <Card className="p-4">
        <div className="mb-4 font-theme-second fw-600">
          Digital Portfolio Information
        </div>
        {affiliateProfileData?.data?.affiliateLinks.map((details) => (
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

export default AffiliateLink;
