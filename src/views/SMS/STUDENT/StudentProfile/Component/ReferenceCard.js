import React, { useEffect } from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ReferenceCard = ({ sId, referenceList, setReferenceList, activity }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Reference/GetByStudentId/${sId}`).then((res) => {
      setReferenceList(res);
      console.log(res, "refer");
    });
  }, [sId, setReferenceList]);

  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0">
            <h5>Reference Information</h5>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) && activity ? (
              <Link to={`/addReference/${sId}/${1}`}>Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      <Card>
        {referenceList && referenceList?.length < 1 ? (
          <span className="pl-10px">There is no reference added here.</span>
        ) : (
          <>
            {referenceList.length > 0 && (
              <Table className="text-gray-70">
                <thead className="tablehead">
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Relation</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Name</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Institute/Company</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Phone</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Email</b>
                  </td>
                </thead>
                <tbody>
                  {referenceList?.map((ref, i) => (
                    <tr
                      key={ref.id}
                      style={{ borderBottom: "1px solid #dee2e6" }}
                    >
                      <td className="border-0">{ref?.referenceType.name}</td>
                      <td className="border-0">{ref?.referenceName}</td>
                      <td className="border-0">{ref?.institute_Company}</td>
                      <td className="border-0">
                        {ref?.phoneNumber && ref?.phoneNumber.includes("+")
                          ? ref?.phoneNumber
                          : ref?.phoneNumber && !ref?.phoneNumber.includes("+")
                          ? "+" + ref?.phoneNumber
                          : null}
                      </td>
                      <td className="border-0">{ref?.emailAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default ReferenceCard;
