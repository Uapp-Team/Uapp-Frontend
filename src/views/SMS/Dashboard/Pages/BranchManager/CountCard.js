import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import get from "../../../../../helpers/get";

const CountCard = ({ id }) => {
  const [count, setCount] = useState({});

  useEffect(() => {
    get(`BranchManagerDashboard/counting?id=${id}`).then((res) => {
      console.log(res);
      setCount(res);
    });
  }, [id]);

  return (
    <Row>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="Total Application"
          value={count?.totalApplication}
          link="/applications"
          bgColor="#E1F5FC"
          borderColor="#24A1CD"
        />
      </Col>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="Applications in Process"
          value={count?.totalApplicationInProgress}
          link={`/applicationsByStatus/${5}/${1}`}
          bgColor="#FBF5E8"
          borderColor="#FFBA08"
        />
      </Col>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="Unconditional Offer"
          value={count?.totalUnconditionalOffer}
          link={`/applicationsByStatus/${2}/${2}`}
          bgColor="#F8F3FF"
          borderColor="#AE75F8"
        />
      </Col>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="Total Registered"
          value={count?.totalRegistered}
          link={`/applicationsByStatus/${2}/${3}`}
          bgColor="#F0FFE0"
          borderColor="#70E000"
        />
      </Col>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="Total Rejected"
          value={count?.totalRejected}
          link={`/applicationsByStatus/${12}/${1}`}
          bgColor="#FEF6F5"
          borderColor="#F87675"
        />
      </Col>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="Withdrawn Application"
          value={count?.totalWithdrawn}
          link={`/applicationsByStatus/${4}/${3}`}
          bgColor="#EDF1F5"
          borderColor="#34495E"
        />
      </Col>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="New Consultants"
          value={count?.totalNewConsultant}
          bgColor="#E8FAF5"
          borderColor="#5B9A8B"
        />
      </Col>
      <Col md={3} xs={6} className="mb-30px">
        <DashboardCount
          title="Conversion Rate"
          value={`${count?.conversionRate}%`}
          bgColor="#FDF5E7"
          borderColor="#9E6F21"
        />
      </Col>
    </Row>
  );
};

export default CountCard;
