import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { Table } from "reactstrap";
import Loader from "../../Search/Loader/Loader";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddButton from "../../../../components/buttons/AddButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const ProviderUniversityList = ({ id, accountStatusId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`ProviderProfile/Universities/${id}`).then((action) => {
      setData(action);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {data?.length < 1 ? (
            <p>No University Added</p>
          ) : (
            <div className="custom-card-border p-4 mb-10px">
              <div className="d-flex justify-content-between">
                <h5>Universities</h5>
                {accountStatusId === 1 ? null : (
                  <>
                    {" "}
                    {permissions?.includes(permissionList.Add_University) ? (
                      <Link
                        to={`/universityListFromProviderList/${id}`}
                        className="mb-1"
                      >
                        <AddButton />
                      </Link>
                    ) : null}
                  </>
                )}
              </div>
              <Table responsive>
                <thead className="tablehead">
                  <tr>
                    <td>University</td>
                    <td>Campuses</td>
                    <td>Courses</td>
                    <td>Total student</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((university, i) => (
                    <tr key={i}>
                      <td>
                        <Link
                          className="text-body"
                          to={`/universityDetails/${university?.universityId}`}
                        >
                          {university?.name} ({university?.shortName})
                        </Link>
                      </td>
                      <td>{university?.campuses}</td>
                      <td>{university?.programs}</td>
                      <td>{university?.total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProviderUniversityList;
