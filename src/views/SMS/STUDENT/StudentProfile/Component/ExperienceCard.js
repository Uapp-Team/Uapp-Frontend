import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const ExperienceCard = ({ sId, experienceInfo, setExperienceInfo }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Experience/GetByStudentId/${sId}`).then((res) => {
      setExperienceInfo(res);
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
          <td className="border-0 text-right">
            {permissions?.includes(
              permissionList?.Edit_Student ? (
                <Link to={`/addExperience/${sId}/${1}`}>Edit</Link>
              ) : null
            )}
          </td>
        </thead>
      </Table>

      <Card>
        {experienceInfo?.length < 1 ? (
          <span className="pl-10px">There is no experience added here.</span>
        ) : (
          <>
            {experienceInfo?.length > 0 && (
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
                    <b>Duties and Responsibilities</b>
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
                  {experienceInfo?.map((inf, i) => (
                    <tr
                      key={inf.id}
                      style={{ borderBottom: "1px solid #dee2e6" }}
                    >
                      <td className="border-0">{inf?.jobTitle}</td>
                      <td className="border-0">{inf?.companyName}</td>
                      <td className="border-0">{inf?.employeementDetails}</td>
                      <td className="border-0">
                        {dateFormate(inf?.startDate)}
                      </td>
                      <td className="border-0">
                        {inf?.isStillWorking === false ? (
                          dateFormate(inf?.endDate)
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
