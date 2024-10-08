import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Button, Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import tick from "../../../../../../assets/img/tick.svg";

export default function ApplicationList({ referenceId }) {
  const [applicationInfo, setApplicationInfo] = useState([]);
  const history = useHistory();
  useEffect(() => {
    get(`StudentApplication/Index/${referenceId}`).then((res) => {
      setApplicationInfo(res);
    });
  }, [referenceId]);
  const gotoApplicationDetails = (id) => {
    history.push(`/applicationDetails/${id}/${referenceId}`);
  };
  return (
    <div>
      {applicationInfo.map((appinfo) => (
        <div style={{ position: "relative", top: "-20px" }}>
          <div className="px-4 progress-card-style-std-dashboard">
            <div class="stepper-wrapper">
              {appinfo?.timeLines.map((timeline) => (
                <div
                  class={`stepper-item ${
                    timeline?.isCompleted || timeline?.isCurrent
                      ? "completed"
                      : ""
                  }`}
                >
                  <div class="step-counter">
                    <img src={tick} className="img-fluid" />
                  </div>
                  <div className="text-center text-timeline-status">
                    {timeline?.statusName}
                  </div>
                  {timeline?.isCurrent && (
                    <div className="text-center text-timeline-substatus">
                      {timeline?.subStatusName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardBody>
              <div
                className="row"
                style={{ height: "105px", marginTop: "30px" }}
              >
                <div className="col-md-2">
                  <span className="std-dashboard-style7">APP ID</span>{" "}
                  <div className="mt-2">
                    <span
                      className="std-dashboard-style8"
                      onClick={gotoApplicationDetails}
                      style={{ cursor: "pointer" }}
                    >
                      {appinfo?.studentViewId}
                    </span>
                  </div>
                </div>

                <div className="col-md-3">
                  <span className="std-dashboard-style7">Course</span>
                  <div className="mt-2">
                    <span className="std-dashboard-style9">
                      {appinfo?.subjectName}
                    </span>
                  </div>
                </div>

                <div className="col-md-3">
                  <span className="std-dashboard-style7">University</span>
                  <div className="mt-2">
                    <span className="std-dashboard-style9">
                      {appinfo?.universityName}
                    </span>
                  </div>
                </div>

                <div className="col-md-2">
                  <span className="std-dashboard-style7">Intake</span>
                  <div className="mt-2">
                    <span className="std-dashboard-style9">
                      {appinfo?.intake}
                    </span>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="d-flex justify-content-end">
                    <Button
                      color="primary"
                      style={{ position: "relative", top: "21px" }}
                      onClick={() =>
                        gotoApplicationDetails(appinfo?.applicationId)
                      }
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}
