import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { Col, Row } from "reactstrap";
import Application from "../../../../assets/icon/Application Fee Icon.svg";
import mortarboard from "../../../../assets/icon/mortarboard-02.svg";
import Tuition from "../../../../assets/icon/Tuition Fees Icon Container.svg";
import "../SearchAndApply.css";

const ApplyModal = ({ open, onClose }) => {
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

          <Row xs={8} className="apply-modal-study">
            <Col xs={2} className="apply-modal-study__info">
              <img className="h-48px w-48px mr-2 my-1" src={Tuition} alt="" />
              <div className="fs-12px">Tution fees</div>
              <div className="fs-14px">£28,640</div>
            </Col>
            <Col xs={3} className="apply-modal-study__info">
              <img
                className="h-48px w-48px mr-2 my-1"
                src={mortarboard}
                alt=""
              />
              <div className="fs-12px">Scholarship</div>
              <div className="fs-14px">10% or £5000</div>
            </Col>
            <Col xs={3} className="apply-modal-study__info">
              <img
                className="h-48px w-48px mr-2 my-1"
                src={Application}
                alt=""
              />
              <div className="fs-12px">Application fees</div>
              <div className="fs-14px">£28,640</div>
            </Col>
          </Row>

          <div className="program-modal__info">
            <span className="program-modal__deadline">
              Application deadline <strong>10 Feb, 2025</strong>
            </span>
            <span className="program-modal__start">
              Course Start Date <strong>25 Mar 2025</strong>
            </span>
            <span className="program-modal__duration">
              Duration <strong>4 Years</strong>
            </span>
          </div>
        </Row>

        {/* Eligibility */}
        <div className="program-modal__eligibility">
          <span className="program-modal__badge">✅ You are eligible</span>
        </div>

        {/* Requirements Grid */}
        <div className="program-modal__requirements">
          <div className="program-modal__card">
            <h4>Admission Requirements</h4>
            <ul>
              <li>✅ Previous Education: 3 Years Bachelor Degree</li>
              <li>✅ Results: 50% Marks</li>
              <li>❌ Test Score: IELTS overall 6.5 and 5.5 each band</li>
              <li>❌ GRE: 300 (and no minimum individual score)</li>
              <li>✅ GMAT: 700</li>
            </ul>
          </div>

          <div className="program-modal__card">
            <h4>Student Qualification</h4>
            <ul>
              <li>✅ Highest Education Level: 3 Years bachelor (Degree)</li>
              <li>✅ Result: 50%</li>
              <li>
                ✅ IELTS Score: IELTS 7.5 (or IELTS Equivalent 6.5 (Duolingo))
              </li>
            </ul>
          </div>
        </div>

        {/* Dropdown & Selects */}
        <div className="program-modal__form-group">
          <label>Intakes</label>
          <div className="program-modal__chips">
            {[
              "April 2025",
              "May 2025",
              "June 2025",
              "September 2025",
              "January 2026",
              "February 2026",
            ].map((item) => (
              <span className="program-modal__chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="program-modal__form-group">
          <label htmlFor="campus">Campus City</label>
          <select id="campus" className="program-modal__select">
            <option value="">Select location</option>
            <option value="dhaka">Dhaka</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="ctg">Chittagong</option>
          </select>
        </div>

        <div className="program-modal__form-group">
          <label>Study Mode</label>
          <div className="program-modal__radio-group">
            <label>
              <input type="radio" name="mode" /> Part-Time
            </label>
            <label>
              <input type="radio" name="mode" /> Full-Time
            </label>
          </div>
        </div>

        <div className="program-modal__form-group">
          <label>Delivery Pattern</label>
          <div className="program-modal__radio-group">
            <label>
              <input type="radio" name="pattern" /> Online
            </label>
            <label>
              <input type="radio" name="pattern" /> On-Campus
            </label>
            <label>
              <input type="radio" name="pattern" /> Hybrid
            </label>
          </div>
        </div>

        <div className="program-modal__form-group">
          <label>Delivery Schedule</label>
          <div className="program-modal__checkbox-group">
            <label>
              <input type="checkbox" /> Standard
            </label>
            <label>
              <input type="checkbox" /> Evening
            </label>
            <label>
              <input type="checkbox" /> Flexible
            </label>
            <label>
              <input type="checkbox" /> Weekend
            </label>
            <label>
              <input type="checkbox" /> Evening + Weekend
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="program-modal__confirmation">
          <p>✅ Are you sure you want to apply this program?</p>
          <small>
            You can apply maximum 3 applications at a time for free.
          </small>
        </div>

        <div className="program-modal__footer">
          <button className="program-modal__cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="program-modal__apply">Apply →</button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplyModal;
