import React from "react";
import { Table } from "reactstrap";

const CampusCourse = ({ campusSubjectList }) => {
  return (
    <div className="custom-card-border p-4 mb-10px">
      <Table borderless responsive className="mb-4">
        <thead className="tablehead">
          <td className="border-0">
            <b>Courses</b>
          </td>
          <td className="border-0 text-center">
            <b>Features</b>
          </td>
        </thead>
        <tbody>
          {campusSubjectList.length > 0 &&
            campusSubjectList?.map((item, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: "1px solid #2525251F",
                }}
              >
                <td>{item?.subjectName}</td>

                <td className="text-center">
                  {item?.isAcceptHome === true ? (
                    <b>Home</b>
                  ) : (
                    <span style={{ color: "#dddd", fontWeight: "500" }}>
                      Home
                    </span>
                  )}
                  {item?.isAcceptEu_Uk === true ? (
                    <b className="mx-1">Eu</b>
                  ) : (
                    <span
                      className="mx-1"
                      style={{ color: "#dddd", fontWeight: "500" }}
                    >
                      Eu
                    </span>
                  )}
                  {item?.isAcceptInternational === true ? (
                    <b>International</b>
                  ) : (
                    <span
                      className="mx-1"
                      style={{ color: "#dddd", fontWeight: "500" }}
                    >
                      International
                    </span>
                  )}
                  {/* {item?.isEu_UkVisible === true ? <b>EU</b> : "EU"} */}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>

    // <td className="text-center">
    //   {item?.isHomeVisible && item?.isAcceptHome === true ? (
    //     <b>Home</b>
    //   ) : (
    //     "Home/UK"
    //   )}
    // </td>
  );
};

export default CampusCourse;
