import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { Table } from "reactstrap";
import Loader from "../../Search/Loader/Loader";
import { Link } from "react-router-dom";
import PopOverText from "../../../../components/Popover";
import AddButton from "../../../../components/buttons/AddButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const ProviderStaffList = ({ id, accountStatusId }) => {
  const [data, setData] = useState([]);
  const [designated, setDesignated] = useState({});
  const [loading, setLoading] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`ProviderProfile/Staffs/${id}`).then((action) => {
      setData(action);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    get(`ProviderAdmin/get/${id}`).then((action) => {
      setDesignated(action);
      setLoading(false);
    });
  }, [id]);
  console.log(data);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {designated ? (
            <div className="custom-card-border p-4 mb-3 col-sm-10 col-md-8 col-lg-5">
              <h5>
                {designated?.firstName} {designated?.lastName}
              </h5>
              <p>{designated?.designation}</p>
              <ul className="uapp-ul">
                {designated?.email === null ? null : (
                  <li>
                    {" "}
                    <i className="far fa-envelope pr-2"></i> {designated?.email}{" "}
                  </li>
                )}

                {designated?.phoneNumber === null ? null : (
                  <li>
                    {" "}
                    <i className="fas fa-phone pr-2"></i>{" "}
                    {designated?.phoneNumber}{" "}
                  </li>
                )}
              </ul>
            </div>
          ) : null}
          <div className="custom-card-border p-4 mb-3 ">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <h5>Admission Manager </h5>
                <span className="count-summery">
                  {data?.admissionManagers?.length}
                </span>
              </div>
              {accountStatusId === 1 ? null : (
                <>
                  {" "}
                  {permissions?.includes(
                    permissionList.Add_AdmissionManager
                  ) ? (
                    <Link to={`/addAdmissionManager/${id}`} className="mb-1">
                      <AddButton />
                    </Link>
                  ) : null}
                </>
              )}
            </div>
            {data?.admissionManagers?.length === 0 ? (
              <p>No Admission Manager Found</p>
            ) : (
              <>
                <Table responsive>
                  <thead className="tablehead">
                    <tr>
                      <td className="border-0">UAPP ID</td>
                      <td className="border-0">Full Name</td>
                      <td className="border-0">Contact </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.admissionManagers?.map((item, i) => (
                      <tr key={i} className="border-buttom">
                        <td className="border-0">
                          <Link
                            className="text-body"
                            to={`/admissionManagerProfile/${item?.admissionManagerId}`}
                          >
                            {item?.uappId}
                          </Link>
                        </td>
                        <td className="border-0">
                          <Link
                            className="text-body"
                            to={`/admissionManagerProfile/${item?.admissionManagerId}`}
                          >
                            {item?.fullName}
                          </Link>
                        </td>
                        <td className="border-0 d-flex ">
                          <PopOverText
                            value={item?.phone}
                            i={`AmPhone${i}`}
                            btn={<i className="fas fa-phone"></i>}
                          />
                          <PopOverText
                            value={item?.email}
                            i={`AmEmail${i}`}
                            btn={<i className="far fa-envelope"></i>}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center text-blue">
                  <Link to="/admissionManagerList">See All</Link>
                </div>
              </>
            )}
          </div>
          <div className="custom-card-border p-4 mb-3 ">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <h5>Admission Officer </h5>
                <span className="count-summery">
                  {data?.admissionOffficers?.length}
                </span>
              </div>
              {accountStatusId === 1 ? null : (
                <>
                  {" "}
                  {permissions?.includes(
                    permissionList.Add_AdmissionOfficer
                  ) ? (
                    <Link to={`/addAdmissionOfficerReg/${id}`} className="mb-1">
                      <AddButton />
                    </Link>
                  ) : null}{" "}
                </>
              )}
            </div>

            {data?.admissionOffficers?.length === 0 ? (
              <p>No Admission Officer Found</p>
            ) : (
              <>
                <Table responsive>
                  <thead className="tablehead">
                    <tr>
                      <td className="border-0">UAPP ID</td>
                      <td className="border-0">Full Name</td>
                      <td className="border-0">Contact </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.admissionOffficers?.map((item, i) => (
                      <tr key={i} className="border-buttom">
                        <td className="border-0">
                          <Link
                            className="text-body"
                            to={`/admissionOfficerDetails/${item?.admissionOfficerId}`}
                          >
                            {item?.uappId}
                          </Link>
                        </td>
                        <td className="border-0">
                          <Link
                            className="text-body"
                            to={`/admissionOfficerDetails/${item?.admissionOfficerId}`}
                          >
                            {item?.fullName}
                          </Link>
                        </td>

                        <td className="border-0 d-flex ">
                          <PopOverText
                            value={item?.phone}
                            i={`AoPhone${i}`}
                            btn={<i className="fas fa-phone"></i>}
                          />
                          <PopOverText
                            value={item?.email}
                            i={`AoEmail${i}`}
                            btn={<i className="far fa-envelope"></i>}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center text-blue">
                  <Link to="/admissionOfficerList">See All</Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProviderStaffList;
