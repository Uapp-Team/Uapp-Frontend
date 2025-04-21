import { Modal } from "antd";
import React from "react";
import { CiTimer } from "react-icons/ci";
import { LuArrowUpRight, LuHeart, LuSettings2, LuShare2 } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import BellIcon from "../../../../assets/icon/Bell.svg";
import "../SearchAndApply.css";

const QuickViewModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Quick View">
      <div className="quickview-container">
        <div className="quickview-header">
          <div>
            <h2 className="quickview-title">
              BMus (Hons) Popular Music Performance – Guitar, Bass, Drums,
              Keyboards and Vocals
            </h2>
            {/* <div className="quickview-meta">
              <span>
                <CalendarOutlined /> 10 Feb, 25
              </span>
              <span className="dot">•</span>
              <span>
                Course Start Date <b>25 Mar 2025</b>
              </span>
              <span className="dot">•</span>
              <span>
                <ClockCircleOutlined /> Duration <b>4 Years</b>
              </span>
            </div>
            <div className="quickview-intake">
              <span>Intake:</span>
              <span className="intake-badge">April 2025</span>
              <span className="intake-badge">May 2025</span>
              <span className="intake-badge">June 2025</span>
            </div> */}
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="">
              <LuSettings2 className="mr-3 cursor-pointer" />
              <LuShare2 className="mr-3" />
              <LuHeart color="red" fill="red" className="cursor-pointer mr-3" />
              <LuArrowUpRight className="fs-20px" />
            </div>
            <button className="apply-btn">Apply Now</button>
          </div>
        </div>

        <div className="quickview-content">
          <span className="mb-3">
            <img src={BellIcon} alt="" /> 10 Feb, 25
          </span>
          <div className="mt-3">
            <p className="fs-14px">
              Course Start Date <span className="fw-600">25 Mar 2025</span>
            </p>
            <div className="d-flex align-items-center my-2">
              <CiTimer className="mr-2" />
              <div className="fs-14px">
                Duration <span className="fw-600">4 Years</span>
              </div>
            </div>
            <div className="my-4">
              <div className="fs-14px d-flex my-2">
                <SlCalender className="mr-2" />
                <p>Intake</p>
              </div>
              <span className="filter-button">May 2025</span>
            </div>
            <div className="dashed-hr"></div>
            <div className="requirement-block">
              <h3 className="my-4">Requirements (Bachelor’s)</h3>
              <h4>Academic Qualification</h4>
              <ul>
                <li>Minimum UCAS tariff points: 96–112</li>
                <li>
                  Equivalent Higher Secondary Certificate (HSC) or A-Level
                  results
                </li>
                <li>GPA of 4.0+ out of 5.0 in HSC or equivalent diploma</li>
              </ul>
            </div>
            <div className="requirement-block">
              <h4>English Language</h4>
              <ul>
                <li>IELTS 6.0 (no band below 5.5) or</li>
                <li>PTE Academic: 60 overall or</li>
                <li>
                  Medium of Instruction (MOI) letter + Internal English test
                </li>
              </ul>
            </div>
          </div>

          <div className="quickview-right">
            <div className="d-flex align-items-center my-4">
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

            <div className="d-flex align-items-center my-4">
              <img
                src={"https://localtest.uapp.uk/"}
                alt=""
                className="h-30px w-30px mr-2"
              />
              <div className="d-flex flex-column">
                <span className="fs-14px fw-600">#01</span>
                <span className="fs-12px">Global Rank</span>
              </div>
            </div>

            <div className="info-group">
              <img
                src={"https://localtest.uapp.uk/"}
                alt=""
                className="h-30px w-30px mr-2 mt-1"
              />
              <div>
                <span className="info-title">Campus Location</span>
                <ul>
                  <li>Greater London, UK</li>
                  <li>Greater London, UK</li>
                  <li>Greater London, UK</li>
                </ul>
              </div>
            </div>

            <div className="info-group">
              <img
                src={"https://localtest.uapp.uk/"}
                alt=""
                className="h-30px w-30px mr-2 mt-1"
              />
              <div>
                <span className="info-title">Tuition Fees</span>
                <ul>
                  <li>Home/UK: £28,640</li>
                  <li>EU/EEU: £28,640</li>
                  <li>International: £28,640</li>
                </ul>
              </div>
            </div>

            <div className="info-group">
              <img
                src={"https://localtest.uapp.uk/"}
                alt=""
                className="h-30px w-30px mr-2 mt-1"
              />
              <div>
                <span className="info-title">Scholarship</span>
                <ul>
                  <li>10% or £5000</li>
                </ul>
              </div>
            </div>

            <div className="info-group">
              <img
                src={"https://localtest.uapp.uk/"}
                alt=""
                className="h-30px w-30px mr-2 mt-1"
              />
              <div>
                <span className="info-title">Application Fee</span>
                <ul>
                  <li>£00 GBP</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="quickview-footer">
          <div className="footer-tag">
            <img
              src={"https://localtest.uapp.uk/"}
              alt=""
              className="h-30px w-30px mr-2 mt-1"
            />
            <div className="footer-tag__content">
              Delivery Pattern{" "}
              <ul>
                <li>Online</li>
              </ul>
            </div>
          </div>
          <div className="footer-tag">
            <img
              src={"https://localtest.uapp.uk/"}
              alt=""
              className="h-30px w-30px mr-2 mt-1"
            />
            <div className="footer-tag__content">
              Study Mode{" "}
              <ul>
                <li>Full-time</li>
              </ul>
            </div>
          </div>
          <div className="footer-tag">
            <img
              src={"https://localtest.uapp.uk/"}
              alt=""
              className="h-30px w-30px mr-2 mt-1"
            />
            <div className="footer-tag__content">
              Delivery Schedule{" "}
              <ul>
                <li>Standard</li>
              </ul>
            </div>
          </div>
          <div className="footer-tag">
            <img
              src={"https://localtest.uapp.uk/"}
              alt=""
              className="h-30px w-30px mr-2 mt-1"
            />
            <div className="footer-tag__content">
              Deposit{" "}
              <ul>
                <li>£5,640</li>
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
