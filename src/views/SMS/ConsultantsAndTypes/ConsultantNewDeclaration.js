import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { useHistory, useParams } from "react-router-dom";
import get from "../../../helpers/get";
import EmployeeTermsCondition from "./EmployeeTermsCondition";
import { userTypes } from "../../../constants/userTypeConstant";

const ConsultantNewDeclaration = () => {
  const { consultantRegisterId } = useParams();
  const referenceId = localStorage.getItem("referenceId");
  const [consData, setConsData] = useState({});
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState({});
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    userType === userTypes?.SystemAdmin
      ? get(
          `UserTermsAndConditions/Get/${userTypes?.Consultant}/${consultantRegisterId}`
        ).then((res) => {
          setLoading(false);
          setCurrentUserDetails(res);
          console.log(res, "sakib");
        })
      : get(`UserTermsAndConditions/GetByCurrentUser`).then((res) => {
          setLoading(false);
          setCurrentUserDetails(res);
          console.log(res, "sakib 1");
        });
  }, [consultantRegisterId, consData, userType]);

  // useEffect(() => {
  //   get(`UserTermsAndConditions/GetByCurrentUser`).then((res) => {
  //     setLoading(false);
  //     setCurrentUserDetails(res);
  //   });
  // }, [success]);

  useEffect(() => {
    get(`Consultant/GetGeneralInformation/${consultantRegisterId}`).then(
      (res) => {
        setConsData(res);
        console.log(res, "declaration");
      }
    );
  }, [consultantRegisterId]);
  return (
    <div>
      {" "}
      <BreadCrumb
        title="Consultant Declaration"
        backTo={consultantRegisterId ? "Terms & Conditions" : null}
        path={`/consultantTermsInformation/${consultantRegisterId}`}
      />
      {currentUserDetails === null ? (
        <h1 className="text-center">
          work in progress. <br /> Coming Soon...
        </h1>
      ) : (
        <>
          {currentUserDetails?.details !== "<p><br></p>" &&
          currentUserDetails?.details !== "<p> </p>" &&
          currentUserDetails?.details !== "<h6><br></h6>" &&
          currentUserDetails?.details !== "<h5><br></h5>" ? (
            <Card>
              <CardBody id="application">
                <EmployeeTermsCondition
                  setConsData={setConsData}
                  consData={consData}
                  loading={loading}
                  currentUserDetails={currentUserDetails}
                ></EmployeeTermsCondition>
              </CardBody>
            </Card>
          ) : (
            <h1 className="text-center">
              work in progress. <br /> Coming Soon...
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default ConsultantNewDeclaration;
