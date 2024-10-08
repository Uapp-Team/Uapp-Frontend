import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const ButtonLoader = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 25,
        color: "#045D5E",
        fontWeight: "bold",
        margin: "0 3px",
      }}
      spin
    />
  );
  return <Spin indicator={antIcon} />;
};

export default ButtonLoader;
