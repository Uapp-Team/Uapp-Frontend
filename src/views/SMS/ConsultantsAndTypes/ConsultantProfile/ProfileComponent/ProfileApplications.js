import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import user from "../../../../../assets/img/Uapp_fav.png";
import { Card, CardBody, Table } from "reactstrap";
import { rootUrl } from "../../../../../constants/constants";
import { useHistory } from "react-router-dom";

const ProfileApplications = ({ id }) => {
  const [appData, setAppData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    get(`ConsultantProfile/GetApplication/${id}`).then((res) => {
      console.log(res);
      // setAppData(res);
    });
  }, [id]);

  console.log(appData);

  return (
    <div>
      <Card>
        <CardBody>
          {/* <span className="app-style-const">New Applications</span> */}
          <h5>New Applications</h5>
          <div style={{ height: "300px" }}>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  <th>Application ID</th>
                  <th>Applicant</th>
                  <th>University</th>
                  <th>Intake</th>
                  <th>Application Date</th>
                </tr>
              </thead>
              <tbody style={{ overflowY: "scroll" }}>
                {appData?.map((app, i) => (
                  <tr
                    key={i}
                    style={{
                      fontSize: "13px",
                      fontWeight: "400",
                      color: "#495057",
                    }}
                  >
                    <td className="cursor-pointer hyperlink-hover">
                      <span
                        onClick={() => {
                          history.push(
                            `/applicationDetails/${app?.id}/${app?.studentId}`
                          );
                        }}
                      >
                        {app?.applicationViewId}
                      </span>
                    </td>

                    <td className="cursor-pointer hyperlink-hover">
                      <div>
                        <img
                          src={
                            app?.studentImage == null
                              ? user
                              : rootUrl + app?.studentImage
                          }
                          alt=""
                          style={{
                            height: "28px",
                            width: "28px",
                            borderRadius: "50%",
                          }}
                          className="img-fluid"
                        />
                        <span
                          onClick={() => {
                            history.push(`/studentProfile/${app?.studentId}`);
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          {app?.studentName}
                        </span>
                      </div>
                    </td>
                    <td>{app?.universityName}</td>

                    <td>{app?.intakeName}</td>
                    <td>{app?.ApplicationDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {appData?.length > 0 ? (
            <div className="mt-4 text-center">
              <span
                style={{
                  color: "#1e98b0",
                  textDecoration: "underline",
                  textDecorationColor: "#1e98b0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push(`/applicationsFromConsultant/${id}`);
                }}
              >
                See All
              </span>
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileApplications;
