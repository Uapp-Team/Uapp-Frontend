import React from "react";
import { Col, Row } from "reactstrap";

const ConsultantProgressReport = ({ progress, estimate }) => {
  return (
    <Row>
      <Col lg="4" className="">
        <div
          className="consultant-report-progress-card d-flex align-items-center"
          style={{
            background: "#F8FAFC",
          }}
        >
          <div
            className="consultant-report-progress-items"
            style={{ backgroundColor: "#24a1cd" }}
          ></div>
          <Row className="align-items-center w-100">
            <Col xs={8}>
              <p className="pl-3 mb-0"> TOTAL APPLICATION</p>
            </Col>
            <Col xs={4}>
              <h3 className="mb-0">{progress?.totalApplication}</h3>
            </Col>
          </Row>
        </div>

        <div
          className="consultant-report-progress-card d-flex align-items-center"
          style={{
            background: "rgba(35, 204, 181, 0.10)",
          }}
        >
          <div
            className="consultant-report-progress-items"
            style={{ backgroundColor: "#23CCB5" }}
          ></div>
          <Row className="align-items-center w-100">
            <Col xs={8}>
              <p className="pl-3 mb-0"> Submitted to University</p>
            </Col>
            <Col xs={4}>
              <h3 className="mb-0">{progress?.submittedToUniversity}</h3>
            </Col>
          </Row>
        </div>
        <div
          className="consultant-report-progress-card d-flex align-items-center"
          style={{
            background: "rgba(174, 117, 248, 0.10)",
          }}
        >
          <div
            className="consultant-report-progress-items"
            style={{ backgroundColor: "#AE75F8" }}
          ></div>
          <Row className="align-items-center w-100">
            <Col xs={8}>
              <p className="pl-3 mb-0"> Unconditional Offer</p>
            </Col>
            <Col xs={4}>
              <h3 className="mb-0">{progress?.unconditionalOffer}</h3>
            </Col>
          </Row>
        </div>
        <div
          className="consultant-report-progress-card d-flex align-items-center"
          style={{
            background: "rgba(112, 224, 0, 0.10)",
          }}
        >
          <div
            className="consultant-report-progress-items"
            style={{ backgroundColor: "#70E000" }}
          ></div>
          <Row className="align-items-center w-100">
            <Col xs={8}>
              <p className="pl-3 mb-0"> Total Registered</p>
            </Col>
            <Col xs={4}>
              <h3 className="mb-0">{progress?.totalRegistered}</h3>
            </Col>
          </Row>
        </div>
        <div
          className="consultant-report-progress-card d-flex align-items-center"
          style={{
            background: "rgba(248, 118, 117, 0.10)",
          }}
        >
          <div
            className="consultant-report-progress-items"
            style={{ backgroundColor: "#F87675" }}
          ></div>
          <Row className="align-items-center w-100">
            <Col xs={8}>
              <p className="pl-3 mb-0"> Total Rejected</p>
            </Col>
            <Col xs={4}>
              <h3 className="mb-0">{progress?.totalRejected}</h3>
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg="4" className="text-center p-5 my-4">
        <div className="d-flex justify-content-around">
          <div className="picChart" style={{ background: progress?.pathname }}>
            <div class="inner-round"></div>
          </div>
        </div>

        <div className="row mt-5">
          {progress?.rangeItems?.map((item, i) => (
            <div class="col-4 d-flex mb-2" key={i}>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "10px",
                  background: item.color,
                  marginRight: "10px",
                }}
              ></div>{" "}
              <span>{item.rangeName}</span>
            </div>
          ))}
        </div>
      </Col>
      <Col lg="4" className="my-md-5 py-md-5 d-flex justify-content-center">
        <div className="card-report-income">
          <div className="header">
            <h1 className="title">Estimated Income</h1>
          </div>
          <div className="body">
            <h1 className="amount">£ {progress?.consultantTotalAmount}</h1>
          </div>
          <div className="footer">
            <p className="intake">{estimate}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ConsultantProgressReport;
