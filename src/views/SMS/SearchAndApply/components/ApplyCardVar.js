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
import { Col, Row } from "reactstrap";
import BellIcon from "../../../../assets/icon/Bell.svg";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import { Consultant, Student } from "../../../../components/core/User";
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
import OverflowHeightText from "./OverflowHeightText";

const ApplyCardVar = ({
  data,
  studentName,
  setSubjectId,
  openApplyModal,
  setOpenApplyModal,
  handleFavourite,
  handleSubmit,
}) => {
  const referenceId = localStorage.getItem("referenceId");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [eligibility, setEligibility] = useState({});
  const [applyEligibility, setApplyEligibility] = useState({});
  const [quickViewData, setQuickViewData] = useState({});
  const [subjectInfo, setSubjectInfo] = useState({});

  const handleQuickView = async (subjectId, universityId, index) => {
    setIndex(index);
    const quickViewData = await data.filter(
      (item) =>
        item.subjectId === subjectId && item.universityId === universityId
    );
    const eligibilityData = await get(
      `Eligibility/ShowEligibility/${universityId}/${subjectId}`
    );
    if (quickViewData[0]?.isLoanAvailable === false) {
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
      <Row className="mt-3">
        {data?.length > 0 &&
          data?.map((item, index) => (
            <Col xs={12} md={6} lg={4} xxl={3} key={index}>
              <div className="mb-3">
                <div className="card-container-vertical">
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
                  <div className="card-header-vertical">
                    <span className="card-date">
                      <img src={BellIcon} alt="" /> {item.applicationDeadLine}
                    </span>
                    <div className="d-flex">
                      <div className="d-flex ml-4 align-items-center justify-content-center mx-2">
                        <LuSettings2 className="mr-3 cursor-pointer" />
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
                        ) : (
                          <div>
                            {item.intakeStatusId ? (
                              <img src={online} alt="" />
                            ) : (
                              <img src={offline} alt="" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-body-vertical">
                    <div className="card-content-vertical">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          className="h-48px w-48px mr-2"
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
                            {item.campusNames.split(",")[0].trim()}
                          </span>
                        </div>
                      </div>

                      <OverflowHeightText
                        text={item.subjectName}
                        className="card-title-vertical fw-700 fs-20px"
                        height="60px"
                        line={2}
                      />
                      {/* <div className="tags">
                  <span className="card-tag fast-track">Fast Track</span>
                </div> */}
                      <div className="dashed-hr"></div>
                      <div>
                        <ul className="card-details-vertical">
                          <li className="d-flex justify-content-between">
                            <span>
                              <CiLocationOn className="mr-2" />
                              <span>Location</span>
                            </span>
                            <CustomToolTip methodIds={item.campusNames} />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <MdPriceCheck className="mr-2" />
                              <span>Tuition (1st year)</span>
                            </span>
                            {currency(item.firstYearTutionFeeCurrencyId)}
                            {item.firstYearTutionFee}
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <CiBag1 className="mr-2" />
                              <span>Deposit</span>
                            </span>
                            {currency(item.depositFeeCurrencyId)}
                            {item.depositFee}
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <BiDonateBlood className="mr-2" />
                              <span>Application fee</span>
                            </span>
                            {currency(item.avarageApplicationFeeCurrencyId)}
                            {item.avarageApplicationFee}
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <CiTimer className="mr-2" />
                              <span>Duration</span>
                            </span>
                            <CustomToolTip methodIds={item.durationNames} />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <FaPeopleGroup className="mr-2" />
                              <span>Study Mode</span>
                            </span>
                            <CustomToolTip
                              methodIds={item.studyModes}
                              methods={studyMode}
                              title="Study Mode"
                            />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <VscFeedback className="mr-2" />
                              <span>Delivery Pattern</span>
                            </span>
                            <CustomToolTip
                              methodIds={item.deliveryMethods}
                              methods={deliveryMethods}
                              title="Devlivery Pattern"
                            />
                          </li>
                          <li className="d-flex justify-content-between">
                            <span>
                              <SlCalender className="mr-2" />
                              <span>Intake</span>
                            </span>
                            <CustomToolTip
                              methodIds={item.intakeNames}
                              title="Intakes"
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="dashed-hr"></div>
                      <div className="tags my-2">
                        {item.isLoanAvailable && (
                          <span className="card-tag work-placement mr-1">
                            Loan Available
                          </span>
                        )}
                        {item.isWorkPlacementAvailable && (
                          <span className="card-tag work-placement mr-1">
                            Work Placement
                          </span>
                        )}
                        {item.isScholarshipAvailable && (
                          <span className="card-tag scholarship-available">
                            Scholarship Available
                          </span>
                        )}
                      </div>
                    </div>
                    {Consultant() && (
                      <div className="d-flex justify-content-between">
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
            </Col>
          ))}
      </Row>

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

export default ApplyCardVar;
