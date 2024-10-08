import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import get from "../../../../../helpers/get";
import olivelight from "../../../../../assets/img/olivelight.svg";
import violetlight from "../../../../../assets/img/violetlight.svg";
import blueLight from "../../../../../assets/img/blueLight.svg";

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
  }, []);

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

          <div className="mt-4 row ml-md-1 ml-2">
            <div className="col-md-4 blueLight-bg d-flex flex-column justify-content-center">
              <div className="row text-white">
                <div className="col-md-6">
                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    Total Application added
                  </span>
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <span style={{ fontSize: "22px", fontWeight: "500" }}>
                    {data?.applicationCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 oliveLight-bg d-flex flex-column justify-content-center">
              <div className="row text-white">
                <div className="col-md-6">
                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    Total Application submitted
                  </span>
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <span style={{ fontSize: "22px", fontWeight: "500" }}>
                    {data?.applicationSubmitted}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 violetLight-bg d-flex flex-column justify-content-center">
              <div className="row text-white">
                <div className="col-md-6">
                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    Total Application Completed
                  </span>
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <span style={{ fontSize: "22px", fontWeight: "500" }}>
                    {data?.applicationCompleted}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
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
