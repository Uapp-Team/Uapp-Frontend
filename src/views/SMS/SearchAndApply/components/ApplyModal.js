import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { CiTimer } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { Col, Row } from "reactstrap";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
import mortarboard from "../../../../assets/icon/mortarboard-02.svg";
import Tuition from "../../../../assets/icon/Tuition Fees Icon Container.svg";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import "../SearchAndApply.css";

const ApplyModal = ({ open, onClose, applyEligibility }) => {
  const [programCard, setProgramCard] = React.useState(true);
  const handleHideProgramCard = () => {
    setProgramCard(!programCard);
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Apply For New Application"
      footer={null}
    >
      <div className="apply-modal">
        <Row className="apply-modal-card">
          <div className="apply-modal__header">
            <img
              className="h-48px w-48px mr-2"
              src={"https://localtest.uapp.uk/"}
              alt=""
            />
            <div className="d-flex flex-column">
              <span className="fw-600 fs-14px">Bournemouth University</span>
              <span className="fw-400 fs-12px">
                Bournemouth, England, United Kingdom
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Row className="apply-modal-details">
              <Col xs={4} md={2} className="apply-modal-details__title">
                Course
              </Col>
              <Col xs={8} md={10} className="fw-600">
                BMus (Hons) Popular Music Performance – Guitar, Bass, Drums,
                Keyboards and Vocals
              </Col>
            </Row>
            <Row className="apply-modal-details">
              <Col xs={4} md={2} className="apply-modal-details__title">
                Student
              </Col>
              <Col xs={8} md={10}>
                Rakib Hasan
              </Col>
            </Row>
            <Row className="apply-modal-details">
              <Col xs={4} md={2} className="apply-modal-details__title">
                Intake{" "}
                <InfoCircleOutlined
                  style={{
                    fontSize: "12px",
                    color: "#5D5D5D",
                    cursor: "pointer",
                  }}
                />
              </Col>
              <Col xs={8} md={10}>
                June 2025
              </Col>
            </Row>
            <div className="dashed-hr"></div>
          </div>
          <div className="apply-modal-study">
            <div className="apply-modal-study__info">
              <img className="h-24px w-24px " src={Tuition} alt="" />
              <div className="fs-12px">Tution fees</div>
              <div className="fs-14px">£28,640</div>
            </div>
            <div className="apply-modal-study__info">
              <img className="h-24px w-24px" src={mortarboard} alt="" />
              <div className="fs-12px">Scholarship</div>
              <div className="fs-14px">10% or £5000</div>
            </div>
            <div className="apply-modal-study__info">
              <img className="h-24px w-24px " src={Application} alt="" />
              <div className="fs-12px">Application fees</div>
              <div className="fs-14px">£28,640</div>
            </div>
          </div>
          <div className="dashed-hr"></div>
          <div className="program-modal__info">
            <div className="program-modal__deadline">
              Application deadline <strong>10 Feb, 2025</strong>
            </div>
            <div className="program-modal__start">
              Course Start Date <strong>25 Mar 2025</strong>
            </div>
            <div className="program-modal__duration">
              <CiTimer className="mr-2" />
              Duration <strong className="ml-2">4 Years</strong>
            </div>
          </div>
        </Row>

        <Row className="program-modal__requirements">
          <div className="px-4">
            <div className="program-modal__eligibility">
              <div className="program-modal__badge">You are eligible</div>
              <div className="cursor-pointer" onClick={handleHideProgramCard}>
                Hide {programCard ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
          </div>
          {programCard && (
            <div className="program-modal__card">
              <div className="program-modal__list">
                <h4>Admission Requirements</h4>
                {applyEligibility?.admissionRequirements?.length > 0 ? (
                  applyEligibility?.admissionRequirements?.map(
                    (item, index) => (
                      <ul key={index}>
                        <li>
                          {item?.isEligible === true ? (
                            <IoCheckmark
                              fill="green"
                              color="green"
                              className="mr-2"
                            />
                          ) : (
                            <RxCross1 fill="red" color="red" className="mr-2" />
                          )}
                          {item?.details}
                        </li>
                      </ul>
                    )
                  )
                ) : (
                  <ul>
                    <li>No Required qualification</li>
                  </ul>
                )}
              </div>
              <div>
                <div>
                  <h4>Student Qualification</h4>
                  {applyEligibility?.studentQualifications?.length > 0 ? (
                    applyEligibility?.studentQualifications?.map(
                      (item, index) => (
                        <ul key={index}>
                          <li>
                            {item?.isEligible === true ? (
                              <IoCheckmark
                                fill="green"
                                color="green"
                                className="mr-2"
                              />
                            ) : (
                              <RxCross1
                                fill="red"
                                color="red"
                                className="mr-2"
                              />
                            )}
                            {item}
                          </li>
                        </ul>
                      )
                    )
                  ) : (
                    <ul>
                      {" "}
                      <li>No Required qualification</li>{" "}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </Row>

        {/* Dropdown & Selects */}
        <Row className="program-modal__intake my-3">
          <div className="fs-14px d-flex">
            <SlCalender className="mr-2 mt-1" />
            <p>Intake</p>
          </div>
          <div className="d-flex flex-wrap">
            <span className="filter-button">April 2025</span>
          </div>
        </Row>

        <Row className="program-modal__form-group">
          <label htmlFor="campus">Campus City</label>
          <DefaultDropdown />
        </Row>

        <Row className="program-modal__form-group">
          <label>Study Mode</label>
          <div className="program-modal__radio-group">
            <label>
              <input type="radio" name="mode" /> <span>Part-Time</span>
            </label>
            <label>
              <input type="radio" name="mode" /> <span>Full-Time</span>
            </label>
          </div>
        </Row>

        <Row className="program-modal__form-group">
          <label>Delivery Pattern</label>
          <div className="program-modal__radio-group">
            <label>
              <input type="radio" name="mode" /> <span>Online</span>
            </label>
            <label>
              <input type="radio" name="mode" /> <span>On-Campus</span>
            </label>
            <label>
              <input type="radio" name="mode" /> <span>Hybrid</span>
            </label>
          </div>
        </Row>

        <Row className="program-modal__form-group">
          <label>Delivery Schedule</label>
          <div className="program-modal__radio-group">
            <label>
              <input type="radio" name="deliverySchedule" />
              <span>Standard </span>
            </label>
            <label>
              <input type="radio" name="deliverySchedule" />{" "}
              <span>Evening</span>
            </label>
            <label>
              <input type="radio" name="deliverySchedule" />{" "}
              <span>Flexible</span>
            </label>
            <label>
              <input type="radio" name="deliverySchedule" />{" "}
              <span>Weekend</span>
            </label>
            <label>
              <input type="radio" name="deliverySchedule" />{" "}
              <span>Evening + Weekend</span>
            </label>
          </div>
        </Row>

        {/* Footer */}
        <Row className="program-modal__confirmation mb-3">
          <label>
            <input type="checkbox" className="mr-2" />
            Are you sure you want to apply this program?
          </label>
        </Row>
        <Row className="program-condition">
          <p className="pl-2">
            You can apply maximum 3 applications at a time for free.
          </p>
        </Row>

        <Row className="program-modal__footer">
          <button className="program-modal__cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="apply-btn">Apply →</button>
        </Row>
      </div>
    </Modal>
  );
};

export default ApplyModal;
