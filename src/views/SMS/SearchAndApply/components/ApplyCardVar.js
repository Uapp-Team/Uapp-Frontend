import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import { Consultant, Student } from "../../../../components/core/User";
import { rootUrl } from "../../../../constants/constants";
import {
  currency,
  deliveryMethods,
  durationInfo,
  studyMode,
} from "../../../../constants/presetData";
import get from "../../../../helpers/get";
import { isDateWithin7Days } from "../../../../helpers/IsDateWithin7Days";
import "../SearchAndApply.css";
import "./../custombrackpoint.css";
import ApplyModal from "./ApplyModal";
import CustomToolTip from "./CustomToolTip";
import DisplayWithTooltip from "./DisplayWithToolTip";
import {
  ArrowLeftRightIcon,
  BellIconDefault,
  BellIconRed,
  CalenderIcon,
  DeliverPatternIcon,
  DepositIcon,
  DonationIcon,
  HeartIconFill,
  HeartIconStock,
  LocationIcon,
  MoneyIcon,
  ShareIcon,
  StudyModeIcon,
  TimerIcon,
} from "./icons";
import OverflowHeightText from "./OverflowHeightText";
import QuickViewModal from "./QuickViewModal";
import TuitionFee from "./TuitionFee";

const ApplyCardVar = ({
  data,
  studentName,
  applicationTypeSelected,
  setSubjectId,
  handleFavourite,
  handleSubmit,
  comparedItems,
  handleAddToCompare,
}) => {
  const referenceId = localStorage.getItem("referenceId");
  const [open, setOpen] = useState(false);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [eligibility, setEligibility] = useState({});
  const [applyEligibility, setApplyEligibility] = useState({});
  const [quickViewData, setQuickViewData] = useState({});
  const [subjectInfo, setSubjectInfo] = useState({});

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
      <div className="mt-3 grid-columns">
        {data?.length > 0 &&
          data?.map((item, index) => (
            <div key={index}>
              <div className="card-container-vertical">
                {item.intakeStatusId === 3 && (
                  <span className="tbc">
                    TBC
                    <Tooltip
                      title={
                        <div className="custom-tooltip-content">
                          <span className="tooltip-method">To Be Confirm</span>
                        </div>
                      }
                      placement="top"
                      overlayClassName="custom-tooltip"
                      color="white"
                    >
                      <InfoCircleOutlined
                        style={{
                          fontSize: "14px",
                          color: "#fff",
                          cursor: "pointer",
                          marginLeft: "4px",
                        }}
                      />
                    </Tooltip>
                  </span>
                )}
                <div className="card-header-vertical">
                  <span className="card-date">
                    {isDateWithin7Days(item.maxApplicationDeadLine) ? (
                      <BellIconRed />
                    ) : (
                      <BellIconDefault />
                    )}{" "}
                    {item.maxApplicationDeadLine}
                  </span>
                  <div className="d-flex">
                    <div className="d-flex ml-4 align-items-center justify-content-center mx-2">
                      <span
                        className="mr-2 cursor-pointer icon"
                        onClick={() => handleAddToCompare(item, index)}
                        style={{
                          backgroundColor: comparedItems.includes(
                            `${item.subjectId}-${index}`
                          )
                            ? "#EFF2F2"
                            : "#FFF",
                        }}
                      >
                        <ArrowLeftRightIcon />
                      </span>
                      <span className="mr-2 cursor-pointer icon">
                        <ShareIcon />
                      </span>
                      {Student() ? (
                        item.isFavorite ? (
                          <span
                            onClick={() =>
                              handleFavourite(
                                item.isFavorite,
                                item.subjectId,
                                index
                              )
                            }
                            className="cursor-pointer icon"
                          >
                            <HeartIconFill />
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              handleFavourite(
                                item.isFavorite,
                                item.subjectId,
                                index
                              )
                            }
                            className="cursor-pointer icon"
                          >
                            <HeartIconStock />
                          </span>
                        )
                      ) : (
                        <div>
                          {item.intakeStatusId === 3 ? (
                            <img src={offline} alt="" />
                          ) : (
                            <img src={online} alt="" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-body-vertical">
                  <div className="card-content-vertical">
                    <div className="d-flex mb-2">
                      <img
                        className="h-48px w-48px mr-2 rounded"
                        src={rootUrl + item.universityLogoUrl}
                        alt=""
                      />
                      <div
                        className="d-flex flex-column"
                        style={{
                          height: "60px",
                        }}
                      >
                        <span className="fw-600 fs-14px">
                          {/* {item.universityName} */}
                          {item.universityName?.slice(0, 55)}
                          {item.universityName?.length > 55 && "..."}
                        </span>
                        <span className="fw-400 fs-12px">
                          {/* {item.campusNames.split(",")[0].trim()}
                          {", "}
                          {countryInfo(item?.universityCountryId)?.name} */}
                          {item?.universityLocation}
                        </span>
                      </div>
                    </div>

                    <OverflowHeightText
                      text={item.subjectName}
                      className="card-title-vertical fw-700 fs-20px"
                      height="60px"
                      line={2}
                      link={item.subjectId}
                    />
                    {/* <div className="tags">
                  <span className="card-tag fast-track">Fast Track</span>
                </div> */}
                    <div className="dashed-hr"></div>
                    <div>
                      <ul className="card-details-vertical">
                        <li className="d-flex justify-content-between">
                          <span>
                            <LocationIcon />
                            <span className="ml-1 fw-500">Location</span>
                          </span>
                          <CustomToolTip methodIds={item.campusNames} />
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>
                            <MoneyIcon />
                            <span className="ml-1 fw-500">
                              Tuition Fee{" "}
                              {item?.durationTypeId > 0 && (
                                <>({durationInfo(item?.durationTypeId)?.ly})</>
                              )}
                            </span>
                          </span>
                          <span className="fw-600">
                            <TuitionFee
                              applicationTypeSelected={applicationTypeSelected}
                              item={item}
                            />
                          </span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>
                            <DepositIcon />
                            <span className="ml-1 fw-500">Deposit</span>
                          </span>
                          <span className="fw-600">
                            {currency(item.depositFeeCurrencyId)}{" "}
                            {item.depositFee}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>
                            <DonationIcon />
                            <span className="ml-1 fw-500">Application fee</span>
                          </span>
                          <span className="fw-600">
                            {currency(item.avarageApplicationFeeCurrencyId)}{" "}
                            {item.avarageApplicationFee}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>
                            <TimerIcon />
                            <span className="ml-1 fw-500">Duration</span>
                          </span>
                          <DisplayWithTooltip
                            items={item?.durations}
                            primaryCondition={(duration) =>
                              Number(duration.studyMode) === 2
                            }
                            secondaryCondition={(duration) =>
                              Number(duration.studyMode) !== 2
                            }
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>
                            <StudyModeIcon />
                            <span className="ml-1 fw-500">Study Mode</span>
                          </span>
                          <DisplayWithTooltip
                            items={item.durations
                              .map((duration) =>
                                studyMode.find(
                                  (mode) =>
                                    mode.id === Number(duration.studyMode)
                                )
                              )
                              .filter(Boolean)}
                            primaryCondition={(method) => method.id === 2}
                            secondaryCondition={(method) => method.id !== 2}
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>
                            <DeliverPatternIcon />
                            <span className="ml-1 fw-500">
                              Delivery Pattern
                            </span>
                          </span>
                          <CustomToolTip
                            methodIds={item.deliveryMethods}
                            methods={deliveryMethods}
                            title="Delivery Pattern"
                          />
                        </li>
                        <li className="d-flex justify-content-between">
                          <span>
                            <CalenderIcon />
                            <span className="ml-1 fw-500">Intake</span>
                          </span>
                          <CustomToolTip
                            methodIds={item.intakeNames}
                            title="Intakes"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="dashed-hr"></div>
                    <div className="tags my-3">
                      {
                        [
                          item?.isLoanAvailable && (
                            <span className="card-tag mr-2" key="loan">
                              Loan Available
                            </span>
                          ),
                          item?.isScholarshipAvailable && (
                            <span
                              className="card-tag scholarship-available mr-2"
                              key="scholarship"
                            >
                              Scholarship Available
                            </span>
                          ),
                          item?.isWorkPlacementAvailable && (
                            <span
                              className="card-tag work-placement mr-2"
                              key="work-placement"
                            >
                              Work Placement
                            </span>
                          ),
                        ]
                          .filter(Boolean) // Filter out any `false` values
                          .slice(0, 2) //Show only the first two tags
                      }
                    </div>
                  </div>
                  {Consultant() && (
                    <div
                      className="d-flex justify-content-between"
                      style={{
                        visibility:
                          item.commissionAmount > 0 ? "visible" : "hidden",
                      }}
                    >
                      <div className="gross-vertical my-2 rounded-2">
                        <p className="d-flex flex-column">
                          <span className="fs-12px">Gross Earning</span>{" "}
                          <span className="fw-600">
                            £{item.commissionAmount}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="card-action-vertical">
                    <button
                      className="quick-btn-vertical"
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
                        <span className="register-btn-vertical-top">
                          <button
                            className={`register-btn-vertical ${
                              !item?.canApply ? "disabled" : ""
                            }`}
                            onClick={() => handleApply(item)}
                            disabled={!item?.canApply}
                          >
                            <div>
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
                        <span className="register-btn-vertical-top">
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
          ))}
      </div>

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

export default ApplyCardVar;
