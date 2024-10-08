import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import get from "../../../../../../helpers/get";

const ExperienceCard = ({ sId }) => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    get(`Experience/GetByStudentId/${sId}`).then((res) => {
      setInfo(res);
    });
  }, [sId]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0">
            <h5>Experience Information</h5>
          </td>
          <td className="border-0 text-right"></td>
        </thead>
      </Table>

      <Card>
        {info?.length < 1 ? (
          <span className="pl-10px">There is no experience added here.</span>
        ) : (
          <>
            {info?.length > 0 && (
              <Table className="text-gray-70">
                <thead className="tablehead">
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Job Title</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Company Name</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>Employeement Details</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>From</b>
                  </td>
                  <td
                    className="border-0"
                    style={{ borderLeft: "1px solid #dee2e6" }}
                  >
                    <b>To</b>
                  </td>
                </thead>
                <tbody>
                  {info?.map((inf, i) => (
                    <tr
                      key={inf.id}
                      style={{ borderBottom: "1px solid #dee2e6" }}
                    >
                      <td className="border-0">{inf?.jobTitle}</td>
                      <td className="border-0">{inf?.companyName}</td>
                      <td className="border-0">{inf?.employeementDetails}</td>
                      <td className="border-0">{handleDate(inf?.startDate)}</td>
                      <td className="border-0">
                        {inf?.isStillWorking === false ? (
                          handleDate(inf?.endDate)
                        ) : (
                          <span>Continue</span>
                        )}
                      </td>
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

export default ExperienceCard;
