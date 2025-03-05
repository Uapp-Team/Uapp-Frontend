import React, { useEffect, useState } from "react";
import GeneralInformation from "./DetailsInfoAdmissionOfficerProfile/GeneralInformation";
import { Card, CardBody } from "reactstrap";
import get from "../../../../../../../../helpers/get";
import PersonalInformation from "./DetailsInfoAdmissionOfficerProfile/PersonalInformation";
import ContactInformation from "./DetailsInfoAdmissionOfficerProfile/ContactInformation";
import Eligibility from "./DetailsInfoAdmissionOfficerProfile/Eligibility";
import EmergencyContactForm from "./DetailsInfoAdmissionOfficerProfile/EmergencyContactForm";
import { useParams } from "react-router";

const DetailsInfoAdmissionOfficerProfile = ({ userId }) => {
  const [generalInfo, setGeneralInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [emergencyInfo, setEmergencyInfo] = useState({});
  const { admissionManagerId } = useParams();

  useEffect(() => {
    get(`AdmissionOfficerProfile/Profile/${userId}`).then((res) => {
      setGeneralInfo(res?.admissionOfficerGeneralInformation);
      setContactInfo(res?.admissionOfficerAddress);
      setEligibility(res?.admissionOfficerEligibility);
      setPersonalInfo(res?.admissionOfficerPersonalInfo);
      // console.log("officer data", res);
      // setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    get(
      `AdmissionManagerEmergency/GetByManager/${
        admissionManagerId ? admissionManagerId : userId
      }`
    ).then((res) => {
      setEmergencyInfo(res);
      console.log("sakib", res);
    });
  }, [userId]);

  return (
    <div>
      <Card>
        <CardBody>
          <p style={{ fontWeight: "600", fontSize: "16px" }}>
            Admission Officer Details
          </p>

          <GeneralInformation data={generalInfo} />
          <PersonalInformation data={personalInfo} />
          <ContactInformation data={contactInfo} />
          <Eligibility data={eligibility} />
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailsInfoAdmissionOfficerProfile;
