import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { Table } from "reactstrap";
import Loader from "../../Search/Loader/Loader";
import { rootUrl } from "../../../../constants/constants";

const ProviderAbout = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get(`ProviderProfile/About/${id}`).then((action) => {
      setData(action);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="custom-card-border p-4 mb-10px">
          <Table>
            <thead className="tablehead">
              <td className="border-0">Provider information</td>
              <td className="border-0"></td>
            </thead>
            <tbody className="border-buttom">
              {/* <tr>
                <td>Designated person Name</td>
                <td>{data?.adminName}</td>
              </tr>
              <tr>
                <td>Designation</td>
                <td>{data?.designation}</td>
              </tr> */}
              <tr>
                <td>Phone</td>
                <td>
                  {data?.officialPhone ? <> +{data?.officialPhone}</> : null}
                </td>
              </tr>
              <tr>
                <td>Email </td>
                <td>{data?.officialEmail}</td>
              </tr>
              <tr>
                <td>Finance (Billing) Email</td>
                <td>{data?.financeEmail}</td>
              </tr>
              <tr>
                <td>Company Lisence Number</td>
                <td>{data?.companyLisenceNumber}</td>
              </tr>
              <tr>
                <td>Company License File</td>
                <td>
                  <a href={rootUrl + data?.lisenceFileUrl} target="blank">
                    attachment
                  </a>
                </td>
              </tr>
              <tr>
                <td>VAT registration No.</td>
                <td>{data?.vatNumber}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ProviderAbout;
