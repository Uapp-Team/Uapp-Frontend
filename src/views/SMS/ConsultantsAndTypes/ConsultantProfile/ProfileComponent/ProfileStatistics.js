import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import DashboardCount from "../../../../../components/ui/DashboardCount";

const ProfileStatistics = ({ id }) => {
  const [data, setData] = useState({});
  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (id !== undefined) {
      get(`ConsultantProfile/GetStatics/${id}`).then((res) => {
        console.log(res);
        setData(res);
      });
    } else {
      get(`ConsultantProfile/GetStatics/${userId}`).then((res) => {
        console.log(res);
        setData(res);
      });
    }
  }, [id, userId]);

  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <span
              style={{ fontWeight: "500", fontSize: "20px", color: "495057" }}
            >
              Overall statistics
            </span>

            <span
              style={{ fontWeight: "500", fontSize: "14px", color: "495057" }}
            >
              Registration date to till now
            </span>
          </div>

          <Row className="mt-3">
            <Col lg={4} sm={6} className="pb-4">
              <DashboardCount
                title=" Total Application"
                value={data?.applicationCount}
                bgColor="#84EBFF"
                borderColor="#1E98B0"
              />
            </Col>
            <Col lg={4} sm={6} className="pb-4">
              <DashboardCount
                title=" Total Submitted"
                value={data?.applicationSubmitted}
                bgColor="#A0F9ED"
                borderColor="#23CCB5"
              />
            </Col>
            <Col lg={4} sm={12} className="pb-4">
              <DashboardCount
                title=" Total Completed"
                value={data?.applicationCompleted}
                bgColor="#D2DBFF"
                borderColor="#5C78E7"
              />
            </Col>
          </Row>

          <div className="mt-3">
            <span
              style={{ fontSize: "16px", fontWeight: "500", color: "#495057" }}
            >
              Application completion rate
            </span>{" "}
            {"  "}
            <span
              style={{ fontWeight: "700", fontSize: "24px", color: "#1e98b0" }}
            >
              {data?.applicationcomplitionRate}%
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileStatistics;
