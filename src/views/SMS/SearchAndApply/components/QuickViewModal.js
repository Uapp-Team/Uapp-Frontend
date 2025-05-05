import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { LuArrowUpRight, LuHeart, LuSettings2, LuShare2 } from "react-icons/lu";
import { RiArrowRightSLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
import BellIcon from "../../../../assets/icon/Bell.svg";
import Campus from "../../../../assets/icon/Campus Location Icon Container.svg";
import mortarboard from "../../../../assets/icon/mortarboard-02.svg";
import ranking from "../../../../assets/icon/ranking.svg";
import Tuition from "../../../../assets/icon/Tuition Fees Icon Container.svg";
import SaveMoney from "../../../../assets/img/save-money-pound.svg";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import { Student } from "../../../../components/core/User";
import { rootUrl } from "../../../../constants/constants";
import {
  countryInfo,
  currency,
  deliveryMethods,
  deliverySchedules,
  studyMode,
} from "../../../../constants/presetData";
import "../SearchAndApply.css";
import ApplyModal from "./ApplyModal";
import {
  CalenderIcon,
  DeliverPatternIcon,
  DeliveryScheduleIcon,
  DepositIcon,
  StudyModeIcon,
  TimerIcon,
} from "./icons";

const QuickViewModal = ({
  open,
  index,
  onClose,
  quickViewData,
  eligibility,
  handleFavourite,
  handleSubmit,
  handleApply,
  applyEligibility,
  subjectInfo,
}) => {
  let router = useHistory();
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const handleCourseDetails = (subjectId) => {
    router.push(`subjectProfile/${subjectId}`);
  };

  return (
    <>
      <Modal isOpen={open} toggle={onClose} className="modal-lg">
        <div
          className="d-flex justify-content-between py-3 px-4"
          style={{
            background: "#F9FBFB",
          }}
        >
          <span className="fs-20px fw-600 text-515151">Quick view</span>
          <CloseBtn action={onClose} />
        </div>
        <ModalBody className="p-30px modal-overflow">
          <Row className="quickview-header">
            <Col md={12} lg={7}>
              <h2 className="quickview-title mb-3">
                {quickViewData?.subjectName}
              </h2>
            </Col>
            <Col
              md={12}
              lg={5}
              className="d-flex align-items-center justify-content-between mb-3"
            >
              <div className="d-flex">
                <div className="mr-2 icon-design">
                  <LuSettings2 size={16} />
                </div>
                <div className="mr-2 icon-design">
                  <LuShare2 size={16} />
                </div>
                {Student() ? (
                  quickViewData.isFavorite ? (
                    <div
                      className="mr-2 icon-design"
                      onClick={() =>
                        handleFavourite(
                          quickViewData.isFavorite,
                          quickViewData.subjectId,
                          index
                        )
                      }
                    >
                      <FaHeart size={16} />
                    </div>
                  ) : (
                    <div
                      className="mr-2 icon-design"
                      onClick={() =>
                        handleFavourite(
                          quickViewData.isFavorite,
                          quickViewData.subjectId,
                          index
                        )
                      }
                    >
                      <LuHeart size={16} />
                    </div>
                  )
                ) : null}

                <div
                  className="mr-2 icon-design"
                  onClick={() => handleCourseDetails(quickViewData?.subjectId)}
                >
                  <LuArrowUpRight size={16} className="fs-20px" />
                </div>
              </div>

              {quickViewData.intakeStatusId !== 1 ? (
                <Tooltip
                  title={
                    !quickViewData?.canApply ? (
                      <div className="custom-tooltip-content">
                        <span>{quickViewData?.summary}</span>
                      </div>
                    ) : null
                  }
                  placement="top"
                  overlayClassName="custom-tooltip"
                  disabled={quickViewData?.canApply}
                  color="white"
                >
                  <span className="inline-block">
                    <button
                      className={`w-50 register-btn ${
                        !quickViewData?.canApply ? "disabled" : ""
                      }`}
                      onClick={() => handleApply(quickViewData)}
                      disabled={!quickViewData?.canApply}
                    >
                      <div className="flex items-center gap-1">
                        <span className="mr-2">Register Interest</span>
                        {!quickViewData?.canApply ? (
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
                    !quickViewData?.canApply ? (
                      <div className="custom-tooltip-content">
                        <span>{quickViewData?.summary}</span>
                      </div>
                    ) : null
                  }
                  placement="top"
                  overlayClassName="custom-tooltip"
                  disabled={quickViewData?.canApply}
                >
                  <span className="inline-block">
                    <button
                      className={`apply-btn ${
                        !quickViewData?.canApply ? "disabled" : ""
                      }`}
                      onClick={() => handleApply(quickViewData)}
                      disabled={!quickViewData?.canApply}
                    >
                      <div className="flex items-center gap-1">
                        <span className="mr-2">Apply Now</span>
                        {!quickViewData?.canApply ? (
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
            </Col>
          </Row>

          <Row className="quickview-content">
            <Col xs={12} lg={7} className="quickview-left">
              <div className="tags my-3">
                {quickViewData?.isLoanAvailable && (
                  <span className="card-tag work-placement mr-1">
                    Loan Available
                  </span>
                )}
                {quickViewData?.isWorkPlacementAvailable && (
                  <span className="card-tag work-placement mr-1">
                    Work Placement
                  </span>
                )}
                {quickViewData?.isScholarshipAvailable && (
                  <span className="card-tag scholarship-available">
                    Scholarship Available
                  </span>
                )}
              </div>
              <div className="quickview-left__deadline my-2">
                <span className="mr-3">
                  <img src={BellIcon} alt="" />{" "}
                  {quickViewData?.applicationDeadLine}
                </span>
                {quickViewData?.classStartDate && (
                  <p className="fs-14px">
                    Course Start Date{" "}
                    <span className="fw-600">
                      {quickViewData?.classStartDate}
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-3">
                <div className="my-4 d-flex">
                  <div className="fs-14px d-flex align-items-center">
                    <span className="mr-2">
                      <TimerIcon />
                    </span>
                    <span className="mr-3">Duration</span>
                  </div>
                  <div className="d-flex flex-wrap">
                    {quickViewData?.durationNames
                      ?.split(",")
                      .map((duration, index) => (
                        <span className="filter-button" key={index}>
                          {duration}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="my-4 d-flex">
                    <div className="fs-14px d-flex align-items-center">
                      <span className="mr-2">
                        <CalenderIcon />
                      </span>
                      <span className="mr-3">Intake</span>
                    </div>
                    <div className="d-flex flex-wrap">
                      {quickViewData?.intakeNames
                        ?.split(",")
                        .map((intake, index) => (
                          <span className="filter-button" key={index}>
                            {intake}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="dashed-hr"></div>
                <div className="requirement-block">
                  <h3 className="my-4 text-515151 fw-600 fs-18px mb-24px">
                    {eligibility?.requiredEducationlevel}
                  </h3>
                  {eligibility?.requiredResultInPercentage && (
                    <div className="text-515151 mb-24px">
                      <p className="fs-16px fw-600">Academic Qualification</p>
                      <ul>
                        <li>{eligibility?.requiredResultInPercentage}</li>
                      </ul>
                    </div>
                  )}
                </div>
                {eligibility?.englishLanguages?.length > 0 && (
                  <div className="requirement-block text-515151 mb-24px">
                    <p className="fs-16px fw-600">English Language</p>
                    <ul>
                      {eligibility?.englishLanguages?.map((item, index) => (
                        <li key={index}>
                          {item}
                          {index === eligibility.englishLanguages.length - 2 &&
                            " or"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Col>

            <Col xs={12} lg={5} className="quickview-right">
              <div className="d-flex align-items-center my-2">
                <img
                  className="h-48px w-48px mr-2"
                  src={rootUrl + quickViewData?.universityLogoUrl}
                  alt=""
                />
                <div className="d-flex flex-column">
                  <span className="fw-600 fs-14px">
                    {quickViewData?.universityName}
                  </span>
                  <span className="fw-400 fs-12px">
                    {quickViewData?.campusNames?.split(",")[0].trim()}
                    {", "}
                    {countryInfo(quickViewData?.universityCountryId)?.name}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-start my-4">
                <img src={ranking} alt="" className="h-24px w-24px mr-2 mt-1" />
                <div className="d-flex flex-column">
                  <span className="fs-14px fw-600">
                    #{quickViewData?.globalRankNumber}
                  </span>
                  <span className="fs-12px">Global Rank</span>
                </div>
              </div>
              <div className="dashed-hr"></div>
              <div className="info-group">
                <img src={Campus} alt="" className="h-24px w-24px mr-2 mt-1" />
                <div>
                  <span className="info-title">Campus Location</span>
                  <ul>
                    {quickViewData?.campusNames ? (
                      quickViewData.campusNames
                        ?.split(",")
                        .map((campus, index) => (
                          <li key={index}>{campus.trim()}</li>
                        ))
                    ) : (
                      <li>No campus information available</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="dashed-hr"></div>
              <div className="info-group">
                <img src={Tuition} alt="" className="h-24px w-24px mr-2 mt-1" />
                <div>
                  <span className="info-title">Tuition Fees</span>
                  <div>
                    <div className="d-flex justify-content-between">
                      <span className="mr-3"> Home/UK: </span>
                      <span>
                        {currency(quickViewData.localTutionFeeCurrencyId)}
                        {quickViewData?.localTutionFee}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="mr-3">EU/EEU: </span>
                      <span>
                        {currency(quickViewData.eU_TutionFeeCurrencyId)}
                        {quickViewData?.eU_TutionFee}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="mr-3">International: </span>
                      <span>
                        {currency(quickViewData.internationalTutionCurrencyId)}
                        {quickViewData?.internationalTutionFee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {quickViewData?.scholarshipDetails && (
                <>
                  <div className="dashed-hr"></div>
                  <div className="info-group">
                    <img
                      src={mortarboard}
                      alt=""
                      className="h-24px w-24px mr-2 mt-1"
                    />
                    <div>
                      <span className="info-title">Scholarship</span>
                      <ul>
                        <li>{quickViewData?.scholarshipDetails}</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
              <div className="dashed-hr"></div>
              <div className="info-group">
                <img
                  src={Application}
                  alt=""
                  className="h-24px w-24px mr-2 mt-1"
                />
                <div>
                  <span className="info-title">Application Fee</span>
                  <ul>
                    <li>
                      {currency(quickViewData.avarageApplicationFeeCurrencyId)}
                      {quickViewData?.avarageApplicationFee}
                    </li>
                  </ul>
                </div>
              </div>
              {quickViewData?.isLoanAvailable && (
                <div className="info-group">
                  <img
                    src={SaveMoney}
                    alt=""
                    className="h-24px w-24px mr-2 mt-1"
                  />
                  <div>
                    <span className="info-title">Loan Available</span>
                    <div>
                      {subjectInfo?.isGovernmentLoan &&
                        subjectInfo?.governmentLoanUrl && (
                          <a
                            href={`${subjectInfo.governmentLoanUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Government Loan</span>
                          </a>
                        )}
                    </div>
                    <div>
                      {subjectInfo?.isPrivateLoan &&
                        subjectInfo?.privateLoanUrl && (
                          <a
                            href={subjectInfo.privateLoanUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Private Loan
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>

          <Row className="quickview-footer">
            <div className="footer-tag">
              <div className="mb-2 fw-500">
                <span className="mr-1">
                  <DeliverPatternIcon />
                </span>
                <span>Delivery Pattern</span>
              </div>
              <div className="footer-tag__content">
                <ul>
                  {quickViewData?.deliveryMethods
                    ?.split(",")
                    .map((id) => {
                      const method = deliveryMethods.find(
                        (m) => m.id === parseInt(id.trim(), 10)
                      );
                      return method?.name;
                    })
                    .filter(Boolean)
                    .map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="footer-tag">
              <div className="mb-2 fw-500">
                <span className="mr-1">
                  <StudyModeIcon />
                </span>
                Study Mode{" "}
              </div>
              <div className="footer-tag__content">
                <ul>
                  {quickViewData?.studyModes
                    ?.split(",")
                    .map((id) => {
                      const method = studyMode.find(
                        (m) => m.id === parseInt(id.trim(), 10)
                      );
                      return method?.name;
                    })
                    .filter(Boolean)
                    .map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="footer-tag">
              <div className="mb-2 fw-500">
                <span className="mr-1">
                  <DeliveryScheduleIcon />
                </span>
                Delivery Schedule{" "}
              </div>
              <div className="footer-tag__content">
                <ul>
                  {quickViewData?.deliverySchedules
                    ?.split(",")
                    .map((id) => {
                      const method = deliverySchedules.find(
                        (m) => m.id === parseInt(id.trim(), 10)
                      );
                      return method?.name;
                    })
                    .filter(Boolean)
                    .map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="footer-tag">
              <div className="mb-2 fw-500">
                <span className="mr-1">
                  <DepositIcon />
                </span>
                Deposit{" "}
              </div>
              <div className="footer-tag__content">
                <ul>
                  <li>
                    {currency(quickViewData.depositFeeCurrencyId)}
                    {quickViewData?.depositFee}
                  </li>
                </ul>
              </div>
            </div>
          </Row>
        </ModalBody>
        <ModalFooter className="view-more-container">
          <button
            className="view-more-btn"
            onClick={() => handleCourseDetails(quickViewData?.subjectId)}
          >
            View course profile
          </button>
        </ModalFooter>
        <ApplyModal
          open={openApplyModal}
          onClose={() => setOpenApplyModal(false)}
          applyEligibility={applyEligibility}
          quickViewData={quickViewData}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default QuickViewModal;
