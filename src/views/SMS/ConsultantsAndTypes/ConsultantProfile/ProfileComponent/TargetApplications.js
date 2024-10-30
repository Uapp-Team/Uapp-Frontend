import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";
import { useLocation } from "react-router-dom";
import get from "../../../../../helpers/get";

const TargetApplications = ({ id }) => {
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[1];
  const [applications, setApplications] = useState({});
  useEffect(() => {
    get(`ConsultantDashboard/TargetOverview?id=${id}`).then((res) => {
      setApplications(res);
    });
  }, [id]);

  const calculatePercent =
    (applications?.currentApplication / applications?.targetApplication) * 100;

  return (
    <>
      <div
        className={`custom-card-border relative ${
          currentLocation === "consultantProfile" ? "mb-30px" : "h-100"
        }`}
      >
        <h5 className="pt-4 px-4">Target Applications</h5>
        <hr />
        <div className="p-4 my-5">
          <span className="text-gray d-flex justify-content-between">
            <span>0</span>
            <span>{applications?.targetApplication}</span>
          </span>
          <Progress
            value={calculatePercent}
            color="green"
            style={{ marginBottom: "0" }}
          />
          <i
            className="fas fa-caret-up text-green"
            style={{
              position: "relative",
              left: `calc(${calculatePercent}% - 10px)`,
              fontSize: "xx-large",
            }}
          ></i>
          <h3 className="text-center">{applications?.currentApplication}</h3>
          <p className="text-center text-gray-70 mb-5">Total Application</p>
        </div>
        <div className="target-app-footer text-center bg-green text-white pt-3">
          <h3 className="text-white">{applications?.targetApplication}</h3>
          <p>Target Applications</p>
        </div>
      </div>
    </>
  );
};

export default TargetApplications;
