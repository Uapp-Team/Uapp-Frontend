import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import get from "../../../../helpers/get";
import CampusProfileInfoCard from "./Component/CampusProfileInfoCard";
import CampusAbout from "./Component/CampusAbout";
import CampusCourse from "./Component/CampusCourse";
import CampusGallery from "./Component/CampusGallery";
import ProfileCoverPhoto from "../../Components/Profile/ProfileCoverPhoto";
import providerCover from "../../../../assets/img/provider-cover.png";
import Accordion from "../../../../components/Accordion/Accordion";

const CampusDetails = () => {
  const { id } = useParams();
  const [campusInfo, setCampusInfo] = useState({});
  const [campusSubjectList, setCampusSubjectList] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [uniId, setUniId] = useState(undefined);
  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    get(`UniversityCampus/Get/${id}`).then((res) => {
      console.log(res);
      setCampusInfo(res);

      setUniId(res?.university?.id);
    });

    get(`CampusGallery/GetByCampusId/${id}`).then((res) => {
      setGallery(res);
    });

    get(`CampusSubjects/GetAll/${id}`).then((res) => {
      setCampusSubjectList(res);
    });
  }, [id]);

  return (
    <>
      <ProfileCoverPhoto
        FileUrl={campusInfo?.university?.coverPhoto?.fileUrl}
        DefaultFile={providerCover}
      ></ProfileCoverPhoto>

      <div className="university-profile-content">
        <CampusProfileInfoCard
          campusInfo={campusInfo}
          uniId={uniId}
        ></CampusProfileInfoCard>

        <div className="w-sm-75-90 mx-auto mb-25px">
          <Accordion
            title="About"
            content={<CampusAbout campusInfo={campusInfo} />}
            isOpen={openIndex === 1}
            toggleAccordion={() => toggleAccordion(1)}
          />
          <Accordion
            title="Courses"
            content={<CampusCourse campusSubjectList={campusSubjectList} />}
            isOpen={openIndex === 2}
            toggleAccordion={() => toggleAccordion(2)}
          />
          <Accordion
            title="Gallery"
            content={<CampusGallery gallery={gallery} />}
            isOpen={openIndex === 3}
            toggleAccordion={() => toggleAccordion(3)}
          />
        </div>
      </div>
    </>
  );
};

export default CampusDetails;
