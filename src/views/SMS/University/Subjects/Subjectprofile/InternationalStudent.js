import React from "react";
import { Card, CardBody } from "reactstrap";

const InternationalStudent = () => {
  return (
    <div className="w-sm-75-90 mx-auto p-4 " style={{ background: "#FFF7F0" }}>
      <div className="row">
        <div className="col-lg-5 col-md-5 col-sm-12">
          <h5 className="mb-4" style={{ fontSize: 15 }}>
            Level of Education
          </h5>
          <Card style={{ background: "#FC7300" }}>
            <CardBody>
              <h6
                className="years"
                style={{ color: " #FFFFFF", fontWeight: 500 }}
              >
                3 years Bachelor degree, HSC, SSC
              </h6>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <h5 className="mb-4" style={{ fontSize: 15 }}>
            Required Result
          </h5>
          <Card className="result" style={{ background: "#FC7300" }}>
            <CardBody className="d-flex align-items-center">
              <h3
                className="text-center"
                style={{ paddingTop: 8, color: "#FFFFFF", fontWeight: 700 }}
              >
                50 %
              </h3>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <h5 className="mb-4" style={{ fontSize: 15 }}>
            English requirement
          </h5>
          <h2 style={{ color: "#FF2020", fontWeight: 700 }}>IELTS</h2>
          <div className="d-flex align-items-center">
            <span style={{ fontSize: 30, fontWeight: 700, marginRight: 10 }}>
              7.5
            </span>
            <h6
              className="equivalent"
              style={{ fontWeight: 400, marginTop: 7 }}
            >
              or equivalent
            </h6>
          </div>
          <p className="equivalent" style={{ fontSize: 10 }}>
            (If you have different test score ie, Duolingo, TOFEL or any other
            test, check the University website, for comparison)
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternationalStudent;
