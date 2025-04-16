import { Progress } from "antd";
import React from "react";
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
  return (
    <div className="card-container mt-3">
      <div className="card-header">
        <span className="card-date">
          {" "}
          <img src={BellIcon} alt="" /> {data.date}
        </span>
        <div className="d-flex">
          <div className="tags">
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
            <LuSettings2 className="mr-3 cursor-pointer" />
            <LuShare2 className="mr-3" />
            <LuHeart />
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="card-content">
          <h3 className="card-title fw-700 fs-20px">{data.title}</h3>
          <div className="d-flex align-items-center mb-3">
            <img className="h-48px w-48px mr-2" src={data.image} alt="" />
            <div className="d-flex flex-column">
              <span className="fw-700 fs-14px">{data.university}</span>
              <span className="fw-400 fs-12px">{data.uniAddress}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <ul className="card-details">
              <li className="d-flex justify-content-between">
                <span>
                  <CiLocationOn className="mr-2" />
                  {data.location}
                </span>
                <span>
                  <CiTimer className="mr-2" />
                  {data.duration}
                </span>
                <span>
                  <FaPeopleGroup className="mr-2" />
                  {data.type}
                </span>
                <span>
                  <VscFeedback className="mr-2" />
                  {data.palcement}
                </span>
                <span>
                  <SlCalender className="mr-2" />
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
          <div className="d-flex justify-content-between">
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
              <button className="quick-btn">Quick view</button>
              <button className="apply-btn">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCardHor;
