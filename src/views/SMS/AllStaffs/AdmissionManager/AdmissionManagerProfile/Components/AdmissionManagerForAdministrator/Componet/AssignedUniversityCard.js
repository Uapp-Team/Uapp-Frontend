import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import get from "../../../../../../../../helpers/get";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddButton from "../../../../../../../../components/buttons/AddButton";
import { permissionList } from "../../../../../../../../constants/AuthorizationConstant";

const AssignedUniversityCard = ({
  admissionManagerId,
  setHeadData,
  headData,
}) => {
  const [data, setData] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (admissionManagerId == undefined) {
      get(`AddmissionManagerProfile/ManagerUniversity/${userId}`).then(
        (res) => {
          setData(res);
        }
      );
    } else {
      get(
        `AddmissionManagerProfile/ManagerUniversity/${admissionManagerId}`
      ).then((res) => {
        console.log(res);
        setData(res);
      });
    }
  }, [userId, admissionManagerId]);
  const GetApplicationType = (eu, home, international) => {
    var applicationtype = "";
    if (home === true) {
      applicationtype = applicationtype + "Home-";
    }
    if (eu === true) {
      applicationtype = applicationtype + "EU/UK-";
    }
    if (international === true) {
      applicationtype = applicationtype + "International";
    }
    return applicationtype;
  };
  return (
    <Card className="p-4">
      <CardBody>
        <div className="d-flex justify-content-between">
          <span className="app-style-const">Assigned Universities</span>
          {permissions?.includes(
            permissionList.AdmissionManager_Assign_University
          ) ? (
            <Link
              to={`/assignUniversity/${headData?.providerId}/${admissionManagerId}`}
            >
              <AddButton className="mb-1" />
            </Link>
          ) : null}
        </div>

        {data?.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Assigned Universities Found
          </p>
        ) : (
          <>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>University Name</th>
                  <th>Short Name</th>
                  <th>Application type</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((uni, i) => (
                  <tr
                    key={i}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #2525251F",
                    }}
                  >
                    <th scope="row">{1 + i}</th>
                    <td>
                      <Link
                        className="text-body"
                        to={`/universityDetails/${uni?.universityId}`}
                      >
                        {uni?.university?.name}
                      </Link>
                    </td>
                    <td>{uni?.university?.shortName}</td>
                    <td>
                      {GetApplicationType(
                        uni?.isAcceptEU_UK,
                        uni?.isAcceptHome,
                        uni?.isAcceptInternational
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center text-blue">
              <Link to="/universityList">See All</Link>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default AssignedUniversityCard;
