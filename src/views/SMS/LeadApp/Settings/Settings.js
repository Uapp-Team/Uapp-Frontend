/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConversionRate from "./ConversionRate";
import { Card, CardBody } from "reactstrap";
import get from "../../../../helpers/get";
import { leadlink } from "../../../../constants/constants";

const Settings = () => {
  const [token, setToken] = useState();

  // const handleLeadLogon = () => {
  //   get(`Account/GetTempToken`).then((data) => {
  //     console.log(data);
  //     window
  //       .open(`https://lead.uapp.uk/token/${data?.token}`, "_blank")
  //       .focus();
  //   });
  // };

  useEffect(() => {
    get(`Account/GetTempToken`).then((data) => {
      console.log(data);
      setToken(data?.token);
      // window.open(`${leadlink}tokenClose/${data?.token}`, "_blank").focus();
    });
  }, []);

  return (
    <>
      <BreadCrumb title="Settings" backTo="Lead" path="/LeadDashboard" />
      <Card>
        <CardBody>
          <ConversionRate />
        </CardBody>
      </Card>

      <iframe
        // src="https://lead.uapp.uk/lead/setting"
        // src="https://www.facebook.com/"
        src={`${leadlink}tokenToLeadSetting/${token}`}
        className="border-0 w-100 p-4 bg-white rounded"
        height="700px"
      ></iframe>
    </>
  );
};

export default Settings;
