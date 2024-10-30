import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "../../../../Search/Loader/Loader";
import get from "../../../../../../helpers/get";

const ProviderManagerList = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get(`ProviderProfile/Staffs/${id}`).then((action) => {
      setData(action);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card className="p-4">
          <p style={{ fontWeight: "600", fontSize: "16px" }}>
            Admission Manager
          </p>
          {data?.admissionManagers?.length === 0 ? (
            <p style={{ textAlign: "center", fontWeight: "700" }}>
              No Admission Manager Found
            </p>
          ) : (
            <>
              <Table borderless responsive>
                <thead className="tablehead">
                  <td className="border-0">UAPP ID</td>
                  <td className="border-0">Full Name</td>
                  <td className="border-0">Phone No</td>
                  <td className="border-0">Email</td>
                </thead>
                <tbody>
                  {data?.admissionManagers?.map((item, i) => (
                    <tr
                      key={i}
                      style={{
                        backgroundColor: "white",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      <td className="border-0">{item?.uappId}</td>
                      <td className="border-0">{item?.fullName}</td>
                      <td className="border-0">{item?.email}</td>
                      <td className="border-0">{item?.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Link
                to="/admissionManagerList"
                className="text-center"
                style={{ color: "#1E98B0" }}
              >
                See All
              </Link>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default ProviderManagerList;
