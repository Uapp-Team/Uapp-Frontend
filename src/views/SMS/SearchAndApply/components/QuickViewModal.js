import { Modal } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { CiBag1, CiTimer } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuArrowUpRight, LuHeart, LuSettings2, LuShare2 } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { VscFeedback } from "react-icons/vsc";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
import BellIcon from "../../../../assets/icon/Bell.svg";
import Campus from "../../../../assets/icon/Campus Location Icon Container.svg";
import mortarboard from "../../../../assets/icon/mortarboard-02.svg";
import ranking from "../../../../assets/icon/ranking.svg";
import Tuition from "../../../../assets/icon/Tuition Fees Icon Container.svg";
import {
  deliveryMethods,
  deliverySchedules,
  studyMode,
} from "../../../../constants/presetData";
import "../SearchAndApply.css";

const QuickViewModal = ({ open, onClose, quickViewData, eligibility }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Quick View">
      <div className="quickview-container">
        <Row className="quickview-header">
          <Col xs={12} sm={7}>
            <h2 className="quickview-title">{quickViewData?.subjectName}</h2>
          </Col>
          <Col
            xs={12}
            sm={5}
            className="d-flex align-items-center justify-content-between"
          >
            <div>
              <LuSettings2 className="mr-4 cursor-pointer" />
              <LuShare2 className="mr-4" />
              <LuHeart color="red" fill="red" className="cursor-pointer mr-4" />
              <LuArrowUpRight className="fs-20px" />
            </div>
            <button className="apply-btn">Apply Now</button>
          </Col>
        </Row>

        <Row className="quickview-content">
          <Col xs={12} sm={7} className="quickview-left">
            <div className="quickview-left__deadline my-3">
              <span>
                <img src={BellIcon} alt="" />{" "}
                {quickViewData?.applicationDeadLine}
              </span>
              <p className="fs-14px">
                Course Start Date <span className="fw-600">25 Mar 2025</span>
              </p>
            </div>
            <div className="mt-3">
              <div className="my-4">
                <div className="fs-14px d-flex mt-3">
                  <CiTimer className="mr-2 mt-1" />
                  <p>Duration</p>
                </div>
                <div className="d-flex flex-wrap">
                  {quickViewData?.durationNames
                    ?.split(",")
                    .map((duration, index) => (
                      <span className="filter-button mr-2 mb-2">
                        {duration}
                      </span>
                    ))}
                </div>
              </div>
              <div className="my-4">
                <div className="fs-14px d-flex mt-3">
                  <SlCalender className="mr-2 mt-1" />
                  <p>Intake</p>
                </div>
                <div className="d-flex flex-wrap">
                  {quickViewData?.intakeNames
                    ?.split(",")
                    .map((intake, index) => (
                      <span className="filter-button">{intake}</span>
                    ))}
                </div>
              </div>
              <div className="dashed-hr"></div>
              <div className="requirement-block">
                <h3 className="my-4">{eligibility?.requiredEducationlevel}</h3>
                {eligibility?.requiredResultInPercentage && (
                  <div>
                    <h4>Academic Qualification</h4>
                    <ul>
                      <li>{eligibility?.requiredResultInPercentage}</li>
                    </ul>
                  </div>
                )}
              </div>
              {eligibility?.englishLanguages?.length > 0 && (
                <div className="requirement-block">
                  <h4>English Language</h4>
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

          <Col xs={12} sm={5} className="quickview-right">
            <div className="d-flex align-items-center my-4">
              <img
                className="h-48px w-48px mr-2"
                src={
                  "https://localtest.uapp.uk/" +
                  quickViewData?.universityLogoUrl
                }
                alt=""
              />
              <div className="d-flex flex-column">
                <span className="fw-600 fs-14px">
                  {quickViewData?.universityName}
                </span>
                <span className="fw-400 fs-12px">
                  {quickViewData?.campusNames?.split(",")[0].trim()}
                </span>
              </div>
            </div>
            <div className="dashed-hr"></div>
            <div className="d-flex align-items-center my-4">
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
                <div className="w-150px">
                  <div className="d-flex justify-content-between min-vw-75">
                    Home/UK: <span>£{quickViewData?.localTutionFee}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    EU/EEU: <span>£{quickViewData?.eU_TutionFee}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    International:{" "}
                    <span>£{quickViewData?.internationalTutionFee}</span>
                  </div>
                </div>
              </div>
            </div>
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
                  <li>10% or £5000</li>
                </ul>
              </div>
            </div>
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
                  <li>£{quickViewData?.avarageApplicationFee}</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        <div className="quickview-footer">
          <div className="footer-tag">
            <div>
              <VscFeedback className="mr-2" />
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
            <div>
              <FaPeopleGroup className="mr-2" />
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
            <div>
              <CiTimer className="mr-2" />
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
            <div>
              <CiBag1 className="mr-2" />
              Deposit{" "}
            </div>
            <div className="footer-tag__content">
              <ul>
                <li>£{quickViewData?.depositFee}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="view-more-container">
          <button className="view-more-btn">View More</button>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
