import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "reactstrap";
import get from "../../helpers/get";
import { rootUrl } from "../../constants/constants";
import { userTypes } from "../../constants/userTypeConstant";
import user from "../../assets/img/user-3.svg";

const DashboardReadyToApply = ({
  url = `Dashboard/ReadyToApplyApplications`,
}) => {
  const location = useLocation();
  const currentRoute = location.pathname.split("/")[1];

  const userType = localStorage.getItem("userType");
  const [data, setData] = useState([]);

  useEffect(() => {
    get(url).then((res) => {
      setData(res);
    });
  }, [url]);

  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-flex">
          <h5 className="mb-0">Ready to Apply </h5>
          <span className="count-summery">{data?.count}</span>
        </div>

        {data?.applications?.length === 0 ? (
          <p className="text-center">No Application is Ready to Apply</p>
        ) : (
          <>
            <div className="overflowY-300px">
              <Table responsive className="mt-3">
                <thead className="tablehead">
                  <tr>
                    <td className="border-0">APP ID</td>
                    <td className="border-0">Student</td>
                    <td className="border-0">University </td>
                    {userType !== userTypes?.Consultant &&
                      currentRoute !== "consultantDashboard" &&
                      currentRoute !== "consultantProfile" && (
                        <td className="border-0">Consultant </td>
                      )}
                    <td className="border-0">
                      Admission{" "}
                      {userType === userTypes?.AdmissionManager ||
                      currentRoute === "admissionManagerProfile"
                        ? "Officer"
                        : "Manager"}
                    </td>
                    <td className="border-0">Assessment Date </td>
                  </tr>
                </thead>
                <tbody>
                  {data?.applications?.map((item, i) => (
                    <tr key={i} className="border-buttom">
                      <td>
                        <Link
                          className="text-id hover"
                          to={`/applicationDetails/${item?.applicationId}/${item?.studentId}`}
                        >
                          #{item?.uappId}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="text-id hover"
                          to={`/studentProfile/${item?.studentId}`}
                        >
                          {item?.profileImage ? (
                            <img
                              className="subject-university-logo bg-white mr-1"
                              src={rootUrl + item?.profileImage}
                              alt=""
                            />
                          ) : (
                            <img
                              className="subject-university-logo bg-white mr-1"
                              src={user}
                              alt=""
                            />
                          )}
                          {item?.studentName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="text-id hover"
                          to={`/universityDetails/${item?.universityId}`}
                        >
                          {item?.universityName}
                        </Link>
                      </td>

                      {userType !== userTypes?.Consultant &&
                        currentRoute !== "consultantDashboard" &&
                        currentRoute !== "consultantProfile" && (
                          <td>
                            <Link
                              className="text-id hover"
                              to={`/consultantProfile/${item?.consultantId}`}
                            >
                              {item?.consultantName}
                            </Link>
                          </td>
                        )}

                      {userType === userTypes?.AdmissionManager ||
                      currentRoute === "admissionManagerProfile" ? (
                        <td>
                          <Link
                            className="text-id hover"
                            to={`/admissionOfficerDetails/${item?.admissionOfficerId}`}
                          >
                            {item?.admissionOfficerName}
                          </Link>
                        </td>
                      ) : (
                        <td>
                          <Link
                            className="text-id hover"
                            to={`/admissionManagerProfile/${item?.admissionManagerId}`}
                          >
                            {item?.admissionManagerName}
                          </Link>
                        </td>
                      )}

                      <td>{item?.assesmentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* {data?.count > 5 && (
              <div className="text-center text-blue">
                <Link to="/applicationsByStatus/3/1">See All</Link>
              </div>
            )} */}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardReadyToApply;
