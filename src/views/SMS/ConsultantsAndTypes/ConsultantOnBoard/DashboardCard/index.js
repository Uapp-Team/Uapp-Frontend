import React from "react";

import imgComplete from "../../../../../assets/img/onboardfull.svg";
import manPicOnBoardCard from "../../../../../../src/assets/img/manPicOnBoardCard.svg";

const DashboardCard = () => {
  return (
    <div className="onboard-dashboard-card">
      <div className="onboard-section-icon p-4">
        <i className="fas fa-user-check"></i>
      </div>
      {/* Complete Profile Section */}
      <div className="onboard-dashboard-section-first ml-5 p-4">
        <div>
          <div className="mb-2">
            <img src={imgComplete} alt="" />
          </div>
          <div className="onboard-section-title">Complete Profile</div>
        </div>
      </div>

      {/* Completed Onboarding Video and Quiz Section */}
      <div className="onboard-dashboard-section-two p-4">
        <div className="onboard-section-content pb-3">
          <img src={imgComplete} alt="" />
          <div className="onboard-section-title">
            Completed onboarding video and Quiz
          </div>
        </div>

        <p className="onboard-pass ml-3 mt-4">Pass</p>
      </div>

      {/* Video Call/Interaction Section */}
      <div className="onboard-dashboard-section-third p-4">
        <div>
          <img src={manPicOnBoardCard} alt="" />
        </div>
      </div>

      {/* Profile Under Review Section */}
      <div className="onboard-dashboard-section-four p-4">
        <div className="onboard-section-icon">
          <div className="onboard-loading-spinner"></div>
        </div>
        <div className="onboard-section-title onboard-review-text">
          Please wait a moment while your profile is under review. We'll approve
          it ASAP
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
