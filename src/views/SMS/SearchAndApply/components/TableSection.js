import React from "react";

const TableSection = ({
  sectionTitle,
  rowConfig,
  courses,
  onToggle,
  isVisible,
}) => {
  return (
    <>
      {/* Section Header */}
      <tr className="table-header" onClick={onToggle}>
        <th className="fixed-col" colSpan={courses.length + 1}>
          <span>{sectionTitle}</span>
        </th>
      </tr>

      {/* Section Body */}
      {isVisible && (
        <>
          {rowConfig.map((row, idx) => (
            <tr key={idx}>
              <th className="fixed-col table-left">{row.label}</th>
              {courses.map((course, cidx) => (
                <td key={cidx} className="table-col">
                  {row.render
                    ? row.render(course[row.key]) // Custom render function if provided
                    : course?.[row.key] || "Not Set"}
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
