import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { useHistory, Link } from "react-router-dom";
import { Card, Table } from "reactstrap";
import { dateFormate } from "../../../../../../components/date/calenderFormate";

const ProviderApplicationList = ({ id }) => {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    get(`ProviderDashboard/Applications?id=${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

  return (
    <>
      <Card className="p-4">
        <p style={{ fontWeight: "600", fontSize: "16px" }}>Applications</p>

        {data?.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Application
          </p>
        ) : (
          <>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <th>Student ID</th>
                  <th>Student</th>
                  <th>University</th>
                  <th>Intake</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((app, i) => (
                  <tr key={i}>
                    <td className="cursor-pointer hyperlink-hover">
                      <span
                        onClick={() => {
                          history.push(
                            `/applicationDetails/${app?.applicationId}/${app?.studentId}`
                          );
                        }}
                      >
                        {app?.studentViewId}
                      </span>
                    </td>
                    <td>{app?.university}</td>
                    <td>{app?.subject}</td>
                    <td>{app?.intake}</td>

                    <td>{dateFormate(app?.date)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Link
              to="/applications"
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

export default ProviderApplicationList;
