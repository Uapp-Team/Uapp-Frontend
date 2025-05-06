import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { LuArrowUpRight, LuHeart, LuShare2 } from "react-icons/lu";
import { RiArrowRightSLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
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
import { isDateWithin7Days } from "../../../../helpers/IsDateWithin7Days";
import "../SearchAndApply.css";
import ApplyModal from "./ApplyModal";
import {
  ArrowLeftRightIcon,
  BellIconDefault,
  BellIconRed,
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
  applicationTypeSelected,
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
  const [selectedIntakeId, setSelectedIntakeId] = useState("");
  const [selectedIntake, setSelectedIntake] = useState("Select Intake");
  const [selectedClassStartDate, setSelectedClassStartDate] = useState();
  const [selectedIntakeDeadLine, setSelectedIntakeDeadLine] = useState();
  console.log(quickViewData, "quickviewData");
  const handleCourseDetails = (subjectId) => {
    router.push(`subjectProfile/${subjectId}`);
  };

  const checkHome = applicationTypeSelected?.filter(
    (item) => item?.name === "Home/UK"
  );
  const checkEu = applicationTypeSelected?.filter(
    (item) => item?.name === "EU/EEA"
  );
  const checkInt = applicationTypeSelected?.filter(
    (item) => item?.name === "International"
  );

  useEffect(() => {
    if (open) {
      setSelectedIntake("Select Intake");
      setSelectedIntakeId("");
      setSelectedIntakeDeadLine("");
      setSelectedClassStartDate();
    }
  }, [open]);

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
                  <ArrowLeftRightIcon />
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
                {quickViewData?.intakeStatusId === 3 && (
                  <span className="tbc-quickview">
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
                          fontSize: "12px",
                          color: "#fff",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      />
                    </Tooltip>
                  </span>
                )}
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
                  {quickViewData?.maxApplicationDeadLine &&
                  isDateWithin7Days(quickViewData?.maxApplicationDeadLine) ? (
                    <BellIconRed />
                  ) : (
                    <BellIconDefault />
                  )}
                  Application Deadline <strong>{selectedIntakeDeadLine}</strong>
                </span>
              </div>
              <div className="quickview-left__deadline">
                <span className="fs-14px">
                  Course Start Date{" "}
                  {selectedClassStartDate ? (
                    <span className="fw-600">{selectedClassStartDate}</span>
                  ) : (
                    <strong>Please select intake first</strong>
                  )}
                </span>
              </div>
              <div>
                <div className="my-3 d-flex">
                  <div className="fs-14px d-flex">
                    <span className="mt-2">
                      <TimerIcon />
                    </span>
                    <span className="duration-label">Duration</span>
                  </div>
                  <div className="d-flex flex-wrap">
                    {quickViewData?.durations?.map((duration, index) => (
                      <span className="quickview-duration" key={index}>
                        {duration?.name} {"-"}{" "}
                        {
                          studyMode.find(
                            (mode) => mode.id == duration?.studyMode
                          )?.name
                        }{" "}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <div className="my-4 d-flex">
                    <div className="fs-14px d-flex">
                      <span className="mt-2">
                        <CalenderIcon />
                      </span>
                      <span className="duration-label mr-3">Intake</span>
                    </div>
                    <div className="d-flex flex-wrap">
                      {quickViewData?.intakes?.map((intake) => (
                        <span
                          key={intake.id}
                          className={`filter-button mr-2 mb-2 pointer ${
                            selectedIntakeId === intake.id
                              ? "filter-button-clicked"
                              : ""
                          }`}
                          onClick={() => {
                            if (selectedIntakeId === intake.id) {
                              // Deselect the intake if it's already selected
                              setSelectedIntake("Select Intake");
                              setSelectedIntakeId("");
                              setSelectedIntakeDeadLine("");
                              setSelectedClassStartDate();
                            } else {
                              // Select the intake
                              setSelectedIntake(intake.name);
                              setSelectedIntakeId(intake.id);
                              setSelectedIntakeDeadLine(
                                intake.applicationDeadLine
                              );
                              setSelectedClassStartDate(intake.classStartDate);
                            }
                          }}
                        >
                          <span>{intake.name}</span>
                          <span>
                            {selectedIntakeId === intake.id && (
                              <RxCross1
                                className="ml-2 pointer"
                                onClick={() => {
                                  setSelectedIntake("Select Intake");
                                  setSelectedIntakeId("");
                                }}
                              />
                            )}
                          </span>
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
                    {checkHome?.length === 1 && (
                      <Row>
                        <Col xs={7}> Home/UK </Col>
                        <Col xs={5}>
                          {currency(quickViewData.localTutionFeeCurrencyId)}
                          {quickViewData?.localTutionFee}
                        </Col>
                      </Row>
                    )}
                    {checkEu?.length === 1 && (
                      <Row>
                        <Col xs={7}> EU/EEU</Col>
                        <Col xs={5}>
                          {currency(quickViewData.eU_TutionFeeCurrencyId)}
                          {quickViewData?.eU_TutionFee}
                        </Col>
                      </Row>
                    )}
                    {checkInt?.length === 1 && (
                      <Row>
                        <Col xs={7}> International </Col>
                        <Col xs={5}>
                          {currency(
                            quickViewData.internationalTutionCurrencyId
                          )}
                          {quickViewData?.internationalTutionFee}
                        </Col>
                      </Row>
                    )}
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
                <>
                  <div className="dashed-hr"></div>
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
                </>
              )}
            </Col>
          </Row>

          <Row className="quickview-footer">
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
