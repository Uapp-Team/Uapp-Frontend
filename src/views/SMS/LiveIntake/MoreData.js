import React from "react";

const MoreData = ({ data, action }) => {
  const dataList = data?.split(", ");

  return (
    <div>
      <span>{dataList[0]}</span>
      <span
        className="for-intake-table cursor-pointer ml-3"
        onClick={() => action && action()}
      >
        {dataList.length - 1 !== 0 && <>{dataList.length - 1} +</>}{" "}
      </span>
    </div>
  );
};

export default MoreData;
