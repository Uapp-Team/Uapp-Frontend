import React from "react";
import { useHistory } from "react-router-dom";

const OverflowHeightText = ({ text, className, height, line = 1, link }) => {
  const router = useHistory();
  const handleCourseDetails = () => {
    router.push(`subjectProfile/${link}`);
  };
  return (
    <>
      <div
        className={className}
        style={{
          height: height,
          display: "-webkit-box",
          WebkitLineClamp: line,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#515151",
        }}
        title={text}
      >
        <span className="cursor-pointer" onClick={handleCourseDetails}>
          {text}
        </span>
      </div>
    </>
  );
};

export default OverflowHeightText;
