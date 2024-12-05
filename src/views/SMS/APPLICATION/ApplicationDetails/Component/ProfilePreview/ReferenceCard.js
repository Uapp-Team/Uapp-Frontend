import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import get from "../../../../../../helpers/get";

const ReferenceCard = ({ sId, refList, setRefList }) => {
  useEffect(() => {
    get(`Reference/GetByStudentId/${sId}`).then((res) => {
      setRefList(res);
    });
  }, [sId]);

  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0">
            <h5>Reference Information</h5>
          </td>
          <td className="border-0 text-right"></td>
        </thead>
      </Table>

      <Card>
        {refList?.length < 1 ? (
          <span className="pl-10px">There is no reference added here.</span>
        ) : (
          <>
            {refList.length > 0 && (
              <Table className="text-gray-70">
                <thead className="tablehead">
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
                    <b>Relation</b>
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
                  {refList?.map((ref, i) => (
                    <tr
                      key={ref.id}
                      style={{ borderBottom: "1px solid #dee2e6" }}
                    >
                      <td className="border-0">{ref?.referenceName}</td>
                      <td className="border-0">{ref?.referenceType.name}</td>
                      <td className="border-0">{ref?.institute_Company}</td>
                      <td className="border-0">+{ref?.phoneNumber}</td>
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
