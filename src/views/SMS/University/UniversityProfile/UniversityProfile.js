import React, { useEffect, useState } from "react";
// import locationIcon from "../../../../assets/img/pages/locationIcon.png";
import programLevel from "../../../../assets/img/pages/programm-level.png";
import programLength from "../../../../assets/img/pages/programm-length.png";
import livingCost from "../../../../assets/img/pages/living.png";
import tutionCost from "../../../../assets/img/pages/tution.png";
import placement from "../../../../assets/img/pages/placement.png";
import language from "../../../../assets/img/pages/language.png";
import letter from "../../../../assets/img/pages/letter.png";
import accomodation from "../../../../assets/img/pages/accommodation.png";
import right from "../../../../assets/img/pages/right.png";
import wrong from "../../../../assets/img/pages/wrong.png";
import iconFalse from "../../../../assets/img/pages/false.png";
import iconTrue from "../../../../assets/img/pages/true.png";
import UniversityAbout from "./UniversityAbout";
import UniversityCourses from "./UniversityCourses";
import get from "../../../../helpers/get";
import UniversityLocation from "./UniversityLocation";
// import { rootUrl } from "../../../../constants/constants";
import { useParams } from "react-router-dom";
// import { Accordion } from "react-bootstrap-accordion";
// import "react-bootstrap-accordion/dist/index.css";
// import Accordions from "./Components/Accordion";
import DOMPurify from "dompurify";
import UniversityProfileCommission from "./UniversityProfileCommission";
import UniversityProfileInfoCard from "./Components/UniversityProfileInfoCard";
import ProfileCoverPhoto from "../../Components/Profile/ProfileCoverPhoto";
import providerCover from "../../../../assets/img/provider-cover.png";
import Accordion from "../../../../components/Accordion/Accordion";

const UniversityProfile = () => {
  // const [activeTab, setActiveTab] = useState(1);
  const [uniData, setUniData] = useState({});
  const [campData, setCampData] = useState([]);
  const [funding, setFunding] = useState({});
  const [reqDetails, setReqDetails] = useState("");
  const [engReqInfo, setEngReqInfo] = useState("");
  // const [topicDetails, setTopicDetails] = useState("");
  // const [topicName, setTopicName] = useState("");
  // const [dataCollection, setDataCollection] = useState([]);
  const [commission, setCommission] = useState(null);
  const { id } = useParams();

  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    get(`University/Get/${id}`).then((res) => {
      console.log("uniInfo", res);
      setUniData(res);
    });

    get(`UniversityCampus/GetByUniversity/${id}`).then((res) => {
      console.log("campList", res);
      setCampData(res);
    });

    get(`UniversityFunding/GetByUniversityId/${id}`).then((res) => {
      console.log("funding", res);
      setFunding(res?.fundingDetails);
    });

    get(`GeneralRequirement/GetByUniversityId/${id}`).then((res) => {
      console.log("geneReq", res);
      setReqDetails(res?.requirementDetails);
    });

    get(`UniversityEnglishRequirement/GetByUniversityId/${id}`).then((res) => {
      console.log("EngReq", res);
      setEngReqInfo(res?.requirementInformation);
    });

    // get(`RequirementInformation/GetByUniversityId/${id}`).then((res) => {
    //   console.log("EngTopic", res);
    //   setTopicDetails(res?.topicDetails);
    //   setTopicName(res?.topicName);

    //   setDataCollection([
    //     {
    //       question: res?.topicName,
    //       answer: res?.topicDetails,
    //     },
    //   ]);
    // });

    get(`UniversityComission/GetByUniversity/${id}`).then((res) => {
      setCommission(res);
    });
  }, [id]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <ProfileCoverPhoto
        FileUrl={uniData?.coverPhoto?.fileUrl}
        DefaultFile={providerCover}
      ></ProfileCoverPhoto>
      <div className="university-profile-content">
        <UniversityProfileInfoCard
          uniData={uniData}
          LogoUrl={uniData?.universityLogo?.fileUrl}
          Name={uniData?.name}
          CountryName={uniData?.universityCountry?.name}
          UniversityId={uniData?.id}
          FoundationYear={uniData?.foundationYear}
          UniversityType={uniData?.universityType?.name}
        ></UniversityProfileInfoCard>

        <div className="w-sm-75-90 mx-auto mb-25px">
          <Accordion
            title="About"
            content={
              <UniversityAbout
                programLevel={programLevel}
                programLength={programLength}
                livingCost={livingCost}
                tutionCost={tutionCost}
                placement={placement}
                language={language}
                accomodation={accomodation}
                letter={letter}
                right={right}
                wrong={wrong}
                uniData={uniData}
              />
            }
            isOpen={openIndex === 1}
            toggleAccordion={() => toggleAccordion(1)}
          />

          <Accordion
            title="Courses"
            content={<UniversityCourses id={id} UniversityId={uniData?.id} />}
            isOpen={openIndex === 2}
            toggleAccordion={() => toggleAccordion(2)}
          />

          <Accordion
            title="Funding"
            content={
              <div dangerouslySetInnerHTML={createMarkup(funding)}></div>
            }
            isOpen={openIndex === 3}
            toggleAccordion={() => toggleAccordion(3)}
          />
          <Accordion
            title="Requirements"
            content={
              <>
                <div dangerouslySetInnerHTML={createMarkup(reqDetails)}></div>
                <div dangerouslySetInnerHTML={createMarkup(engReqInfo)}></div>
              </>
            }
            isOpen={openIndex === 4}
            toggleAccordion={() => toggleAccordion(4)}
          />

          <Accordion
            title="Location"
            content={
              <UniversityLocation uniData={uniData} campData={campData} />
            }
            isOpen={openIndex === 5}
            toggleAccordion={() => toggleAccordion(5)}
          />

          <Accordion
            title="Commission"
            content={
              <UniversityProfileCommission
                uniData={uniData}
                commission={commission}
                iconTrue={iconTrue}
                iconFalse={iconFalse}
              />
            }
            isOpen={openIndex === 6}
            toggleAccordion={() => toggleAccordion(6)}
          />

          {/* <Accordion title="About">
            <UniversityAbout
              programLevel={programLevel}
              programLength={programLength}
              livingCost={livingCost}
              tutionCost={tutionCost}
              placement={placement}
              language={language}
              accomodation={accomodation}
              letter={letter}
              right={right}
              wrong={wrong}
              uniData={uniData}
            />
          </Accordion> */}

          {/* <Accordion title="Programs">
            <UniversityCourses id={id} UniversityId={uniData?.id} />
          </Accordion> */}
          {/* <Accordion title="Funding">
            <div dangerouslySetInnerHTML={createMarkup(funding)}></div>
          </Accordion>

          <Accordion title="Requirements">
            <div dangerouslySetInnerHTML={createMarkup(reqDetails)}></div>
            <div dangerouslySetInnerHTML={createMarkup(engReqInfo)}></div>
            <Accordions dataCollection={dataCollection} />
          </Accordion> */}

          {/* <Accordion title="Location">
            <UniversityLocation uniData={uniData} campData={campData} />
          </Accordion> */}

          {/* <Accordion title="Commission">
            <UniversityProfileCommission
              uniData={uniData}
              commission={commission}
              iconTrue={iconTrue}
              iconFalse={iconFalse}
            />
          </Accordion> */}
        </div>
      </div>
    </>
  );
};

export default UniversityProfile;
