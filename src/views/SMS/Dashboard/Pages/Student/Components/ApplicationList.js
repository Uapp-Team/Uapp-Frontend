import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import applicationIcon from "../../../../../../assets/icon/Application.svg";
import ashTick from "../../../../../../assets/icon/Check_fill-ash.svg";
import greenTick from "../../../../../../assets/icon/Check_fill.svg";
import documentsIcon from "../../../../../../assets/icon/Documents.svg";
import educationIcon from "../../../../../../assets/icon/Education.svg";
import experienceIcon from "../../../../../../assets/icon/Experience.svg";
import PersonalDetailsIcon from "../../../../../../assets/icon/Personal Details.svg";
import ReviewApplyIcon from "../../../../../../assets/icon/Review & Apply.svg";
import StdDashBoardUperCarousel1 from "../../../../../../assets/img/std-dashboard-uper-carousel-1.jpg";
import tick from "../../../../../../assets/img/tick.svg";
import tickfaka from "../../../../../../assets/img/ticks-faka.svg";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import Uget from "../../../../../../helpers/Uget";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import StarRatings from "../../../../Components/StarRatings";
import UndocumentName from "./UndocumentName";

export default function ApplicationList({
  referenceId,
  consultantData,
  totalStars,
}) {
  console.log(consultantData.id, "heheheehe");
  const [applicationInfo, setApplicationInfo] = useState([]);
  console.log(applicationInfo, "towkir korce");
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  const [CommunicationRating, setCommunicationRating] = useState(0);
  const [InformativeRating, setInformativeRating] = useState(0);
  const [FriendlyRating, setFriendlyRating] = useState(0);
  const [RecommendRating, setRecommendRating] = useState(0);
  const [OverAllRating, setOverAllRating] = useState(0);
  const [Comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [studentViewId, setstudentViewId] = useState(0);
  const [applicationId, setapplicationId] = useState(0);
  const [isCheckDetails, setIsCheckDetails] = useState(false);
  const [stdDashboard, setStdDashboard] = useState([]);

  const { addToast } = useToasts();
  // useEffect(() => {
  //   get(
  //     `ApplicationDocument//GetUnUploadedDocuments?applicationid=${applicationInfo[0]?.applicationId}`
  //   ).then((res) => {
  //     console.log(res, "dekhi ki hoy");
  //     setUnUploadedDocuData(res);
  //   });
  // }, [applicationInfo, success]);

  useEffect(() => {
    Uget(`studentdashboard/get-info/${referenceId}`).then((res) => {
      setStdDashboard(res?.data);
    });

    get(`StudentApplication/Index/${referenceId}`).then((res) => {
      setApplicationInfo(res);
      console.log(res);
    });
  }, [referenceId, success]);

  const gotoApplicationDetails = (id) => {
    history.push(`/applicationDetails/${id}/${referenceId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const subData = new FormData(e.target);
    const subdata = new FormData(e.target);
    subdata.append("RecommendToOthers", RecommendRating);
    subdata.append("FriendlyAndHelpful", FriendlyRating);
    subdata.append("Informative", InformativeRating);
    subdata.append("Communication", CommunicationRating);

    post(`ConsultantRating/Create`, subdata).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        setSuccess(!success);
        setModalOpen(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });

        setSuccess(!success);
        setModalOpen(false);
        setComment("");
        setCommunicationRating(0);
        setInformativeRating(0);
        setFriendlyRating(0);
        setRecommendRating(0);
      } else if (res?.status === 200 && res?.data?.isSuccess === false) {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const AddModalOpen = (p) => {
    setModalOpen(true);
    // setdepartment("");
    setstudentViewId(p?.studentViewId);
    setapplicationId(p?.applicationId);
  };

  const closeModal = () => {
    setModalOpen(false);

    setComment("");
    setCommunicationRating(0);
    setInformativeRating(0);
    setFriendlyRating(0);
    setRecommendRating(0);
    // setData({});
    // setdepartment("");
    // setDescription("");
    // setDescriptionError("");
    // setDepartmentNameError("");
  };

  const personalDetails = () => {
    history.push(
      `/addStudentInformation/${localStorage.getItem("referenceId")}`
    );
  };

  const applications = () => {
    history.push(
      `/addStudentApplicationInformation/${localStorage.getItem("referenceId")}`
    );
  };

  const educations = () => {
    history.push(
      `/addStudentEducationalInformation/${localStorage.getItem("referenceId")}`
    );
  };

  const experience = () => {
    history.push(`/addExperience/${localStorage.getItem("referenceId")}`);
  };
  const documents = () => {
    history.push(`/uploadDocument/${localStorage.getItem("referenceId")}`);
  };
  const review = () => {
    history.push(`/studentDeclaration/${localStorage.getItem("referenceId")}`);
  };

  const redirectToAddStudent = () => {
    history.push(
      `/addStudentInformation/${localStorage.getItem("referenceId")}`
    );
  };

  return (
    <div>
      {stdDashboard?.isProfileCompleted === true && (
        <Card style={{ marginTop: "24px" }}>
          <CardBody
            style={{
              height: "240px",
              borderRadius: "0.5rem",
              backgroundSize: "cover",
              backgroundImage: `url(${StdDashBoardUperCarousel1})`,
              backgroundPosition: "bottom",
            }}
          ></CardBody>
        </Card>
      )}

      <>
        {applicationInfo.map((appinfo) => (
          <div>
            <Card>
              <CardBody>
                <>
                  <div className="row" style={{ marginTop: "30px" }}>
                    <div className="col-md-2">
                      <span className="std-dashboard-style7">APP ID</span>{" "}
                      <div className="mt-2">
                        <span
                          className="std-dashboard-style8"
                          onClick={() =>
                            gotoApplicationDetails(appinfo?.applicationId)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {appinfo?.studentViewId}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <span className="std-dashboard-style7">Course</span>
                      <div className="mt-2">
                        <span className="std-dashboard-style9">
                          {appinfo?.subjectName}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-2">
                      <span className="std-dashboard-style7">University</span>
                      <div className="mt-2">
                        <span className="std-dashboard-style9">
                          {appinfo?.universityName}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-1">
                      <span className="std-dashboard-style7">Intake</span>
                      <div className="mt-2">
                        <span className="std-dashboard-style9">
                          {appinfo?.intake}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <span className="std-dashboard-style7">
                        Application Status
                      </span>
                      <div className="mt-2">
                        <span className="std-dashboard-style9">
                          {appinfo?.status}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-2" style={{ marginTop: "-7px" }}>
                      {appinfo?.enrollmentStatusId === 2 ? (
                        <>
                          {appinfo?.enrollmentStatusId === 2 &&
                          appinfo?.alreadyReviewed === true ? (
                            <>
                              <span
                                className="std-dashboard-style7
                          "
                              >
                                Rating
                              </span>
                              <div className="mt-2">
                                <StarRatings star={appinfo?.overallRating} />
                              </div>
                            </>
                          ) : (
                            <ButtonForFunction
                              func={() => AddModalOpen(appinfo)}
                              style={{ position: "relative" }}
                              className={"btn btn-uapp-add mt-3"}
                              name={"Rate Your Consultant"}
                              permission={6}
                            />
                          )}
                        </>
                      ) : (
                        <span
                          color="primary"
                          onClick={() => setIsCheckDetails(!isCheckDetails)}
                          // onClick={() =>
                          //   gotoApplicationDetails(appinfo?.applicationId)
                          // }
                        >
                          {isCheckDetails ? (
                            <button
                              color="primary"
                              className="mt-3 hide-details-student-dashboard"
                            >
                              Hide Details{" "}
                            </button>
                          ) : (
                            <>
                              {" "}
                              <>
                                <Button
                                  color="primary"
                                  className="mt-3"
                                  style={{
                                    position: "relative",
                                    fontSize: "13px",
                                    fontWeight: 400,
                                    padding: "8px",
                                  }}
                                  onClick={() =>
                                    setIsCheckDetails(!isCheckDetails)
                                  }
                                  // onClick={() =>
                                  //   gotoApplicationDetails(appinfo?.applicationId)
                                  // }
                                >
                                  Tracking{" "}
                                  <span className="ml-1">
                                    <i class="fas fa-arrow-right"></i>
                                  </span>
                                </Button>
                              </>
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Modal
                      isOpen={modalOpen}
                      toggle={closeModal}
                      className="uapp-modal"
                    >
                      <ModalHeader>
                        Rate{" "}
                        <span style={{ color: "#045d5e" }}>
                          " {consultantData?.fullName}"
                        </span>{" "}
                        For Application{" "}
                        <span style={{ color: "#045d5e" }}>
                          " {studentViewId}"
                        </span>
                      </ModalHeader>
                      <ModalBody>
                        <Form onSubmit={handleSubmit}>
                          <input
                            type="hidden"
                            name="studentId"
                            id="studentId"
                            value={appinfo?.studentId}
                          />
                          <input
                            type="hidden"
                            name="consultantId"
                            id="consultantId"
                            value={consultantData.id}
                          />
                          <input
                            type="hidden"
                            name="applicationId"
                            id="applicationId"
                            value={applicationId}
                          />

                          <input
                            type="hidden"
                            name="overAllRating"
                            id="overAllRating "
                            value={OverAllRating}
                          />
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="5">
                              <span>Communication: </span>
                            </Col>
                            <Col md="7">
                              {" "}
                              <div
                                className="star-rating"
                                name="communication"
                                id="communication"
                              >
                                {[...Array(totalStars)].map((_, index) => {
                                  const starValue = index + 1;

                                  let starClass = "star";
                                  if (starValue <= CommunicationRating) {
                                    starClass += "full";
                                  } else if (
                                    starValue - 0.5 ===
                                    CommunicationRating
                                  ) {
                                    starClass += "half";
                                  }

                                  return (
                                    <span
                                      key={index}
                                      className={starClass}
                                      name="communication"
                                      id="communication"
                                      onClick={() =>
                                        setCommunicationRating(starValue)
                                      }
                                    >
                                      ★
                                    </span>
                                  );
                                })}
                              </div>
                            </Col>
                          </FormGroup>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="5">
                              <span>Informative: </span>
                            </Col>
                            <Col md="7">
                              {" "}
                              <div className="star-rating">
                                {[...Array(totalStars)].map((_, index) => {
                                  const starValue = index + 1;

                                  let starClass = "star";
                                  if (starValue <= InformativeRating) {
                                    starClass += "full";
                                  } else if (
                                    starValue - 0.5 ===
                                    InformativeRating
                                  ) {
                                    starClass += "half";
                                  }

                                  return (
                                    <span
                                      key={index}
                                      className={starClass}
                                      onClick={() =>
                                        setInformativeRating(starValue)
                                      }
                                    >
                                      ★
                                    </span>
                                  );
                                })}
                              </div>
                            </Col>
                          </FormGroup>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="5">
                              <span>Friendly & Helpful: </span>
                            </Col>
                            <Col md="7">
                              {" "}
                              <div className="star-rating">
                                {[...Array(totalStars)].map((_, index) => {
                                  const starValue = index + 1;

                                  let starClass = "star";
                                  if (starValue <= FriendlyRating) {
                                    starClass += "full";
                                  } else if (
                                    starValue - 0.5 ===
                                    FriendlyRating
                                  ) {
                                    starClass += "half";
                                  }

                                  return (
                                    <span
                                      key={index}
                                      className={starClass}
                                      name="friendlyAndHelpful"
                                      id="friendlyAndHelpful"
                                      onClick={() =>
                                        setFriendlyRating(starValue)
                                      }
                                    >
                                      ★
                                    </span>
                                  );
                                })}
                              </div>
                            </Col>
                          </FormGroup>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="5">
                              <span>Recommend To Others : </span>
                            </Col>
                            <Col md="7">
                              {" "}
                              <div
                                className="star-rating"
                                name="recommendToOthers"
                                id="recommendToOthers"
                              >
                                {[...Array(totalStars)].map((_, index) => {
                                  const starValue = index + 1;

                                  let starClass = "star";
                                  if (starValue <= RecommendRating) {
                                    starClass += "full";
                                  } else if (
                                    starValue - 0.5 ===
                                    RecommendRating
                                  ) {
                                    starClass += "half";
                                  }

                                  return (
                                    <span
                                      key={index}
                                      className={starClass}
                                      name="recommendToOthers"
                                      id="recommendToOthers"
                                      onClick={() =>
                                        setRecommendRating(starValue)
                                      }
                                    >
                                      ★
                                    </span>
                                  );
                                })}
                              </div>
                            </Col>
                          </FormGroup>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="5">
                              <span>Review:</span>
                            </Col>
                            <Col md="7">
                              <Input
                                type="textarea"
                                rows="4"
                                name="comment"
                                id="comment"
                                placeholder="Add Review"
                              />
                            </Col>
                          </FormGroup>

                          <FormGroup className="d-flex justify-content-between mt-3">
                            <CancelButton cancel={closeModal} />

                            <SaveButton
                              text="Submit"
                              progress={progress}
                              buttonStatus={buttonStatus}
                            />
                          </FormGroup>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                </>
                <>
                  {" "}
                  {isCheckDetails ? (
                    <>
                      {" "}
                      {appinfo.hasTimeLine === true && (
                        <div className="d-block overflowX">
                          <div className="px-4">
                            <div class="stepper-wrapper">
                              {appinfo?.timeLines.map((timeline) => (
                                <div
                                  class={`stepper-item ${
                                    timeline?.isCompleted || timeline?.isCurrent
                                      ? "completed"
                                      : ""
                                  }`}
                                >
                                  {timeline?.isCompleted ||
                                  timeline?.isCurrent ? (
                                    <div class="step-counter">
                                      <img
                                        src={tick}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                  ) : (
                                    <div class="tick-faka">
                                      <img
                                        src={tickfaka}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    </div>
                                  )}

                                  <div className="text-center text-timeline-status mx-1">
                                    {timeline?.statusName}
                                  </div>
                                  {timeline?.isCurrent && (
                                    <div className="text-center text-timeline-substatus mx-1">
                                      {timeline?.subStatusName}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <UndocumentName
                        applicationId={appinfo.applicationId}
                        appinfo={appinfo}
                        referenceId={referenceId}
                      />
                    </>
                  ) : null}
                </>
              </CardBody>
            </Card>
          </div>
        ))}
      </>

      <>
        {stdDashboard?.isProfileCompleted === false ? (
          <Card>
            <CardBody>
              <>
                <div className="row" style={{ marginTop: "30px" }}>
                  <div className="col-md-2 text-center">
                    <div>
                      <img src={PersonalDetailsIcon} alt="" />
                      <div className="mt-2">
                        <button
                          onClick={personalDetails}
                          className="py-1 px-2 std-btn-complete-profile"
                        >
                          {stdDashboard?.personalDetails !== false ? (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={greenTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Personal Details</span>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={ashTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Personal Details</span>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <div>
                      <img src={applicationIcon} alt="" />
                      <div className="mt-2">
                        <button
                          onClick={applications}
                          className="py-1 px-2 std-btn-complete-profile"
                        >
                          {stdDashboard?.application !== false ? (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={greenTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Application</span>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={ashTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Application</span>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <div>
                      <img src={educationIcon} alt="" />
                      <div className="mt-2">
                        <button
                          onClick={educations}
                          className="py-1 px-2 std-btn-complete-profile"
                        >
                          {stdDashboard?.education !== false ? (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={greenTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Education</span>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={ashTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Education</span>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <div>
                      <img src={experienceIcon} alt="" />
                      <div className="mt-2">
                        <button
                          onClick={experience}
                          className="py-1 px-2 std-btn-complete-profile"
                        >
                          {stdDashboard?.experience !== false ? (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={greenTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Experience</span>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={ashTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Experience</span>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <div>
                      <img src={documentsIcon} alt="" />
                      <div className="mt-2">
                        <button
                          onClick={documents}
                          className="py-1 px-2 std-btn-complete-profile"
                        >
                          {stdDashboard?.documents !== false ? (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={greenTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Documents</span>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={ashTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Documents</span>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <div>
                      <img src={ReviewApplyIcon} alt="" />
                      <div className="mt-2">
                        <button
                          onClick={review}
                          className="py-1 px-2 std-btn-complete-profile"
                        >
                          {stdDashboard?.reviewAndApply !== false ? (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={greenTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Review & Signed</span>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div>
                                <img
                                  src={ashTick}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="mt-1 mx-1">
                                <span>Review & Sign</span>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <>
                    <div className="std-dashboard-style1 mb-4">
                      Complete your profile information to get started
                    </div>
                    <ButtonForFunction
                      className="mb-4"
                      color="primary"
                      func={redirectToAddStudent}
                      name={"Complete Profile"}
                    ></ButtonForFunction>
                  </>
                </div>
              </>
            </CardBody>
          </Card>
        ) : null}
      </>
    </div>
  );
}
