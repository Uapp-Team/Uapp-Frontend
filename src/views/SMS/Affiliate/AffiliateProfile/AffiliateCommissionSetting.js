import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import Uget from "../../../../helpers/Uget";
import get from "../../../../helpers/get";

const AffiliateCommissionSetting = ({ affiliateId, affiliateProfileData }) => {
  const [current, setCurrent] = useState([]);
  const [affiliateCommission, setAffiliateCommission] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    Uget(`AffiliateCommissionLog/Index/${affiliateId}`).then((res) => {
      console.log(res);
      setCurrent(res?.data);
    });

    get(`AffiliateTeamCommission`).then((res) => {
      setAffiliateCommission(res);
    });
  }, [affiliateId, success]);
  return (
    <>
      {current !== null ? (
        <div>
          <Card className="p-4 font-theme-second">
            <div className="mb-4 fw-600">Commission Setting</div>
            <div className="fw-5000">
              <p>Name: {current?.name}</p>
              <p>Commission Amount: {current?.amount}</p>
              <p>Commission From Team: {affiliateCommission?.percentage}%</p>
              <p>
                Lead to student Amount:{" "}
                {affiliateCommission?.registrationAmount}£
              </p>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default AffiliateCommissionSetting;
