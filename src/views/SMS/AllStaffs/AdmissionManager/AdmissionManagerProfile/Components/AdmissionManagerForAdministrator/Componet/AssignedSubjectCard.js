import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import get from "../../../../../../../../helpers/get";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddButton from "../../../../../../../../components/buttons/AddButton";
import { permissionList } from "../../../../../../../../constants/AuthorizationConstant";

const AssignedSubjectCard = ({ admissionManagerId }) => {
  const userId = localStorage.getItem("referenceId");
  const [data, setData] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    if (admissionManagerId == undefined) {
      get(`AddmissionManagerProfile/AssignedSubject/${userId}`).then((res) => {
        console.log(res);
        setData(res);
      });
    } else {
      get(
        `AddmissionManagerProfile/AssignedSubject/${admissionManagerId}`
      ).then((res) => {
        console.log(res);
        setData(res);
      });
    }
  }, [userId, admissionManagerId]);

  return (
    <Card className="p-4">
      <CardBody>
        <div className="d-flex justify-content-between">
          <span className="app-style-const">Assigned Courses</span>
          {permissions?.includes(
            permissionList.AdmissionManager_Assign_University
          ) ? (
            <Link
              to={`/admissionManagerAssignedSubjects/${admissionManagerId}`}
            >
              <AddButton className="mb-1" />
            </Link>
          ) : null}
        </div>

        {data?.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Assigned Courses Found
          </p>
        ) : (
          <>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Course</th>
                  <th>University</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((sub, i) => (
                  <tr
                    key={i}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #2525251F",
                    }}
                  >
                    <th scope="row">{1 + i}</th>
                    <td>
                      {" "}
                      <Link
                        className="text-body"
                        to={`/subjectProfile/${sub?.subjectId}`}
                      >
                        {sub?.subjectName}
                      </Link>
                    </td>

                    <td>
                      <Link
                        className="text-body"
                        to={`/universityDetails/${sub?.universityId}`}
                      >
                        {sub?.universityFullName} ({sub?.universityShortName})
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center">
              <Link to="/university-courses" style={{ color: "#1E98B0" }}>
                See All
              </Link>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default AssignedSubjectCard;
