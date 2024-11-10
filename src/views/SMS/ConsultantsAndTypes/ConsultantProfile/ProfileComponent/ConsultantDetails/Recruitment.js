import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const Recruitment = ({ id }) => {
  const [data, setData] = useState({});
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`ConsultantRecruitment/get/${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Recruitment Information</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            {userType === userTypes?.SystemAdmin.toString() ||
            userType === userTypes?.BranchAdmin.toString() ||
            userType === userTypes?.ComplianceManager.toString() ||
            userType === userTypes?.Admin.toString() ? (
              <>
                {permissions?.includes(permissionList.Edit_Consultant) ? (
                  <Link to={`/consultantRecruitmentInformation/${id}`}>
                    {" "}
                    Edit
                  </Link>
                ) : null}
              </>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Recruiting From</td>
            <td width="40%">
              {data?.isGlobalRecruiting === true
                ? "GLOBAL"
                : data?.recruitingCountries?.map((item) => `${item?.name}, `)}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Recruitment For</td>
            <td>
              {data?.isForGlobalRecruitment === true
                ? "GLOBAL"
                : data?.recruitmentForCountries?.map(
                    (item) => `${item?.name}, `
                  )}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Recruitment;
