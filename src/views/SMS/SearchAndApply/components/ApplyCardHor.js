import { InfoCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { RiArrowRightSLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import {
  Consultant,
  referenceId,
  Student,
} from "../../../../components/core/User";
import { rootUrl } from "../../../../constants/constants";
import {
  countryInfo,
  currency,
  deliveryMethods,
  studyMode,
} from "../../../../constants/presetData";
import get from "../../../../helpers/get";
import { isDateWithin7Days } from "../../../../helpers/IsDateWithin7Days";
import "../SearchAndApply.css";
import ApplyModal from "./ApplyModal";
import CustomToolTip from "./CustomToolTip";
import {
  ArrowLeftRightIcon,
  BellIconDefault,
  BellIconRed,
  CalenderIcon,
  DeliverPatternIcon,
  DepositIcon,
  DonationIcon,
  LocationIcon,
  MoneyIcon,
  ShareIcon,
  StudyModeIcon,
  TimerIcon,
} from "./icons";
import QuickViewModal from "./QuickViewModal";
import TuitionFee from "./TuitionFee";

const ApplyCardHor = ({
  data,
  studentName,
  applicationTypeSelected,
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

  const router = useHistory();
  const handleCourseDetails = (subjectId) => {
    router.push(`subjectProfile/${subjectId}`);
  };

  const handleQuickView = async (item, index) => {
    setIndex(index);

    const eligibilityData = await get(
      `Eligibility/ShowEligibility/${item.universityId}/${item.subjectId}`
    );
    if (item?.isLoanAvailable) {
      await get(`Subject/Get/${item.subjectId}`).then((res) => {
        setSubjectInfo(res);
      });
    }
    setEligibility(eligibilityData);
    setQuickViewData(item);
    setOpen(true);
  };

  const handleApply = async (item) => {
    setSubjectId(item.subjectId);
    await get(
      `Eligibility/ApplicationOverview/${item.universityId}/${item.subjectId}/${referenceId}`
    ).then((res) => setApplyEligibility(res));

    setQuickViewData(item);
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
                  title={<span>To Be Confirm</span>}
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
            <div className="card-headers">
              <span className="card-date">
                {" "}
                {isDateWithin7Days(item.maxApplicationDeadLine) ? (
                  <BellIconRed />
                ) : (
                  <BellIconDefault />
                )}{" "}
                {item.maxApplicationDeadLine}
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
                          className="card-tag work-placement mr-2"
                          key="loan"
                        >
                          Loan Available
                        </span>
                      ),
                      item.isScholarshipAvailable && (
                        <span
                          className="card-tag scholarship-available mr-2"
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
                    ].filter(Boolean) // Filter out any `false` values
                    // .slice(0, 2)  Show only the first two tags
                  }
                </div>
                <div className="d-flex ml-2 align-items-center justify-content-center">
                  <div className="mr-3">
                    {!Student() && (
                      <div>
                        {item.intakeStatusId === 3 ? (
                          <img src={offline} alt="" />
                        ) : (
                          <img src={online} alt="" />
                        )}
                      </div>
                    )}
                  </div>
                  <span className="mr-3 cursor-pointer">
                    <ArrowLeftRightIcon />
                  </span>
                  <span className="mr-3 cursor-pointer">
                    <ShareIcon />
                  </span>
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
                  <span
                    onClick={() => handleCourseDetails(item.subjectId)}
                    className="cursor-pointer"
                  >
                    {item.subjectName}
                  </span>
                </h3>
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="h-48px w-48px mr-2 rounded"
                    src={rootUrl + item.universityLogoUrl}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <span className="fw-700 fs-14px">
                      {item.universityName}
                    </span>
                    <span className="fw-400 fs-12px">
                      {item.campusNames.split(",")[0].trim()}
                      {", "}
                      {countryInfo(item?.universityCountryId)?.name}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <ul className="card-details">
                    <li className="d-flex justify-content-between">
                      <span className="d-flex align-items-center mr-5">
                        <span className="mr-2 d-flex justify-content-center">
                          <LocationIcon />
                          <span className="ml-1 fw-500">Location</span>
                        </span>
                        <CustomToolTip
                          methodIds={item.campusNames}
                          title="Campus Name"
                        />
                      </span>
                      <span className="d-flex align-items-center mr-5">
                        <span className="mr-2 d-flex justify-content-center">
                          <TimerIcon />
                          <span className="ml-1 fw-500">Duration</span>
                        </span>
                        <span className="mt-2">
                          {(() => {
                            const fullTimeDuration = item.durations.find(
                              (duration) => Number(duration.studyMode) === 2
                            );
                            const otherDurations = item.durations.filter(
                              (duration) => Number(duration.studyMode) !== 2
                            );

                            return (
                              <div className="d-flex">
                                <span>
                                  {fullTimeDuration && (
                                    <span className="duration-tag">
                                      {fullTimeDuration.name}
                                    </span>
                                  )}
                                </span>
                                <span>
                                  {otherDurations.length > 0 && (
                                    <Tooltip
                                      title={
                                        <div className="custom-tooltip-content">
                                          <div className="tooltip-method">
                                            {otherDurations.map(
                                              (method, index) => (
                                                <span key={index}>
                                                  {method.name}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      }
                                      placement="top"
                                      overlayClassName="custom-tooltip"
                                      color="white"
                                    >
                                      <MoreOutlined
                                        rotate={90}
                                        style={{
                                          fontSize: "24px",
                                          color: "#5D5D5D",
                                          cursor: "pointer",
                                          marginLeft: "4px",
                                        }}
                                      />
                                    </Tooltip>
                                  )}
                                </span>
                              </div>
                            );
                          })()}
                        </span>
                      </span>
                      <span className="d-flex align-items-center mr-5">
                        <span className="mr-2 d-flex justify-content-center">
                          <StudyModeIcon />
                          <span className="ml-1 fw-500">Study Mode</span>
                        </span>
                        <span className="mt-1">
                          {(() => {
                            const methods = item.durations
                              ?.map((duration) => {
                                return studyMode.find(
                                  (mode) =>
                                    mode.id === Number(duration.studyMode)
                                );
                              })
                              .filter(Boolean);

                            const fullTime = methods.find(
                              (method) => method.id === 2
                            );
                            const others = methods.filter(
                              (method) => method.id !== 2
                            );

                            return (
                              <div className="d-flex">
                                <span>
                                  {fullTime && (
                                    <span className="duration-tag">
                                      {fullTime.name}
                                    </span>
                                  )}
                                </span>
                                <span>
                                  {others.length > 0 && (
                                    <Tooltip
                                      title={
                                        <div className="custom-tooltip-content">
                                          <div className="tooltip-method">
                                            {others.map((method, index) => (
                                              <div key={index}>
                                                {method.name}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      }
                                      placement="top"
                                      overlayClassName="custom-tooltip"
                                      color="white"
                                    >
                                      <MoreOutlined
                                        rotate={90}
                                        style={{
                                          fontSize: "24px",
                                          color: "#5D5D5D",
                                          cursor: "pointer",
                                          marginLeft: "4px",
                                        }}
                                      />
                                    </Tooltip>
                                  )}
                                </span>
                              </div>
                            );
                          })()}
                        </span>
                      </span>
                      <span className="d-flex align-items-center mr-5">
                        <span className="mr-2 d-flex justify-content-center">
                          <DeliverPatternIcon />
                          <span className="ml-1 fw-500">Delivery Pattern</span>
                        </span>
                        <CustomToolTip
                          methodIds={item.deliveryMethods}
                          methods={deliveryMethods}
                          title="Delivery Pattern"
                        />
                      </span>
                      <span className="d-flex align-items-center mr-5">
                        <span className="mr-2 d-flex justify-content-center">
                          <CalenderIcon />
                          <span className="ml-1 fw-500">Intake</span>
                        </span>
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
                        <span className="mr-1">
                          <MoneyIcon />
                        </span>
                        Tuition Fee
                      </span>
                      <p className="card-price">
                        <span className="fw-600">
                          <TuitionFee
                            applicationTypeSelected={applicationTypeSelected}
                            item={item}
                          />
                        </span>
                      </p>
                    </div>
                    <div className="mr-4">
                      <span className="card-subtitle">
                        <span className="mr-1">
                          <DepositIcon />
                        </span>
                        Deposit
                      </span>
                      <p className="card-price">
                        <span className="fw-600">
                          {currency(item.depositFeeCurrencyId)}{" "}
                          {item.depositFee}
                        </span>
                      </p>
                    </div>
                    <div className="mr-4">
                      <span className="card-subtitle">
                        <span className="mr-1">
                          <DonationIcon />
                        </span>
                        Application fee
                      </span>
                      <p className="card-price">
                        <span className="fw-600">
                          {currency(item.avarageApplicationFeeCurrencyId)}{" "}
                          {item.avarageApplicationFee}
                        </span>
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
                        onClick={() => handleQuickView(item, index)}
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
                          color="white"
                        >
                          <span className="inline-block">
                            <button
                              className={`w-50 register-btn ${
                                !item?.canApply ? "disabled" : ""
                              }`}
                              onClick={() => handleApply(item)}
                              disabled={!item?.canApply}
                            >
                              <div className="flex items-center gap-1">
                                <span className="mr-2">Register Interest</span>
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
                          color="white"
                        >
                          <span className="inline-block">
                            <button
                              className={`apply-btn-vertical ${
                                !item?.canApply ? "disabled" : ""
                              }`}
                              onClick={() => handleApply(item)}
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
        applicationTypeSelected={applicationTypeSelected}
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
