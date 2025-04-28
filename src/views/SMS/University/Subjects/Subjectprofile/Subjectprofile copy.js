import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Modal, ModalBody, Nav, NavItem } from "reactstrap";
import locationIcon from "../../../../../assets/img/pages/marker-pin-03.png";
import { rootUrl } from "../../../../../constants/constants";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import ApplicationRequirment from "./ApplicationRequirment";
import Apply from "./Apply";

const Subjectprofile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabData, setActiveTabData] = useState(1);
  const [data, setData] = useState({});
  const [studentType, setStudentType] = useState();
  const { subjId } = useParams();
  const history = useHistory();
  const userType = localStorage.getItem("userType");
  var background_image = rootUrl + data?.universityCoverPhoto;

  const [modal, setModal] = useState(false);
  const [modalIntakeValue, setModalIntakeValue] = useState(0);
  const [modalDeliveryPattern, setModalDeliveryPattern] = useState([]);
  const [modalDeliveryPatternValue, setModalDeliveryPatternValue] = useState(0);
  const [modalCampusValue, setModalCampusValue] = useState(0);
  const [modalIntake, setModalIntake] = useState([]);
  const [success, setSuccess] = useState(false);
  const [modalCampus, setModalCampus] = useState([]);
  const [unInfo, setUnInfo] = useState();
  const [primaryCampus, setPrimaryCampus] = useState({});
  const campusValue = 0;
  // const [campusValue, setCampusValue] = useState(0);

  const handleActiveTab = (e) => {
    setActiveTab(e);

    const filterData = data?.requirements.filter((item) => {
      return item.applicationTypeId === e;
    });

    setActiveTabData(filterData[0]);
  };

  useEffect(() => {
    get(`Subject/Profile/${subjId}`).then((res) => {
      console.log("subject profile data", res);
      setData(res);
      const filterData = res?.requirements.filter((item) => {
        return (
          item.applicationTypeId === res?.requirements[0]?.applicationTypeId
        );
      });
      setActiveTab(filterData[0]?.applicationTypeId);
      setActiveTabData(filterData[0]);
    });
  }, [subjId]);

  useEffect(() => {
    get(`StudentType/GetByStudent/${userType}`).then((res) => {
      console.log("StudentType", res);
      setStudentType(res);
    });
  }, [userType]);

  const backUrl = () => {
    history.go(-1);
  };

  const closeModal = () => {
    setModalCampusValue(0);
    setModalDeliveryPatternValue(0);
    setModalIntakeValue(0);
    setModal(false);
  };
  const toggleModal = () => {
    setUnInfo([data?.universityLogo, data?.universityName]);
    setModalCampus(data?.campuses);
    setModalIntake(data?.intakes);
    setModalDeliveryPattern(data?.deliveryPatterns);
    setPrimaryCampus(data?.campuses.find((s) => s.campusId === campusValue));
    setModal(true);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div>
        <div
          class="subject-profile-head"
          style={{ backgroundImage: "url(" + background_image + ")" }}
        >
          <div className="container-body-background"></div>
          <div className="subject-profile-content">
            <i
              className="fas fa-arrow-left pointer text-white"
              onClick={backUrl}
            ></i>
            <div className="w-sm-75-90 mx-auto mt-100px mb-60px">
              <h1 className="subject-profile-title text-white mb-10px">
                {data?.name}
              </h1>

              <Link
                to={`/universityDetails/${data?.universityId}`}
                className="d-flex align-items-center mb-10px"
              >
                <img
                  className="subject-university-logo bg-white ml-1"
                  src={rootUrl + data?.universityLogo}
                  alt=""
                />
                <span className="subject-profile-head-text text-white text-underline mb-2">
                  {data?.universityName}
                </span>
              </Link>

              <div className="d-flex align-items-center subject-profile-head-text  text-white mb-40px">
                <img src={locationIcon} alt="" className="mr-2" />

                <span> {data?.universityLocation}</span>
              </div>

              <div className="d-sm-flex">
                {data?.campuses?.map((item, i) => (
                  <span key={i} className="tag-key-subject py-2">
                    {item?.campusName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-sm-75-90 mx-auto">
        <div className="p-20px">
          <h2 className="subject-profile-summary">Courses Summary</h2>

          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <p className="subject-profile-summary-content">
                <div
                  dangerouslySetInnerHTML={createMarkup(data?.details)}
                ></div>
                {/* {data?.details} */}
              </p>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <div className="subject-profile-apply">
                <div>
                  <h5> Duration</h5>
                  <p className="text-gray-70 fw-500">{data?.duration}</p>
                </div>
                <div>
                  <h5>Academic Course Level</h5>
                  <p className="text-gray-70 fw-500">{data?.educationLevel}</p>
                </div>
                <div>
                  <h5>Tuition Fee</h5>
                  <p className="text-gray-70 fw-500">
                    {userType === userTypes?.Student ? (
                      <>
                        {studentType?.id === 1 && (
                          <span>
                            Local : {data?.localTutionFee} <br />
                          </span>
                        )}
                        {studentType?.id === 2 && (
                          <span>
                            Eu : {data?.euTutionFee} <br />
                          </span>
                        )}
                        {studentType?.id === 3 && (
                          <span>
                            Int. : {data?.internationlTutionFee} <br />
                          </span>
                        )}
                        Average : {data?.applicationFee}
                      </>
                    ) : (
                      <>
                        Local : {data?.localTutionFee}
                        <br /> Int. : {data?.internationlTutionFee}
                        <br /> Eu : {data?.euTutionFee} <br />
                        Average : {data?.applicationFee}
                      </>
                    )}
                  </p>
                </div>
                <div className="mb-3">
                  <h5>Delivery Pattern</h5>
                  <p className="text-gray-70 fw-500">
                    {data?.deliveryPatterns?.map((item, i) => (
                      <span key={i}>
                        {item?.name}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <h5>Available Intake</h5>
                  <p className="text-gray-70 fw-500">
                    {data?.intakes?.map((item, i) => (
                      <span key={i}>
                        {item?.intakeName}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
                {/* <div className="mt-3">
                  <button
                    type="submit"
                    className="subject-profile-btn"
                    onClick={() => toggleModal()}
                  >
                    Apply Now
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="p-20px">
          <h2 className="subject-profile-summary">Admission Requirement</h2>
          <Nav tabs className="mb-0">
            {/* {data?.requirements?.applicationTypeId((item, i) => ( */}
            {data?.requirements?.map((item, i) => (
              <NavItem
                key={i}
                className={
                  activeTab === item?.applicationTypeId
                    ? "International-Students"
                    : "International-Students-tab"
                }
                onClick={() => handleActiveTab(item?.applicationTypeId)}
              >
                <h4
                  className={
                    activeTab === item?.applicationTypeId && "text-orange"
                  }
                  active={activeTab === item?.applicationTypeId}
                >
                  {item?.applicationTypeId === 1 && "For Home Students"}
                  {item?.applicationTypeId === 2 && "For UK/EU students"}
                  {item?.applicationTypeId === 3 &&
                    "For International Students"}
                  {item?.applicationTypeId === 4 && "For Others Students "}
                </h4>
              </NavItem>
            ))}
          </Nav>

          {activeTab === 1 ? (
            <ApplicationRequirment data={activeTabData} />
          ) : null}
          {activeTab === 2 ? (
            <ApplicationRequirment data={activeTabData} />
          ) : null}
          {activeTab === 3 ? (
            <ApplicationRequirment data={activeTabData} />
          ) : null}
          {activeTab === 4 ? (
            <ApplicationRequirment data={activeTabData} />
          ) : null}
        </div>
      </div>

      <Modal
        size="lg"
        isOpen={modal}
        toggle={closeModal}
        className="uapp-modal2"
      >
        <ModalBody>
          <Apply
            success={success}
            setSuccess={setSuccess}
            modalCampus={modalCampus}
            currentData={data}
            modalDeliveryPattern={modalDeliveryPattern}
            setModal={setModal}
            primaryCampus={primaryCampus}
            campusValue={campusValue}
            setModalCampusValue={setModalCampusValue}
            setModalIntake={setModalIntake}
            modalIntake={modalIntake}
            setModalIntakeValue={setModalIntakeValue}
            setModalDeliveryPatternValue={setModalDeliveryPatternValue}
            modalIntakeValue={modalIntakeValue}
            modalDeliveryPatternValue={modalDeliveryPatternValue}
            modalCampusValue={modalCampusValue}
            unInfo={unInfo}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Subjectprofile;
