import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import OverviewData from "./OverviewData";
import get from "../../../../../../helpers/get";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Overview = ({ id }) => {
  const [data, setData] = useState();

  useEffect(() => {
    get(`ConsultantDashboard/DesignationOverview?id=${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

  return (
    <>
      {data && (
        <div className="custom-card-border p-4 mb-5">
          <h5 className="mb-0">Overview</h5>

          <Row>
            <Col md={6} lg={4} className="mb-30px">
              <div className="consultant-overview-card-current">
                <p className="fs-17px fw-600" style={{ color: "#045d5e" }}>
                  Current Stage
                </p>
                <p className="fs-20px fw-600">
                  {data?.currentDesignation.title}
                </p>
                <p className="text-gray">{data?.currentIntake}</p>
                <p className="consultant-overview-card-text">
                  To sustain current position you need to maintain following
                  conditions
                </p>
                <OverviewData
                  text="Student"
                  value={data?.currentDesignation.studentTarget}
                />
                <OverviewData
                  text="Consultant"
                  value={data?.currentDesignation.consultantTarget}
                />
                <OverviewData
                  text="Student from team"
                  value={data?.currentDesignation.teamTarget}
                />
                <br />
                <OverviewData
                  text="Team Bonus"
                  value={data?.currentDesignation.teamBonus}
                />
                <OverviewData
                  text="Default Commission"
                  value={data?.currentDesignation.defaultCommission}
                />
                <br />
                <Link
                  to={`/ConsultantDesignationHistory/${id}`}
                  className="consultant-overview-btn"
                >
                  View log
                </Link>
              </div>
            </Col>
            {data?.nextDesignation && (
              <Col md={6} lg={4} className="mb-30px">
                <div className="consultant-overview-card-others">
                  <p className="fs-17px fw-600" style={{ color: "#045d5e" }}>
                    Next Stage
                  </p>
                  <p className="fs-20px fw-600">
                    {data?.nextDesignation.title}
                  </p>
                  <p className="consultant-overview-card-text">
                    To obtain next position you need to fillup following
                    conditions
                  </p>
                  <OverviewData
                    text="Student"
                    value={data?.nextDesignation.studentTarget}
                  />
                  <OverviewData
                    text="Consultant"
                    value={data?.nextDesignation.consultantTarget}
                  />
                  <OverviewData
                    text="Student from team"
                    value={data?.nextDesignation.teamTarget}
                  />
                  <br />
                  <OverviewData
                    text="Team Bonus"
                    value={data?.nextDesignation.teamBonus}
                  />
                  <OverviewData
                    text="Default Commission"
                    value={data?.nextDesignation.defaultCommission}
                  />
                </div>
              </Col>
            )}
            <Col md={6} lg={4} className="mb-30px">
              <div className="consultant-overview-card-others">
                <p className="fs-17px fw-600" style={{ color: "#045d5e" }}>
                  Current Progress
                </p>
                <p className="fs-20px fw-600">{data?.currentOverview.title}</p>
                <p className="text-gray">{data?.currentIntake}</p>
                <p className="consultant-overview-card-text">
                  Progress according to the current designation
                </p>
                <OverviewData
                  text="Student"
                  value={data?.currentOverview.studentTarget}
                />
                <OverviewData
                  text="Consultant"
                  value={data?.currentOverview.consultantTarget}
                />
                <OverviewData
                  text="Student from team"
                  value={data?.currentOverview.teamTarget}
                />
                <br />
                <OverviewData
                  text="Team Bonus"
                  value={data?.currentOverview.teamBonus}
                />
                <OverviewData
                  text="Default Commission"
                  value={data?.currentOverview.defaultCommission}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Overview;
