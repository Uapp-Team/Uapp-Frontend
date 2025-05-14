import React from "react";
import "../SearchAndApply.css";

const TableSection = ({
  sectionTitle,
  rowConfig,
  courses,
  onToggle,
  isVisible,
}) => {
  return (
    <>
      <tr className="table-header" onClick={onToggle}>
        <th className="fixed-col" colSpan={courses.length + 1}>
          <span>{sectionTitle}</span>
        </th>
      </tr>

      {isVisible && (
        <>
          {rowConfig.map((row, idx) => (
            <tr key={idx}>
              <th className="fixed-col table-left">{row.label}</th>
              {courses.map((course, cidx) => (
                <td key={cidx} className="table-col">
                  {row.subTitle && (
                    <div className="table-course-title">{row.subTitle}</div>
                  )}

                  {row.render ? (
                    row.render(course[row.key])
                  ) : Array.isArray(course?.[row.key]) ? (
                    <ul>
                      {course[row.key].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    course?.[row.key] || "Not Set"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </>
      )}
    </>
  );
};

export default TableSection;
