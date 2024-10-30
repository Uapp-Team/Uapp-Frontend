import React, { useEffect, useState } from "react";
import "../../../../../../assets/scss/pages/dashboard-analytics.scss";
import get from "../../../../../../helpers/get";
import "../../../../../../assets/CoustomStyle/dashboard.css";
import { Col, Row } from "reactstrap";
import DashboardCount from "../../../../../../components/ui/DashboardCount";

const ProviderCountingCard = ({ id, intakeRngValue }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    get(`ProviderDashboard/Cards?id=${id}&rangeid=${intakeRngValue}`).then(
      (res) => {
        setData(res);
      }
    );
  }, [id, intakeRngValue]);

  return (
    <>
      <Row>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Application"
            value={data?.totalApplication}
            link={`/applicationsbyprovider/${id}/${intakeRngValue}`}
            bgColor="#E1F5FC"
            borderColor="#24A1CD"
            secondValue={data?.totalApplicant}
            secondColor="#176682"
            secondBgColor="#BAE7F7"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Universities"
            value={data?.universities}
            link={`/universityListFromProviderList/${id}`}
            bgColor="#F4F9E4"
            borderColor="#9CA777"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Admission Managers"
            value={data?.admissionManagers}
            link={`/admissionManagerList/${id}`}
            bgColor="#DDFBFF"
            borderColor="#24A1CD"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Admission Officers"
            value={data?.admissionOfficers}
            link={`/admissionOfficerListbyProvider/${id}`}
            bgColor="#FEF7F2"
            borderColor="#C38154"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Courses"
            value={data?.totalCourse}
            bgColor="#FFF1EB"
            borderColor="#FC4F00"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Conversion Rate"
            value={`${data?.converstionRate}%`}
            bgColor="#FDF5E7"
            borderColor="#9E6F21"
          />
        </Col>
      </Row>
    </>
  );
};

export default ProviderCountingCard;
