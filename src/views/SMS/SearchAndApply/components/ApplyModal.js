import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { Col, Row } from "reactstrap";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
import mortarboard from "../../../../assets/icon/mortarboard-02.svg";
import Tuition from "../../../../assets/icon/Tuition Fees Icon Container.svg";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import "../SearchAndApply.css";

const ApplyModal = ({ open, onClose }) => {
  const [programCard, setProgramCard] = React.useState(false);
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
          <div>
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
              Duration <strong>4 Years</strong>
            </div>
          </div>
        </Row>

        <Row className="program-modal__requirements">
          <div className="px-4">
            <div className="program-modal__eligibility">
              <div className="program-modal__badge">You are eligible</div>
              <div className="cursor-pointer" onClick={handleHideProgramCard}>
                Hide
              </div>
            </div>
          </div>
          {programCard && (
            <div className="program-modal__card">
              <div>
                <h4>Admission Requirements</h4>
                <ul>
                  <li> Previous Education: 3 Years Bachelor Degree</li>
                  <li> Results: 50% Marks</li>
                  <li> Test Score: IELTS overall 6.5 and 5.5 each band</li>
                  <li> GRE: 300 (and no minimum individual score)</li>
                  <li> GMAT: 700</li>
                </ul>
              </div>
              <div>
                <div>
                  <h4>Student Qualification</h4>
                  <ul>
                    <li> Highest Education Level: 3 Years bachelor (Degree)</li>
                    <li> Result: 50%</li>
                    <li>
                      IELTS Score: IELTS 7.5 (or IELTS Equivalent 6.5
                      (Duolingo))
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Row>

        {/* Dropdown & Selects */}
        <Row className="d-flex flex-column my-4">
          <div className="fs-14px d-flex mt-3">
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
              <input type="radio" name="mode" /> Part-Time
            </label>
            <label>
              <input type="radio" name="mode" /> Full-Time
            </label>
          </div>
        </Row>

        <Row className="program-modal__form-group">
          <label>Delivery Pattern</label>
          <div className="program-modal__radio-group">
            <label>
              <input type="radio" name="mode" /> Online
            </label>
            <label>
              <input type="radio" name="mode" /> On-Campus
            </label>
            <label>
              <input type="radio" name="mode" /> Hybrid
            </label>
          </div>
        </Row>

        <Row className="program-modal__form-group">
          <label>Delivery Schedule</label>
          <div className="program-modal__checkbox-group">
            <label>
              <input type="radio" /> Standard
            </label>
            <label>
              <input type="radio" /> Evening
            </label>
            <label>
              <input type="radio" /> Flexible
            </label>
            <label>
              <input type="radio" /> Weekend
            </label>
            <label>
              <input type="radio" /> Evening + Weekend
            </label>
          </div>
        </Row>

        {/* Footer */}
        <Row className="program-modal__confirmation">
          <label>
            <input type="checkbox" className="mr-2" />
            Are you sure you want to apply this program?
          </label>
        </Row>
        <div className="p-1 color-#FFF1E6">
          You can apply maximum 3 applications at a time for free.
        </div>

        <div className="program-modal__footer">
          <button className="program-modal__cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="apply-btn">Apply →</button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplyModal;
