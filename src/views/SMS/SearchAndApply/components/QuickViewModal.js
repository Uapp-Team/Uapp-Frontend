import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";
import "../SearchAndApply.css";

const QuickViewModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={900}>
      <div className="quickview-container">
        <div className="quickview-header">
          <div>
            <h2 className="quickview-title">
              BMus (Hons) Popular Music Performance – Guitar, Bass, Drums,
              Keyboards and Vocals
            </h2>
            <div className="quickview-meta">
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
            </div>
          </div>
          <Button type="primary" className="apply-now-btn">
            Apply Now
          </Button>
        </div>

        <div className="quickview-content">
          <div className="quickview-left">
            <h3>Requirements (Bachelor’s)</h3>
            <div className="requirement-block">
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
            <div className="university-info">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Bournemouth_University_logo.svg/2560px-Bournemouth_University_logo.svg.png"
                alt="University Logo"
                className="uni-logo"
              />
              <p className="uni-name">Bournemouth University</p>
              <p className="uni-location">
                Bournemouth, England, United Kingdom
              </p>
              <p className="uni-stats">30% Worldwide</p>
            </div>

            <div className="info-group">
              <span className="info-title">Campus Location</span>
              <p>Greater London, UK</p>
              <p>Greater London, UK</p>
              <p>Greater London, UK</p>
              <p>Greater London, UK</p>
            </div>

            <div className="info-group">
              <span className="info-title">Tuition Fees</span>
              <p>Home/UK: £28,640</p>
              <p>EU/EEU: £28,640</p>
              <p>International: £28,640</p>
            </div>

            <div className="info-group">
              <span className="info-title">Scholarship</span>
              <p>10% or £5000</p>
            </div>

            <div className="info-group">
              <span className="info-title">Application Fee</span>
              <p>£00 GBP</p>
            </div>
          </div>
        </div>

        <div className="quickview-footer">
          <div className="footer-tag">
            Delivery Pattern <b>On-campus</b>
          </div>
          <div className="footer-tag">
            Study Mode <b>Full-time</b>
          </div>
          <div className="footer-tag">
            Delivery Schedule <b>Standard</b>
          </div>
          <div className="footer-tag">
            Deposit <b>£5,640</b>
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
