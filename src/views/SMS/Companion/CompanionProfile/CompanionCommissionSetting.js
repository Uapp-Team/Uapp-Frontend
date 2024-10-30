import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import Uget from "../../../../helpers/Uget";
import get from "../../../../helpers/get";

const CompanionCommissionSetting = ({ companionId, affiliateProfileData }) => {
  const [current, setCurrent] = useState([]);
  const [companionCommission, setCompanionCommission] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    Uget(`CompanionCommissionLog/Index/${companionId}`).then((res) => {
      console.log(res);
      setCurrent(res?.data);
    });

    get(`CompanionTeamCommission`).then((res) => {
      setCompanionCommission(res);
    });
  }, [companionId, success]);
  return (
    <>
      {" "}
      {current !== null ? (
        <div>
          <Card className="p-4 font-theme-second">
            <div className="mb-4 fw-600">Commission Setting</div>
            <div className="fw-5000">
              <p>Name: {current?.name}</p>
              <p>Commission Amount: {current?.amount}</p>
              <p>Commission From Team: {companionCommission?.percentage}%</p>
              <p>
                Lead to student Amount:{" "}
                {companionCommission?.registrationAmount}£
              </p>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default CompanionCommissionSetting;
