import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const StatusCard = () => {
  return (
    <div className="custom-card-border p-16px">
      <div className="d-flex justify-content-between">
        <div className="">Status</div>
        <div className="custom-progress">
          <div
            className="custom-progress-bar"
            role="progressbar"
            aria-valuenow="33"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "33%" }}
          ></div>
        </div>
      </div>
      <div className="row mb-24px mt-20px">
        <div className="col">
          <span className="fs-22px">5k</span>
          <span className="fs-12px"> Applications</span>
        </div>
        <div className="col">
          <span className="fs-22px">4.6k</span>
          <span className="fs-12px"> Student</span>
        </div>
      </div>
      <div className="theme-text-primary pointer">
        View Application <AiOutlineRight />
      </div>
    </div>
  );
};

export default StatusCard;
