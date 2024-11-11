import React from "react";
import { Col, Row } from "reactstrap";
import DashboardCount from "../../../../../components/ui/DashboardCount";

const CountingCards = ({ id, count, setCount }) => {
  return (
    <>
      <div className="custom-card-border pt-4 px-4 mb-30px">
        <Row>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Invited"
              value={count?.invited}
              bgColor="#E1F5FC"
              borderColor="#24A1CD"
              link="/companion-Invitation"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="No Response "
              value={count?.notResponsed}
              bgColor="#FEF6F5"
              borderColor="#F87675"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Responsed"
              value={count?.responsed}
              bgColor="#E8FAF5"
              borderColor="#5B9A8B"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="In Process"
              value={count?.inProgress}
              bgColor="#FBF5E8"
              borderColor="#FFBA08"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Processed"
              value={count?.processed}
              bgColor="#F0FFE0"
              borderColor="#70E000"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Conversion Rate"
              value={`${count?.conversionRate}%`}
              bgColor="#FDF5E7"
              borderColor="#9E6F21"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CountingCards;
