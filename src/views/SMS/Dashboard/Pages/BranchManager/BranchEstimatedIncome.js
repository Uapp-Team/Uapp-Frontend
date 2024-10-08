import React from "react";
import wallet from "../../../../../assets/img/Wallet.png";

const BranchEstimatedIncome = ({ amount, intake }) => {
  return (
    <>
      <div className="custom-card-border p-4 mb-24px">
        <div className="text-center">
          <img src={wallet} className="img-fluid my-2" alt="" />
          <p className="text-gray-70 fw-500 mb-24px">Estimated Income</p>
          <h1 className="mx-auto mb-24px">
            <span className="estincome">£ {amount}</span>
          </h1>
          <p className="text-gray-70 text-underline mb-0">{intake}</p>
        </div>
      </div>
    </>
  );
};

export default BranchEstimatedIncome;
