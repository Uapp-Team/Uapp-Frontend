import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { rootUrl } from "../../../constants/constants";

const UniversityHead = ({ info }) => {
  return (
    <div className="custom-card-border p-4 mb-24px">
      <Row>
        <Col md={10} className="py-2">
          <div className="d-flex justify-content-start">
            <div className="justify-content-start pr-3">
              <img
                src={rootUrl + info?.logo}
                className="search-img-style"
                alt="logo-img"
              />
            </div>

            <div className="justify-content-start">
              <Link to={`/universityDetails/${info?.universityId}`}>
                <span className="university-title-style mb-10px">
                  {info?.name}
                </span>
              </Link>
              <br />
              <span className="d-flex justify-content-start align-items-center">
                <i className="fas fa-location-dot text-gray fs-16px pr-2"></i>
                <span className="university-span-style">{info?.address}</span>
              </span>
            </div>
          </div>
        </Col>

        <Col md={2} className="py-2">
          <div className="d-flex justify-content-end align-items-end">
            <span className="university-span-provider">
              {info?.providerName}
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityHead;
