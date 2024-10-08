import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const Recruitment = ({ id }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    get(`ConsultantRecruitment/get/${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

  return (
    <>
      <Table className="border">
        <thead className="tablehead">
          <td className="border-0">
            <b>Recruitment Information</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            <Link to={`/consultantRecruitmentInformation/${id}`}> Edit</Link>
          </td>
        </thead>
        <tbody>
          <tr>
            <td>Recruiting From</td>
            <td>
              {data?.isGlobalRecruiting === true
                ? "GLOBAL"
                : data?.recruitingCountries?.map((item) => `${item?.name}, `)}
            </td>
          </tr>
          <tr>
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
