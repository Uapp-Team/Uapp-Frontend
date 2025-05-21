import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import providerCover from "../../../../assets/img/provider-cover.png";
import get from "../../../../helpers/get.js";
import ProviderUniversityList from "./ProviderUniversityList.js";
import ProviderAbout from "./ProviderAbout";
import ProviderStaffList from "./ProviderStaffList";
import ProviderAddress from "./ProviderAddress";
import ProfileCoverPhoto from "../../Components/Profile/ProfileCoverPhoto";
import ProviderProfileInfoCard from "./Components/ProviderProfileInfoCard";
import Accordion from "../../../../components/Accordion/Accordion";
const ProviderDetails = () => {
  const { id } = useParams();
  const [providerInfo, setProviderInfo] = useState({});
  const [success, setSuccess] = useState(false);

  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    let head_api_url = "ProviderProfile/Head";
    if (typeof id !== "undefined") {
      head_api_url = `ProviderProfile/Head?id=${id}`;
    }
    get(head_api_url).then((res) => {
      setProviderInfo(res);
    });
  }, [id, success]);
  console.log(providerInfo, "provider");
  return (
    <>
      <ProfileCoverPhoto
        FileUrl={providerInfo?.coverUrl}
        DefaultFile={providerCover}
      ></ProfileCoverPhoto>

      <div className="university-profile-content">
        <ProviderProfileInfoCard
          LogoUrl={providerInfo?.logoUrl}
          Name={providerInfo?.providerName}
          Address={providerInfo?.address}
          Email={providerInfo?.email}
          Phone={providerInfo?.phone}
          TypeName={providerInfo?.providerType}
          TotalStudent={providerInfo?.totalStudent}
          InternationalStudent={providerInfo?.internationalStudent}
          ProviderId={providerInfo?.providerId}
          accountStatusId={providerInfo?.accountStatusId}
          setSuccess={setSuccess}
          success={success}
        ></ProviderProfileInfoCard>

        <div className="w-sm-75-90 mx-auto mb-25px">
          <Accordion
            title="About"
            content={<ProviderAbout id={providerInfo?.providerId} />}
            isOpen={openIndex === 1}
            toggleAccordion={() => toggleAccordion(1)}
          />
          <Accordion
            title="Universities"
            content={
              <ProviderUniversityList
                id={providerInfo?.providerId}
                accountStatusId={providerInfo?.accountStatusId}
              />
            }
            isOpen={openIndex === 2}
            toggleAccordion={() => toggleAccordion(2)}
          />
          <Accordion
            title="Staff"
            content={
              <ProviderStaffList
                id={providerInfo?.providerId}
                branchId={providerInfo?.branchId}
                accountStatusId={providerInfo?.accountStatusId}
              />
            }
            isOpen={openIndex === 3}
            toggleAccordion={() => toggleAccordion(3)}
          />
          <Accordion
            title="Location"
            content={<ProviderAddress id={providerInfo?.providerId} />}
            isOpen={openIndex === 4}
            toggleAccordion={() => toggleAccordion(4)}
          />
        </div>
      </div>
    </>
  );
};

export default ProviderDetails;
