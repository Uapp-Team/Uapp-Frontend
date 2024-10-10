import React from "react";
import succes from "../../../../../../assets/icon/success.svg";
import pending from "../../../../../../assets/icon/pending.svg";
import reject from "../../../../../../assets/icon/reject.svg";

const AssessmentStatus = ({ title, value }) => {
  return (
    <div className="row">
      <div className="col-6 fw-500">
        <p>{title}</p>
      </div>
      <div className="col-6">
        <img
          src={value === 3 ? succes : value === 1 ? pending : reject}
          alt=""
        />
        <span className="pl-3">
          {value === 3 ? "Approved" : value === 1 ? "Under Review" : "Rejected"}
        </span>
      </div>
    </div>
  );
};

export default AssessmentStatus;
