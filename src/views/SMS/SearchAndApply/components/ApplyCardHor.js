import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { BiDonateBlood } from "react-icons/bi";
import { CiBag1, CiLocationOn, CiTimer } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuHeart, LuSettings2, LuShare2 } from "react-icons/lu";
import { MdPriceCheck } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import BellIcon from "../../../../assets/icon/Bell.svg";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import {
  Consultant,
  referenceId,
  Student,
} from "../../../../components/core/User";
import { rootUrl } from "../../../../constants/constants";
import {
  currency,
  deliveryMethods,
  studyMode,
} from "../../../../constants/presetData";
import get from "../../../../helpers/get";
import "../SearchAndApply.css";
import ApplyModal from "./ApplyModal";
import CustomToolTip from "./CustomToolTip";
import QuickViewModal from "./QuickViewModal";

const ApplyCardHor = ({
  data,
  studentName,
  setSubjectId,
  handleFavourite,
  handleSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [quickViewData, setQuickViewData] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [applyEligibility, setApplyEligibility] = useState({});
  const [subjectInfo, setSubjectInfo] = useState({});

  const handleQuickView = async (subjectId, universityId, index) => {
    setIndex(index);
    const quickViewData = data.filter(
      (item) =>
        item.subjectId === subjectId && item.universityId === universityId
    );
    const eligibilityData = await get(
      `Eligibility/ShowEligibility/${universityId}/${subjectId}`
    );
    if (quickViewData[0]?.isLoanAvailable) {
      get(`Subject/Get/${subjectId}`).then((res) => {
        setSubjectInfo(res.data);
      });
    }
    setEligibility(eligibilityData);
    setQuickViewData(quickViewData[0]);
    setOpen(true);
  };

  const handleApply = async (subjectId, universityId) => {
    setSubjectId(subjectId);
    await get(
      `Eligibility/ApplicationOverview/${universityId}/${subjectId}/${referenceId}`
    ).then((res) => setApplyEligibility(res));
    const quickViewData = data.filter(
      (item) =>
        item.subjectId === subjectId && item.universityId === universityId
    );
    setQuickViewData(quickViewData[0]);
    setOpenApplyModal(true);
  };

  return (
    <>
      {data?.length > 0 &&
        data?.map((item, index) => (
          <div className="card-container mt-3" key={index}>
            {item.intakeStatusId === 3 && (
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
                <div className="tags">
                  {
                    [
                      item.isLoanAvailable && (
                        <span
                          className="card-tag work-placement mr-1"
                          key="loan"
                        >
                          Loan Available
                        </span>
                      ),
                      item.isScholarshipAvailable && (
                        <span
                          className="card-tag scholarship-available"
                          key="scholarship"
                        >
                          Scholarship Available
                        </span>
                      ),
                      item.isWorkPlacementAvailable && (
                        <span
                          className="card-tag scholarship-available"
                          key="work-placement"
                        >
                          Work Placement
                        </span>
                      ),
                    ]
                      .filter(Boolean) // Filter out any `false` values
                      .slice(0, 2) // Show only the first two tags
                  }
                </div>
                <div className="d-flex ml-2 align-items-center justify-content-center">
                  <div className="mr-3">
                    {!Student() && (
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
                  {Student() ? (
                    item.isFavorite ? (
                      <FaHeart
                        onClick={() =>
                          handleFavourite(
                            item.isFavorite,
                            item.subjectId,
                            index
                          )
                        }
                        className="cursor-pointer"
                      />
                    ) : (
                      <LuHeart
                        onClick={() =>
                          handleFavourite(
                            item.isFavorite,
                            item.subjectId,
                            index
                          )
                        }
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
                    src={rootUrl + item.universityLogoUrl}
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
                      <p className="card-price">
                        {currency(item.firstYearTutionFeeCurrencyId)}{" "}
                        {item.firstYearTutionFee}
                      </p>
                    </div>
                    <div className="mr-4">
                      <span className="card-subtitle">
                        <CiBag1 className="mr-2" />
                        Deposit
                      </span>
                      <p className="card-price">
                        {currency(item.depositFeeCurrencyId)} {item.depositFee}
                      </p>
                    </div>
                    <div className="mr-4">
                      <span className="card-subtitle">
                        <BiDonateBlood className="mr-2" />
                        Application fee
                      </span>
                      <p className="card-price">
                        {currency(item.avarageApplicationFeeCurrencyId)}{" "}
                        {item.avarageApplicationFee}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {Consultant() && (
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
                          handleQuickView(
                            item.subjectId,
                            item.universityId,
                            index
                          )
                        }
                      >
                        Quick view
                      </button>

                      {item.intakeStatusId === 3 ? (
                        <Tooltip
                          title={
                            !item?.canApply ? (
                              <div className="custom-tooltip-content">
                                <span>{item?.summary}</span>
                              </div>
                            ) : null
                          }
                          placement="top"
                          overlayClassName="custom-tooltip"
                          disabled={item?.canApply}
                        >
                          <span className="inline-block">
                            <button
                              className={`w-50 register-btn ${
                                !item?.canApply ? "disabled" : ""
                              }`}
                              onClick={() =>
                                handleApply(item.subjectId, item.universityId)
                              }
                              disabled={!item?.canApply}
                            >
                              <div className="flex items-center gap-1">
                                Register Interest
                                {!item?.canApply ? (
                                  <InfoCircleOutlined
                                    style={{
                                      fontSize: "14px",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }}
                                  />
                                ) : (
                                  <RiArrowRightSLine />
                                )}
                              </div>
                            </button>
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title={
                            !item?.canApply ? (
                              <div className="custom-tooltip-content">
                                <span>{item?.summary}</span>
                              </div>
                            ) : null
                          }
                          placement="top"
                          overlayClassName="custom-tooltip"
                          disabled={item?.canApply}
                        >
                          <span className="inline-block">
                            <button
                              className={`apply-btn-vertical ${
                                !item?.canApply ? "disabled" : ""
                              }`}
                              onClick={() =>
                                handleApply(item.subjectId, item.universityId)
                              }
                              disabled={!item?.canApply}
                            >
                              <div className="flex items-center gap-1">
                                <span className="mr-2">Apply Now</span>
                                {!item?.canApply ? (
                                  <InfoCircleOutlined
                                    style={{
                                      fontSize: "14px",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }}
                                  />
                                ) : (
                                  <RiArrowRightSLine />
                                )}
                              </div>
                            </button>
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <QuickViewModal
        open={open}
        index={index}
        onClose={() => setOpen(false)}
        quickViewData={quickViewData}
        eligibility={eligibility}
        handleFavourite={handleFavourite}
        handleSubmit={handleSubmit}
        handleApply={handleApply}
        applyEligibility={applyEligibility}
        subjectInfo={subjectInfo}
      />
      <ApplyModal
        open={openApplyModal}
        onClose={() => setOpenApplyModal(false)}
        studentName={studentName}
        applyEligibility={applyEligibility}
        quickViewData={quickViewData}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default ApplyCardHor;
