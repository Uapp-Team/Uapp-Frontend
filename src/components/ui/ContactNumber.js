import React from "react";

const ContactNumber = ({ data }) => {
  return (
    <div>
      {data && data.includes("+")
        ? data
        : data && !data.includes("+")
        ? "+" + data
        : null}
    </div>
  );
};

export default ContactNumber;
