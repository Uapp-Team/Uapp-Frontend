import React from "react";
// import themeConfig from "../configs/themeConfig"
// import classnames from "classnames"

const FullPageLayout = ({ children, ...rest }) => {
  return (
    <>
      <div className="full-content w-100">{children}</div>
    </>
  );
};

export default FullPageLayout;
