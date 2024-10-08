import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import get from "../../../../../../../../helpers/get";
import BreadCrumb from "../../../../../../../../components/breadCrumb/BreadCrumb";
import GeneralInformation from "./DetailsInfoAdmissionOfficerProfile/GeneralInformation";
import PersonalInformation from "./DetailsInfoAdmissionOfficerProfile/PersonalInformation";
import ContactInformation from "./DetailsInfoAdmissionOfficerProfile/ContactInformation";
import Eligibility from "./DetailsInfoAdmissionOfficerProfile/Eligibility";
import Loader from "../../../../../../Search/Loader/Loader";
import EmergencyContactForm from "./DetailsInfoAdmissionOfficerProfile/EmergencyContactForm";

const AdmissionOfficerDetailsInfo = () => {
  const { officerId } = useParams();
  const [contactInfo, setContactInfo] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [loading, setLoading] = useState(true);
  const [generalInfo, setGeneralInfo] = useState({});
  console.log(generalInfo, "sakib");
  const [personalInfo, setPersonalInfo] = useState({});
  const userId = localStorage.getItem("referenceId");
  const [emergencyInfo, setEmergencyInfo] = useState({});

  useEffect(() => {
    if (officerId !== undefined) {
      get(`AdmissionOfficerProfile/Profile/${officerId}`).then((res) => {
        setGeneralInfo(res?.admissionOfficerGeneralInformation);
        setContactInfo(res?.admissionOfficerAddress);
        setEligibility(res?.admissionOfficerEligibility);
        setPersonalInfo(res?.admissionOfficerPersonalInfo);
        console.log("officer data", res);
        setLoading(false);
      });
    } else {
      get(`AdmissionOfficerProfile/Profile/${userId}`).then((res) => {
        setGeneralInfo(res?.admissionOfficerGeneralInformation);
        setContactInfo(res?.admissionOfficerAddress);
        setEligibility(res?.admissionOfficerEligibility);
        setPersonalInfo(res?.admissionOfficerPersonalInfo);
        console.log("officer data", res);
        setLoading(false);
      });
    }
  }, [officerId, userId]);

  useEffect(() => {
    get(`AdmissionOfficerEmergency/GetByOfficer/${officerId}`).then(
      (action) => {
        setEmergencyInfo(action);
        console.log(action, "emergency");
      }
    );
  }, [userId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb
            title="Admission Officer Details"
            backTo="Admission Officer"
            path={`/admissionOfficerDetails/${officerId}`}
          />

          <Card>
            <CardBody>
              <p style={{ fontWeight: "600", fontSize: "16px" }}>
                Admission Officer Details
              </p>

              <GeneralInformation data={generalInfo} />
              <PersonalInformation data={personalInfo} />
              <ContactInformation data={contactInfo} />
              <EmergencyContactForm emergencyInfo={emergencyInfo} />

              {generalInfo?.providerId === 1 ? (
                <Eligibility data={eligibility} />
              ) : null}
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default AdmissionOfficerDetailsInfo;
