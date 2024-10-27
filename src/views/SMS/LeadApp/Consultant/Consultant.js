/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import get from "../../../../helpers/get";
import { leadlink } from "../../../../constants/constants";

const Consultant = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    get(`Account/GetTempToken`).then((data) => {
      console.log(data);
      setToken(data?.token);
    });
  }, []);

  return (
    <>
      <BreadCrumb title="Lead Consultant" backTo="" path="/" />

      <iframe
        src={`${leadlink}tokenToLeadConsultant/${token}`}
        className="border-0 w-100 p-4 bg-white rounded"
        height="700px"
      ></iframe>
    </>
  );
};

export default Consultant;
