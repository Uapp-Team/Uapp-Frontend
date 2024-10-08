import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import get from "../../../../../../helpers/get";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddButton from "../../../../../../components/buttons/AddButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const AssignedSubjects = ({ officerId, headData, setHeadData }) => {
  const [appData, setAppData] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (officerId !== undefined) {
      get(`AdmissionOfficerProfile/AssignedSubject/${officerId}`).then(
        (res) => {
          console.log("subject", res);
          setAppData(res);
        }
      );
    } else {
      get(`AdmissionOfficerProfile/AssignedSubject/${userId}`).then((res) => {
        console.log("subject", res);
        setAppData(res);
      });
    }
  }, [officerId, userId]);
  return (
    <>
      <Card className="p-4">
        <div className="d-flex justify-content-between">
          <span className="app-style-const">Assigned Courses</span>
          {permissions?.includes(
            permissionList.AdmissionOfficer_Assign_Subject
          ) ? (
            <Link to={`/admissionOfficerAssignedSubjects/${officerId}`}>
              <AddButton className="mb-1" />
            </Link>
          ) : null}
        </div>

        {appData?.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Assigned Courses Found
          </p>
        ) : (
          <>
            <Table borderless responsive>
              <thead className="tablehead">
                <th className="border-0">SL/NO</th>
                <th className="border-0">Course</th>
                <th className="border-0">University</th>
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
                    <td className="border-0">{i + 1}</td>
                    <td className="border-0">
                      <Link
                        className="text-body"
                        to={`/subjectProfile/${item?.subjectId}`}
                      >
                        {item?.subjectName}
                      </Link>
                    </td>
                    <td className="border-0">
                      <Link
                        className="text-body"
                        to={`/universityDetails/${item?.universityId}`}
                      >
                        {item?.universityFullName} ({item?.universityShortName})
                      </Link>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link
              to={`/admissionOfficerAssignedSubjects/${officerId}`}
              className="text-center"
              style={{ color: "#1E98B0" }}
            >
              See All
            </Link>
          </>
        )}
      </Card>
    </>
  );
};

export default AssignedSubjects;
