import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { CiBag1, CiLocationOn, CiTimer } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuHeart, LuSettings2, LuShare2 } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import BellIcon from "../../../../assets/icon/Bell.svg";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import { deliveryMethods, studyMode } from "../../../../constants/presetData";
import get from "../../../../helpers/get";
import "../SearchAndApply.css";
import CustomToolTip from "./CustomToolTip";
import QuickViewModal from "./QuickViewModal";

const ApplyCardHor = ({ data, handleFavourite }) => {
  const userType = localStorage.getItem("userType");
  const [open, setOpen] = React.useState(false);
  const [quickViewData, setQuickViewData] = React.useState({});
  const [eligibility, setEligibility] = React.useState({});

  const handleQuickView = async (subjectId, universityId) => {
    const quickViewData = data.filter(
      (item) =>
        item.subjectId === subjectId && item.universityId === universityId
    );
    const eligibilityData = await get(
      `Eligibility/ShowEligibility/${universityId}/${subjectId}`
    );
    setEligibility(eligibilityData);
    setQuickViewData(quickViewData[0]);
    setOpen(true);
  };
  return (
    <>
      {data?.length > 0 &&
        data?.map((item, index) => (
          <div className="card-container mt-3" key={index}>
            {item.intakeStatusId !== 1 && (
              <span className="tbc">
                TBC
                <Tooltip
                  title={<span>To Be Continue</span>}
                  placement="top"
                  overlayClassName="custom-tooltip"
                >
                  <InfoCircleOutlined
                    style={{
                      fontSize: "12px",
                      color: "#fff",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  />
                </Tooltip>
              </span>
            )}
            <div className="card-header">
              <span className="card-date">
                {" "}
                <img src={BellIcon} alt="" /> {item.applicationDeadLine}
              </span>
              <div className="d-flex">
                {/* <div className="tags">
                  <span className="card-tag fast-track">Fast Track</span>
                </div> */}
                {item.isScholarshipAvailable && (
                  <div className="tags">
                    <span className="card-tag scholarship-available">
                      Scholarship Available
                    </span>
                  </div>
                )}
                {item.isWorkPlacementAvailable && (
                  <div className="tags">
                    <span className="card-tag scholarship-available">
                      Work Placement
                    </span>
                  </div>
                )}
                <div className="d-flex ml-2 align-items-center justify-content-center">
                  <div className="mr-3">
                    {Number(userType) !== 6 && (
                      <img
                        src={
                          Number(item.intakeStatusId) === 1 ? online : offline
                        }
                        alt={
                          Number(item.intakeStatusId) === 1
                            ? "Online"
                            : "Offline"
                        }
                      />
                    )}
                  </div>
                  <LuSettings2 className="mr-3" />
                  <LuShare2 className="mr-3" />
                  {userType == 6 ? (
                    item.isFavorite ? (
                      <LuHeart
                        onClick={() => handleFavourite(item.subjectId)}
                        color="red"
                        fill="red"
                        className="cursor-pointer"
                      />
                    ) : (
                      <LuHeart
                        onClick={() => handleFavourite(item.subjectId)}
                        className="cursor-pointer"
                      />
                    )
                  ) : null}
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="card-content">
                <h3 className="card-title fw-700 fs-20px">
                  {item.subjectName}
                </h3>
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="h-48px w-48px mr-2"
                    src={"https://localtest.uapp.uk/" + item.universityLogoUrl}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <span className="fw-700 fs-14px">
                      {item.universityName}
                    </span>
                    <span className="fw-400 fs-12px">
                      {item.campusNames.split(",")[0].trim()}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <ul className="card-details">
                    <li className="d-flex justify-content-between">
                      <span className="d-flex align-items-center">
                        <CiLocationOn className="mr-2" />
                        <CustomToolTip
                          methodIds={item.campusNames}
                          title="Campus Name"
                        />
                      </span>
                      <span className="d-flex align-items-center">
                        <CiTimer className="mr-2" />
                        <CustomToolTip methodIds={item.durationNames} />
                      </span>
                      <span className="d-flex align-items-center">
                        <FaPeopleGroup className="mr-2" />
                        <CustomToolTip
                          methodIds={item.studyModes}
                          methods={studyMode}
                          title="Study Mode"
                        />
                      </span>
                      <span className="d-flex align-items-center">
                        <VscFeedback className="mr-2" />
                        <CustomToolTip
                          methodIds={item.deliveryMethods}
                          methods={deliveryMethods}
                          title="Devlivery Pattern"
                        />
                      </span>
                      <span className="d-flex align-items-center">
                        <SlCalender className="mr-2" />
                        <CustomToolTip
                          methodIds={item.intakeNames}
                          title="Intakes"
                        />
                      </span>
                    </li>
                  </ul>
                  {/* <button className="probability">
                    Probability:{" "}
                    <Progress
                      type="circle"
                      percent={80}
                      width={35}
                      strokeColor="#FFAD0D"
                    />
                  </button> */}
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
                      <p className="card-price">£{item.localTutionFee}</p>
                    </div>
                    <div className="mr-4">
                      <span className="card-subtitle">
                        {" "}
                        <CiBag1 className="mr-2" />
                        Deposit
                      </span>
                      <p className="card-price">£{item.depositFee}</p>
                    </div>
                    <div className="mr-4">
                      <span className="card-subtitle">
                        <BiDonateBlood className="mr-2" />
                        Application fee
                      </span>
                      <p className="card-price">
                        £{item.avarageApplicationFee}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {userType == 13 && (
                      <div className="gross">
                        <p className="d-flex flex-row">
                          <span className="fs-12px mr-2">Gross Earning </span>{" "}
                          <span className="fw-500">
                            £{item.commissionAmount}
                          </span>
                        </p>
                      </div>
                    )}

                    <div>
                      <button
                        className="quick-btn"
                        onClick={() =>
                          handleQuickView(item.subjectId, item.universityId)
                        }
                      >
                        Quick view
                      </button>
                      <button className="apply-btn">
                        Apply Now <RiArrowRightSLine />
                      </button>
                      {/* <button className="register-btn">Register Interest</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <QuickViewModal
        open={open}
        onClose={() => setOpen(false)}
        eligibility={eligibility}
        quickViewData={quickViewData}
      />
    </>
  );
};

export default ApplyCardHor;
