import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import wallet from "../../../../assets/img/Wallet.png";
import get from "../../../../helpers/get";

const EstimatedIncome = ({ companionId }) => {
  const [estIncome, setEstIncome] = useState({});
  useEffect(() => {
    get(`affiliateTransactoin/estimated-income/${companionId}`).then((res) => {
      setEstIncome(res);
    });
  }, [companionId]);

  return (
    <>
      <Card className="p-4">
        <div className="text-center">
          <img src={wallet} className="img-fluid my-2" alt="" />
          <p className="text-gray-70">Estimated Income</p>
          <h1 className="my-5 mx-auto">
            <b className="estincome">£ {estIncome?.estimatedAmount}</b>
          </h1>
          {/* {estIncome?.estimatedAmount === 0 ? (
            <p className="text-gray-70">Add application to income</p>
          ) : null} */}

          <p className="text-gray-70 text-underline">
            {estIncome?.currentIntake}
          </p>
        </div>
      </Card>
      {/* <Card className="p-4">
        <div className="text-center">
          <img src={wallet} className="img-fluid my-2" alt="" />
          <p className="text-gray-70">Estimated Income</p>
          <h1 className="my-5 mx-auto">
            <b className="estincome">£ {estIncome?.estimatedAmount}</b>
          </h1>
          {estIncome?.estimatedAmount === 0 ? (
            <p className="text-gray-70">Add application to income</p>
          ) : null}

          <p className="text-gray-70 text-underline">
            {estIncome?.currentIntake}{" "}
          </p>
        </div>
      </Card> */}
    </>
  );
};

export default EstimatedIncome;
