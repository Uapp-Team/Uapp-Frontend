import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../../helpers/get";
import Loader from "../../../../Search/Loader/Loader";

const ProviderUniversity = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get(`ProviderComplianceDashboard/Universities?id=${id}`).then((action) => {
      setData(action);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card className="p-4">
            <p style={{ fontWeight: "600", fontSize: "16px" }}>
              Recent University
            </p>
            {data?.admissionManagers?.length === 0 ? (
              <p style={{ textAlign: "center", fontWeight: "700" }}>
                No University Added
              </p>
            ) : (
              <>
                <Table borderless responsive>
                  <thead className="tablehead">
                    <td className="border-0">University</td>
                    <td className="border-0">Location</td>
                    <td className="border-0">Courses</td>
                    <td className="border-0">Applications</td>
                  </thead>
                  <tbody>
                    {data?.map((item, i) => (
                      <tr
                        key={i}
                        style={{
                          backgroundColor: "white",
                          borderBottom: "1px solid #dee2e6",
                        }}
                      >
                        <td className="border-0">{item?.name}</td>
                        <td className="border-0">{item?.location}</td>
                        <td className="border-0">{item?.programs}</td>
                        <td className="border-0">{item?.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Link
                  to="/universityList"
                  className="text-center"
                  style={{ color: "#1E98B0" }}
                >
                  See All
                </Link>
              </>
            )}
          </Card>
        </>
      )}
    </>
  );
};

export default ProviderUniversity;
