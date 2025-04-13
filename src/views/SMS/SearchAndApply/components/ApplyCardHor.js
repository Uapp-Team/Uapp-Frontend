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

const ApplyCardHor = ({ data }) => {
  const [isVertical, setIsVertical] = useState(false);

  const toggleLayout = () => setIsVertical(!isVertical);

  return (
    <div
      className={`${
        !isVertical ? "card-container mt-3" : "card-container-horizontal mt-3"
      }`}
    >
      <div className="card-header">
        <span className="card-date">
          {" "}
          <img src={BellIcon} alt="" /> {data.date}
        </span>
        <div className="d-flex">
          <div className={`${!isVertical ? "tags" : "tags-vertical"}`}>
            {data.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`card-tag ${tag.toLowerCase().replace(" ", "-")}`}
              >
                {tag}
              </span>
            ))}
          </div>
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
          <div className="d-flex justify-content-between align-items-end">
            <ul
              className={`${
                !isVertical ? "card-details" : "card-details-vertical"
              }`}
            >
              <li className="d-flex justify-content-between">
                <span>
                  <CiLocationOn />
                  {data.location}
                </span>
                <span>
                  <CiTimer />
                  {data.duration}
                </span>
                <span>
                  <FaPeopleGroup />
                  {data.type}
                </span>
                <span>
                  <VscFeedback />
                  {data.palcement}
                </span>
                <span>
                  <SlCalender />
                  {data.intake}
                </span>
              </li>
            </ul>
            <button className="probability">
              Probability:{" "}
              <Progress
                type="circle"
                percent={80}
                width={35}
                strokeColor="#FFAD0D"
              />
            </button>
          </div>
          <div className="dashed-hr"></div>
        </div>
        <div className="card-action">
          <div className={`${!isVertical && "d-flex justify-content-between"}`}>
            <div className="d-flex">
              <div className="mr-4">
                <span className="card-subtitle">
                  <MdPriceCheck className="mr-2" />
                  Tuition Fee (1st year)
                </span>
                <p className="card-price">{data.tuition}</p>
              </div>
              <div className="mr-4">
                <span className="card-subtitle">
                  {" "}
                  <CiBag1 className="mr-2" />
                  Deposit
                </span>
                <p className="card-price">{data.deposit}</p>
              </div>
              <div className="mr-4">
                <span className="card-subtitle">
                  <BiDonateBlood className="mr-2" />
                  Application fee
                </span>
                <p className="card-price">{data.fee}</p>
              </div>
            </div>
            <div>
              <button
                className={`${
                  !isVertical ? "quick-btn" : "quick-btn-vertical"
                }`}
              >
                Quick view
              </button>
              <button
                className={`${
                  !isVertical ? "apply-btn" : "apply-btn-vertical"
                }`}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCardHor;
