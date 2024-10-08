import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import get from "../../../../../helpers/get";
import starimg from "../../../../../assets/img/starimg.svg";

const ProfileRatingsBreakdown = ({ id }) => {
  const [info, setInfo] = useState({});
  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (id !== undefined) {
      get(`ConsultantProfile/ConsultantRating/${id}`).then((res) => {
        console.log(res);
        setInfo(res);
      });
    } else {
      get(`ConsultantProfile/ConsultantRating/${userId}`).then((res) => {
        console.log(res);
        setInfo(res);
      });
    }
  }, []);

  return (
    <div>
      {info == null ? null : (
        <Card>
          <CardBody>
            <div>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#707070",
                }}
              >
                Rating Breakdown
              </span>
            </div>
            <hr />
            <div className="row">
              <div className="col-9">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#878A99",
                  }}
                >
                  Recommend to a friend{" "}
                </p>
              </div>
              <div className="col-3">
                <img src={starimg} className="img-fluid" alt="" />
                <span
                  style={{
                    position: "relative",
                    top: "3.5px",
                    marginLeft: "5px",
                    color: "#ffb33e",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {info?.recommendToOthers}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#878A99",
                  }}
                >
                  Helpful and informative{" "}
                </p>
              </div>
              <div className="col-3">
                <img src={starimg} className="img-fluid" alt="" />
                <span
                  style={{
                    position: "relative",
                    top: "3.5px",
                    marginLeft: "5px",
                    color: "#ffb33e",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {info?.informative}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#878A99",
                  }}
                >
                  Consultant communication level{" "}
                </p>
              </div>
              <div className="col-3">
                <img src={starimg} className="img-fluid" alt="" />
                <span
                  style={{
                    position: "relative",
                    top: "3.5px",
                    marginLeft: "5px",
                    color: "#ffb33e",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {info?.communication}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#878A99",
                  }}
                >
                  Helpful{" "}
                </p>
              </div>
              <div className="col-3">
                <img src={starimg} className="img-fluid" alt="" />
                <span
                  style={{
                    position: "relative",
                    top: "3.5px",
                    marginLeft: "5px",
                    color: "#ffb33e",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {info?.friendlyAndHelpful}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ProfileRatingsBreakdown;
