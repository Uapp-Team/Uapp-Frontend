import React from "react";
import { Card, CardBody } from "reactstrap";

const ApplicationRequirment = ({ data }) => {
  return (
    <div className="p-4" style={{ background: "#FFF7F0" }}>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <h5 className="admission-section-head">Level of Education</h5>
          <Card className="bg-orange admission-section-year">
            {data?.educationLevel}
          </Card>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12 text-md-center">
          <h5 className="admission-section-head">Required Result</h5>
          <Card className="mx-md-auto admission-section-result bg-orange">
            {data?.requireResult} %
          </Card>
        </div>
        {data?.eltScore && (
          <div className="col-lg-5 col-md-5 col-sm-12">
            <h5 className="admission-section-head">English requirement</h5>
            <h2 className="admission-section-ieltes">IELTS</h2>
            <div className="d-flex align-items-center">
              <span className="admission-section-ieltes-number">
                {data?.eltScore}
              </span>
              <span className="text-gray-70 fs-18px ml-2">
                {!data?.onlyIelts && "or equivalent"}
              </span>
            </div>
            <p className="text-gray-70">
              (If you have different test score ie, Duolingo, TOFEL or any other
              test, check the University website, for comparison)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationRequirment;
