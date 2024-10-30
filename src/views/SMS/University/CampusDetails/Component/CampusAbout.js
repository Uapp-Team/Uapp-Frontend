import React from "react";
import { Table } from "reactstrap";

const CampusAbout = ({ campusInfo }) => {
  return (
    <>
      <div className=" custom-card-border p-4 mb-10px">
        <Table borderless responsive className="mb-4">
          <thead className="tablehead">
            <td className="border-0"> Financial Information</td>
            <td className="border-0"></td>
          </thead>
          <tbody className="border-buttom">
            <tr
              style={{
                borderBottom: "1px solid #2525251F",
              }}
            >
              <td>Average Application Fee </td>

              <td>£{campusInfo?.avarageApplicationFee}</td>
            </tr>
            <tr
              style={{
                borderBottom: "1px solid #2525251F",
              }}
            >
              <td>Average Tution Fee </td>

              <td>£{campusInfo?.avarageApplicationFee}</td>
            </tr>

            <tr
              style={{
                borderBottom: "1px solid #2525251F",
              }}
            >
              <td>Average Living Cost</td>

              <td>£{campusInfo?.avarageLivingCost}</td>
            </tr>
            <tr
              style={{
                borderBottom: "1px solid #2525251F",
              }}
            >
              <td>Estimated Total Cost</td>

              <td>£{campusInfo?.estimatedTotalCost}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="aboutContentHeader mb-2">Location</div>

      <div className="mt-3 mb-10px">
        <iframe
          src={campusInfo?.embededMap}
          width="100%"
          height="400"
          loading="lazy"
          style={{ border: "0" }}
          referrerpolicy="no-referrer-when-downgrade"
          title="efef"
        ></iframe>
      </div>
    </>
  );
};

export default CampusAbout;
