import React from "react";

const ErrorText = ({ error, className }) => {
  return (
    <>{error ? <p className={`text-danger ${className}`}>{error}</p> : null}</>
  );
};

export default ErrorText;
