import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const OverflowHeightText = ({ text, className, height, line = 1, link }) => {
  return (
    <>
      <span
        className={className}
        style={{
          height: height,
          display: "-webkit-box",
          WebkitLineClamp: line,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#515151",
          textDecoration: "none",
        }}
        title={text}
      >
        <span className="">{text}</span>
      </span>

      {/* <Link
        to={`/subjectProfile/${link}`}
        className={className}
        style={{
          height: height,
          display: "-webkit-box",
          WebkitLineClamp: line,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#515151",
          textDecoration: "none",
        }}
        title={text}
      >
        <span className="cursor-pointer universityName">{text}</span>
      </Link> */}
    </>
  );
};

export default OverflowHeightText;
