import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Table } from "reactstrap";
import get from "../../../../../../../../helpers/get";
import AddButton from "../../../../../../../../components/buttons/AddButton";
import { permissionList } from "../../../../../../../../constants/AuthorizationConstant";

const AdmissionOfficers = ({ admissionManagerId, setHeadData, headData }) => {
  const [data, setData] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (admissionManagerId === undefined) {
      get(`AddmissionManagerProfile/ManagerOfficer/${userId}`).then((res) => {
        console.log(res);
        setData(res);
      });
    } else {
      get(`AddmissionManagerProfile/ManagerOfficer/${admissionManagerId}`).then(
        (res) => {
          setData(res);
        }
      );
    }
  }, [admissionManagerId, userId]);

  return (
    <Card className="p-4">
      <CardBody>
        <div className="d-flex justify-content-between">
          <span className="app-style-const">Admission Officers</span>
          {permissions?.includes(
            permissionList.AdmissionManager_Assign_University
          ) ? (
            <Link
              to={`/admissionOfficerListFromAdmissionManagerList/${headData?.providerId}/${admissionManagerId}`}
            >
              <AddButton className="mb-1" />
            </Link>
          ) : null}
        </div>

        {data?.length < 1 ? (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Admission Officers Found
          </p>
        ) : (
          <>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  <th>UAPP ID</th>
                  <th>Name</th>
                  <th>Provider</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((officer, i) => (
                  <tr
                    key={i}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #2525251F",
                    }}
                  >
                    <td>{officer?.sequenceId}</td>
                    <td>
                      <Link
                        className="text-body"
                        to={`/admissionOfficerDetails/${officer?.officermanagerId}`}
                      >
                        {officer?.nameTittleName} {officer?.firstName}{" "}
                        {officer?.lastName}
                      </Link>
                    </td>
                    <td>{officer?.providerName}</td>
                    <td>{officer?.email}</td>
                    <td>{officer?.phoneNumber}</td>
                    <td>
                      {officer?.countryName} ({officer?.stateName})
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
      </CardBody>
    </Card>
  );
};

export default AdmissionOfficers;
