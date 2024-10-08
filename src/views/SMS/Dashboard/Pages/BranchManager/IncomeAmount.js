import React from "react";

const IncomeAmount = ({ title, amount, intake }) => {
  return (
    <>
      <div className="custom-card-border p-4 mb-24px">
        <div className="text-center">
          <h1 className="mx-auto mb-24px">
            <span className="income-amount">£ {amount}</span>
          </h1>
          <p className="mb-24px text-gray-70 fs-18px">{title}</p>
          <p className="text-gray-70 text-underline mb-0">{intake}</p>
        </div>
      </div>
    </>
  );
};

export default IncomeAmount;
