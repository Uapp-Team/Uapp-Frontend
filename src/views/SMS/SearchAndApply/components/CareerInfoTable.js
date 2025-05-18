import React from "react";

function CareerInfoTable({ courses, handleToogleCareerInfo, isVisible }) {
  return (
    <>
      <tr
        className="table-header cursor-pointer"
        onClick={handleToogleCareerInfo}
      >
        <th className="fixed-col">
          <span>Career & Work Opportunities</span>
        </th>
      </tr>

      {isVisible && (
        <tbody>
          <tr>
            <th className="fixed-col table-left">Work Placement Included</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.isWorkPlacementAvailable ? (
                  <span className="card-tag mr-2" key="loan">
                    Work Placement
                  </span>
                ) : (
                  "-"
                )}
              </td>
            ))}
          </tr>
        </tbody>
      )}
    </>
  );
}

export default CareerInfoTable;
