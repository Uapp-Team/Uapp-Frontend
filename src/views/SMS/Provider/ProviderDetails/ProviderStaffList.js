import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { Table } from "reactstrap";
import Loader from "../../Search/Loader/Loader";
import { Link } from "react-router-dom";
import PopOverText from "../../../../components/PopOverText";
import AddButton from "../../../../components/buttons/AddButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
// import Popover from "react-popover";
import { Popover } from "react-tiny-popover";

const ProviderStaffList = ({ id, accountStatusId }) => {
  const [data, setData] = useState([]);
  const [designated, setDesignated] = useState({});
  const [loading, setLoading] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [popoverOpen, setPopoverOpen] = useState("");

  // const togglePopover = () => {
  //   setIsOpen(!isOpen);
  // };

  useEffect(() => {
    get(`ProviderProfile/Staffs/${id}`).then((action) => {
      setData(action);
      setLoading(false);
      console.log(action);
    });
  }, [id]);

  useEffect(() => {
    get(`ProviderAdmin/get/${id}`).then((action) => {
      setDesignated(action);
      setLoading(false);
    });
  }, [id]);

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
                    <Link to={`/addAdmissionManager/${id}`}>
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
                      <td className="border-0" width="40%">
                        UAPP ID
                      </td>
                      <td className="border-0" width="40%">
                        Full Name
                      </td>
                      <td className="border-0" width="20%">
                        Contact{" "}
                      </td>
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
                            value={
                              item?.phone && item?.phone.includes("+")
                                ? item?.phone
                                : item?.phone && !item?.phone.includes("+")
                                ? "+" + item?.phone
                                : null
                            }
                            btn={<i className="fas fa-phone"></i>}
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
                          />
                          <PopOverText
                            value={item?.email}
                            btn={<i className="far fa-envelope"></i>}
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
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
                    <Link to={`/addAdmissionOfficerReg/${id}`}>
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
                      <td className="border-0" width="40%">
                        UAPP ID
                      </td>
                      <td className="border-0" width="40%">
                        Full Name
                      </td>
                      <td className="border-0" width="20%">
                        Contact{" "}
                      </td>
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
                            value={
                              item?.phone && item?.phone.includes("+")
                                ? item?.phone
                                : item?.phone && !item?.phone.includes("+")
                                ? "+" + item?.phone
                                : null
                            }
                            // value={item?.phone}
                            btn={<i className="fas fa-phone"></i>}
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
                          />
                          <PopOverText
                            value={item?.email}
                            btn={<i className="far fa-envelope"></i>}
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
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
