import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import { userTypes } from "../../../../../constants/userTypeConstant";

const CountingCards = ({ id }) => {
  const userTypeId = localStorage.getItem("userType");
  const [count, setCount] = useState({});
  const [intake, setIntake] = useState({});

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
    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, [id]);

  return (
    <>
      <div className="custom-card-border pt-4 px-4 mb-30px">
        <p className="text-right">{intake?.intakeName}</p>
        <Row>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="Total Application"
              value={count?.totalApplication}
              link={`/applicationsFromConsultant/${id}/${intake?.id}`}
              bgColor="#E1F5FC"
              borderColor="#24A1CD"
              secondValue={count?.totalApplicant}
              secondColor="#176682"
              secondBgColor="#BAE7F7"
            />
          </Col>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="Applications in Process"
              value={count?.totalApplicationInProgress}
              // link={`/applicationsFromConsultantProfile/${id}/${5}/${1}/${
              //   intake?.id
              // }`}
              bgColor="#FBF5E8"
              borderColor="#FFBA08"
            />
          </Col>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="Unconditional Offer"
              value={count?.totalUnconditionalOffer}
              link={`/applicationsFromConsultantProfile/${id}/${9}/${0}/${
                intake?.id
              }`}
              bgColor="#F8F3FF"
              borderColor="#AE75F8"
              secondValue={count?.totalUnconditionalStudent}
              secondColor="#451782"
              secondBgColor="#E3D1FA"
            />
          </Col>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="Total Registered"
              value={count?.totalRegistered}
              link={`/applicationsFromConsultantProfile/${id}/${12}/${38}/${
                intake?.id
              }`}
              bgColor="#F0FFE0"
              borderColor="#70E000"
            />
          </Col>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="Total Rejected / cancelled"
              value={count?.totalRejected}
              // link={`/applicationsFromConsultantProfile/${id}/${12}/${1}/${
              //   intake?.id
              // }`}
              bgColor="#FEF6F5"
              borderColor="#F87675"
            />
          </Col>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="Conversion Rate"
              value={`${count?.conversionRate}%`}
              bgColor="#FDF5E7"
              borderColor="#9E6F21"
            />
          </Col>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="Withdrawn Applications"
              value={`${count?.withdrawApplications}`}
              link={`/applicationsFromConsultantProfile/${id}/${12}/${41}/${
                intake?.id
              }`}
              bgColor="#FDF5E7"
              borderColor="#9E6F21"
            />
          </Col>
          <Col lg={3} sm={6} className="pb-4">
            <DashboardCount
              title="My Teams"
              value={`${count?.myTeams}`}
              link={
                userTypeId !== userTypes?.Consultant
                  ? `/associates/${id}`
                  : `/associateList`
              }
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
