import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import get from "../../../../../../../../helpers/get";
import { Link } from "react-router-dom";

const Applications = ({ admissionManagerId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (admissionManagerId === undefined) {
      get(`AddmissionManagerProfile/ManagerApplication`).then((res) => {
        setData(res);
      });
    } else {
      get(
        `AddmissionManagerProfile/ManagerApplications/${admissionManagerId}`
      ).then((res) => {
        setData(res);
      });
    }
  }, [admissionManagerId]);

  // const handlRedirectToApplicationDetails = (applicationId, studentId) => {
  //   history.push({
  //     pathname: `/applicationDetails/${applicationId}/${studentId}`,
  //   });
  // };

  return (
    <Card className="p-4">
      <CardBody>
        <span className="app-style-const">Applications</span>
        {data?.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Applications Found
          </p>
        ) : (
          <>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr
                  style={{
                    textAlign: "center",
                  }}
                >
                  {/* <th>SL/NO</th> */}
                  <th>University</th>
                  <th>Campus</th>
                  <th>Student Name</th>
                  <th>Course Name</th>
                  <th>Intake</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((appli, i) => (
                  <tr
                    key={i}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #2525251F",
                    }}
                  >
                    {/* <th scope="row">{1 + i}</th> */}
                    <td>
                      <Link
                        className="text-body"
                        to={`/universityDetails/${appli?.universityId}`}
                      >
                        {appli?.university}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="text-body"
                        to={`/campusDetails/${appli?.campusId}`}
                      >
                        {appli?.campus}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="text-body"
                        to={`/studentProfile/${appli?.studentId}`}
                      >
                        {appli?.studentName}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="text-body"
                        to={`/subjectProfile/${appli?.subjectId}`}
                      >
                        {appli?.subjectName}
                      </Link>
                    </td>
                    <td>{appli?.intake}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center">
              <Link to="/applications" style={{ color: "#1E98B0" }}>
                See All
              </Link>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default Applications;
