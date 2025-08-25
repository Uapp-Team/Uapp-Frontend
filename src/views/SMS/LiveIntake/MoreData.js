import React from "react";

const MoreData = ({ data, action }) => {
  const dataList = data[0].name?.split(", ");

  return (
    <>
      {" "}
      <div>
        <span>{dataList}</span>
        <span
          className="for-intake-table cursor-pointer ml-3"
          onClick={() => action && action()}
        >
          {data.length - 1 !== 0 && <>{data.length - 1} +</>}{" "}
        </span>
      </div>
    </>
  );
};

export default MoreData;
