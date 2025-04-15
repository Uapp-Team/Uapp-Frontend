import { Progress } from "antd";
import React, { useState } from "react";
import { BiDonateBlood } from "react-icons/bi";
import { CiBag1, CiLocationOn, CiTimer } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuHeart, LuSettings2, LuShare2 } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import BellIcon from "../../../../assets/icon/Bell.svg";
import "../SearchAndApply.css";

const ApplyCardVar = ({ data }) => {
  const [isVertical, setIsVertical] = useState(false);

  const toggleLayout = () => setIsVertical(!isVertical);

  return (
    <div className="card-container-horizontal mt-3">
      <div className="card-header">
        <span className="card-date">
          <img src={BellIcon} alt="" /> {data.date}
        </span>
        <div className="d-flex">
          <div className="d-flex ml-4 align-items-center justify-content-center mx-2">
            <LuSettings2
              className="mr-3 cursor-pointer"
              onClick={toggleLayout}
            />
            <LuShare2 className="mr-3" />
            <LuHeart />
          </div>
        </div>
      </div>

      <div className={`${!isVertical ? "card-body" : "card-body-vertical"}`}>
        <div
          className={`${
            !isVertical ? "card-content" : "card-content-vertical"
          }`}
        >
          <h3
            className={`${!isVertical ? "card-title" : "card-title-vertical"}`}
          >
            {data.title}
          </h3>
          <p
            className={`${
              !isVertical ? "card-subtitle" : "card-subtitle-vertical"
            }`}
          >
            {data.university}
          </p>
          <div className={`${!isVertical ? "tags" : "tags-vertical"}`}>
            <span className={`card-tag fast-track`}>Fast Track</span>
          </div>
          <div className="dashed-hr"></div>
          <div>
            <ul className="card-details-vertical">
              <li className="d-flex justify-content-between">
                <span>
                  <CiLocationOn className="mr-2" />
                  <span>Location</span>
                </span>
                {data.location}
              </li>
              <li className="d-flex justify-content-between">
                <span>
                  <MdPriceCheck className="mr-2" />
                  <span>Tuition (1st year)</span>
                </span>
                {data.tuition}
              </li>
              <li className="d-flex justify-content-between">
                <span>
                  <CiBag1 className="mr-2" />
                  <span>Deposit</span>
                </span>
                {data.type}
              </li>
              <li className="d-flex justify-content-between">
                <span>
                  <BiDonateBlood className="mr-2" />
                  <span>Application fee</span>
                </span>
                {data.palcement}
              </li>
              <li className="d-flex justify-content-between">
                <span>
                  <CiTimer className="mr-2" />
                  <span>Duration</span>
                </span>
                {data.duration}
              </li>
              <li className="d-flex justify-content-between">
                <span>
                  <FaPeopleGroup className="mr-2" />
                  <span>Study Mode</span>
                </span>
                {data.type}
              </li>
              <li className="d-flex justify-content-between">
                <span>
                  <VscFeedback className="mr-2" />
                  <span>Delivery Pattern</span>
                </span>
                {data.type}
              </li>
              <li className="d-flex justify-content-between">
                <span>
                  <SlCalender className="mr-2" />
                  <span>Intake</span>
                </span>
                {data.intake}
              </li>
            </ul>
          </div>
          <div className="dashed-hr"></div>
          <div className="tags">
            <span className="card-tag work-placement">Work Placement</span>
            <span className="card-tag scholarship-available">
              Scholarship Available
            </span>
          </div>
        </div>
        <div className="my-3">
          <button className="probability-vertical">
            Probability:{" "}
            <Progress
              type="circle"
              percent={80}
              width={35}
              strokeColor="#FFAD0D"
            />
          </button>
        </div>

        <div className="card-action-vertical">
          <button className="quick-btn-vertical">Quick view</button>
          <button className="apply-btn-vertical">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default ApplyCardVar;
