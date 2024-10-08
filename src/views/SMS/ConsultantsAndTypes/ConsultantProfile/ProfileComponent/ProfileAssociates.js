import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import user from "../../../../../assets/img/Uapp_fav.png";
import { Card, CardBody, Table } from "reactstrap";
import { rootUrl } from "../../../../../constants/constants";
import { useHistory } from "react-router-dom";

const ProfileAssociates = ({ id }) => {
  const [appData, setAppData] = useState([]);
  const history = useHistory();
  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (id !== undefined) {
      get(`ConsultantProfile/GetAssociates/${id}`).then((res) => {
        console.log(res);
        setAppData(res);
      });
    } else {
      get(`ConsultantProfile/GetAssociates/${userId}`).then((res) => {
        console.log(res);
        setAppData(res);
      });
    }
  }, [id]);

  return (
    <div>
      <Card>
        <CardBody>
          <span className="app-style-const">New Associates</span>

          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  <th>UAPP ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Reg. Date</th>
                </tr>
              </thead>
              <tbody>
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
                          history.push(`/associateProfile/${app?.id}`);
                        }}
                      >
                        {app?.viewId}
                      </span>
                    </td>

                    <td className="cursor-pointer hyperlink-hover">
                      <div>
                        <img
                          src={
                            app?.profileImage == null
                              ? user
                              : rootUrl + app?.profileImage
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
                            history.push(`/associateProfile/${app?.id}`);
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          {app?.associateName}
                        </span>
                      </div>
                    </td>
                    <td>{app?.email}</td>
                    <td>{app?.phoneNumber}</td>

                    <td>{app?.createdOn}</td>
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
                  history.push(`/associates/${id}`);
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

export default ProfileAssociates;
