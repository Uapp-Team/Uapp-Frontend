import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import get from "../../../../../../helpers/get";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddButton from "../../../../../../components/buttons/AddButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const AssignedUniversities = ({ officerId, headData, setHeadData }) => {
  const [appData, setAppData] = useState([]);
  const userId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    if (officerId !== undefined) {
      get(`AdmissionOfficerProfile/University/${officerId}`).then((res) => {
        console.log("university", res);
        setAppData(res);
      });
    } else {
      get(`AdmissionOfficerProfile/University/${userId}`).then((res) => {
        console.log(res);
        setAppData(res);
      });
    }
  }, [officerId, userId]);

  return (
    <div>
      <Card className="p-4">
        <div className="d-flex justify-content-between mb-1">
          <span className="app-style-const">Assigned Universities</span>
          {permissions?.includes(
            permissionList.AdmissionOfficer_Assign_University
          ) ? (
            <Link
              to={`/assignOfficerUniversity/${headData?.providerId}/${officerId}`}
            >
              <AddButton />
            </Link>
          ) : null}
        </div>

        {appData?.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Assigned Universities Found
          </p>
        ) : (
          <>
            <Table borderless responsive>
              <thead className="tablehead">
                {/* <th className="border-0">SL/NO</th> */}
                <th className="border-0">University</th>
                <th className="border-0">EU/EEU</th>
                <th className="border-0">Home/UK</th>
                <th className="border-0">International</th>
              </thead>
              <tbody>
                {appData?.map((item, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: "white",
                      borderBottom: "1px solid #dee2e6",
                    }}
                  >
                    {/* <td className="border-0">{i + 1}</td> */}
                    <td className="border-0">
                      <Link
                        className="text-body"
                        to={`/universityDetails/${item?.universityId}`}
                      >
                        {item?.university?.name} ({item?.university?.shortName})
                      </Link>
                    </td>
                    <td className="border-0">
                      {item?.isAcceptEU_UK === true ? "Yes" : "No"}
                    </td>
                    <td className="border-0">
                      {item?.isAcceptHome === true ? "Yes" : "No"}
                    </td>

                    <td className="border-0">
                      {item?.isAcceptInternational === true ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link
              to={`/assignOfficerUniversity/${headData?.providerId}/${officerId}`}
              className="text-center"
              style={{ color: "#1E98B0" }}
            >
              See All
            </Link>
          </>
        )}
      </Card>
    </div>
  );
};

export default AssignedUniversities;
