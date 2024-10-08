import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import DashboardCount from "../../../../../components/ui/DashboardCount";

const CountingCards = ({ id }) => {
  const [count, setCount] = useState({});

  useEffect(() => {
    if (id) {
      get(`ConsultantDashboard/GetCards?id=${id}`).then((res) => {
        setCount(res);
      });
    } else {
      get(`ConsultantDashboard/GetCards`).then((res) => {
        setCount(res);
      });
    }
  }, [id]);

  return (
    <>
      <div className="custom-card-border pt-4 px-4 mb-30px">
        <Row>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Total Application"
              value={count?.totalApplication}
              link="/applications"
              bgColor="#E1F5FC"
              borderColor="#24A1CD"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Applications in Process"
              value={count?.totalApplicationInProgress}
              link={`/applicationsByStatus/${5}/${1}`}
              bgColor="#FBF5E8"
              borderColor="#FFBA08"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Unconditional Offer"
              value={count?.totalUnconditionalOffer}
              link={`/applicationsByStatus/${2}/${2}`}
              bgColor="#F8F3FF"
              borderColor="#AE75F8"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Total Registered"
              value={count?.totalRegistered}
              link={`/applicationsByStatus/${2}/${3}`}
              bgColor="#F0FFE0"
              borderColor="#70E000"
            />
          </Col>
          <Col lg={4} sm={6} className="pb-4">
            <DashboardCount
              title="Total Rejected"
              value={count?.totalRejected}
              link={`/applicationsByStatus/${12}/${1}`}
              bgColor="#FEF6F5"
              borderColor="#F87675"
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
