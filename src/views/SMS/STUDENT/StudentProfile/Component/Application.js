import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";
import { Link } from "react-router-dom";

const Application = ({ id }) => {
  console.log(id);
  const [data, setData] = useState({});
  useEffect(() => {
    get(`StudentProfile/StudentApplication/${id}`).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [id]);

  return (
    <>
      <p style={{ fontWeight: "600", fontSize: "16px" }}>Application</p>
      {data?.length === 0 ? (
        <p>No application found</p>
      ) : (
        <Table>
          <thead className="tablehead">
            <td className="border-0">APP ID</td>
            <td className="border-0">University</td>
            <td className="border-0">Campus</td>
            <td className="border-0">Course</td>
            <td className="border-0">Intake</td>
            <td className="border-0">Application Date</td>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data?.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td className="border-0">{item?.applicationId}</td>
                  <td className="border-0">
                    {" "}
                    <Link
                      className="text-body"
                      to={`/universityDetails/${item?.universityId}`}
                    >
                      {item?.universityName}
                    </Link>
                  </td>
                  <td className="border-0">
                    {" "}
                    <Link
                      className="text-body"
                      to={`/campusDetails/${item?.campusId}`}
                    >
                      {item?.campus}
                    </Link>
                  </td>
                  <td className="border-0">
                    {" "}
                    <Link
                      className="text-body"
                      to={`/subjectProfile/${item?.subjectId}`}
                    >
                      {item?.courseName}
                    </Link>
                  </td>
                  <td className="border-0">{item?.intake}</td>
                  <td className="border-0">{item?.applicationDate}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Application;
